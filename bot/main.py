"""
Scalper Engine - High-Performance FastAPI Backend Daemon
Created by Ayaan Khan (https://github.com/Ayaan-M-Khan/pokemon-bot)
"""

import asyncio
import time
import random
from typing import List, Optional
from datetime import datetime
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Scalper Engine API",
    description="High-throughput retail task engine and telemetry daemon",
    version="2.4.0",
)

# Enable CORS for local React/Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Data Models
# ---------------------------------------------------------------------------

class StorePingResponse(BaseModel):
    store_id: str
    name: str
    status: str
    latency_ms: int
    http_code: int
    tls_handshake_ms: int
    timestamp: str

class TrackedProduct(BaseModel):
    id: str
    store: str
    name: str
    sku: str
    price: float
    status: str  # IN_STOCK, OUT_OF_STOCK, RESTOCK_DETECTED
    image_url: str
    last_checked: str

# In-memory store state
STORE_MONITORS = {
    "pokemon-center": {"name": "Pokémon Center US", "url": "https://www.pokemoncenter.com", "active": True, "base_latency": 145},
    "target": {"name": "Target US Direct", "url": "https://www.target.com", "active": True, "base_latency": 120},
    "bestbuy": {"name": "Best Buy API", "url": "https://www.bestbuy.com", "active": True, "base_latency": 180},
    "walmart": {"name": "Walmart US", "url": "https://www.walmart.com", "active": True, "base_latency": 210},
    "amazon": {"name": "Amazon US Carting", "url": "https://www.amazon.com", "active": True, "base_latency": 165},
    "shopify": {"name": "Shopify Endpoints", "url": "https://shopify.com", "active": True, "base_latency": 95},
}

PRODUCTS_DB = [
    {
        "id": "prod-1",
        "store": "Pokémon Center US",
        "name": "Prismatic Evolutions Elite Trainer Box",
        "sku": "PKM-PREV-ETB-01",
        "price": 59.99,
        "status": "RESTOCK_DETECTED",
        "image_url": "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=300&auto=format&fit=crop&q=80",
        "last_checked": "Just now",
    },
    {
        "id": "prod-2",
        "store": "Target US Direct",
        "name": "Surging Sparks Booster Bundle (6 Packs)",
        "sku": "TGT-SS-BB-8891",
        "price": 26.94,
        "status": "IN_STOCK",
        "image_url": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80",
        "last_checked": "12s ago",
    },
    {
        "id": "prod-3",
        "store": "Best Buy",
        "name": "151 Special Collection: Zapdos ex Box",
        "sku": "BBY-151-ZAP-44",
        "price": 21.99,
        "status": "OUT_OF_STOCK",
        "image_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=80",
        "last_checked": "45s ago",
    },
    {
        "id": "prod-4",
        "store": "Walmart US",
        "name": "Crown Zenith Sea & Sky Premium Collection",
        "sku": "WMT-CZ-SS-110",
        "price": 39.98,
        "status": "IN_STOCK",
        "image_url": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&auto=format&fit=crop&q=80",
        "last_checked": "2m ago",
    }
]

# ---------------------------------------------------------------------------
# REST Endpoints
# ---------------------------------------------------------------------------

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "engine": "Scalper Asynchronous Daemon",
        "version": "2.4.0",
        "developer": "Ayaan Khan",
        "timestamp": datetime.utcnow().isoformat(),
    }

@app.get("/api/monitors")
async def list_monitors():
    results = []
    for s_id, data in STORE_MONITORS.items():
        jitter = random.randint(-25, 45)
        latency = max(28, data["base_latency"] + jitter)
        results.append({
            "id": s_id,
            "name": data["name"],
            "url": data["url"],
            "active": data["active"],
            "latency_ms": latency,
            "status": "HEALTHY" if latency < 350 else "DEGRADED",
            "http_code": 200,
            "tls_handshake_ms": random.randint(15, 45),
            "last_ping": datetime.utcnow().strftime("%H:%M:%S.%f")[:-3]
        })
    return {"monitors": results}

@app.post("/api/monitors/{store_id}/ping")
async def ping_store(store_id: str):
    if store_id not in STORE_MONITORS:
        raise HTTPException(status_code=404, detail="Store monitor not configured")
    
    meta = STORE_MONITORS[store_id]
    latency = max(35, meta["base_latency"] + random.randint(-20, 60))
    return StorePingResponse(
        store_id=store_id,
        name=meta["name"],
        status="OPERATIONAL",
        latency_ms=latency,
        http_code=200,
        tls_handshake_ms=random.randint(18, 48),
        timestamp=datetime.utcnow().strftime("%H:%M:%S.%f")[:-3]
    )

@app.post("/api/monitors/{store_id}/toggle")
async def toggle_store(store_id: str):
    if store_id not in STORE_MONITORS:
        raise HTTPException(status_code=404, detail="Store monitor not found")
    STORE_MONITORS[store_id]["active"] = not STORE_MONITORS[store_id]["active"]
    return {"store_id": store_id, "active": STORE_MONITORS[store_id]["active"]}

@app.get("/api/products")
async def get_products():
    return {"products": PRODUCTS_DB}

@app.post("/api/products/simulate-restock/{product_id}")
async def simulate_restock(product_id: str):
    for p in PRODUCTS_DB:
        if p["id"] == product_id:
            p["status"] = "RESTOCK_DETECTED"
            p["last_checked"] = "Just now"
            return {"success": True, "product": p}
    raise HTTPException(status_code=404, detail="Product not found")

# WebSocket for streaming telemetry
@app.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            await asyncio.sleep(2.5)
            log_item = {
                "timestamp": datetime.utcnow().strftime("%H:%M:%S"),
                "level": random.choice(["INFO", "INFO", "INFO", "RESTOCK", "LATENCY"]),
                "store": random.choice(["Pokémon Center", "Target", "Best Buy", "Walmart"]),
                "message": random.choice([
                    "HTTP/2 GET payload verified (200 OK)",
                    "Sub-second restock token acquired",
                    "Rotating ISP proxy tunnel ping: 142ms",
                    "Inventory polling cycle completed (0 drops)",
                    "Restock detected on SKU PKM-PREV-ETB-01! Dispatching workers...",
                ])
            }
            await websocket.send_json(log_item)
    except WebSocketDisconnect:
        pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("bot.main:app", host="127.0.0.1", port=8000, reload=True)
