import { StoreMonitor, TrackedProductItem, TelemetryLog } from '../types';

export const INITIAL_STORE_MONITORS: StoreMonitor[] = [
  {
    id: 'pokemon-center',
    name: 'Pokémon Center US',
    url: 'https://www.pokemoncenter.com',
    endpoint: '/api/catalog/products/restock-v2',
    active: true,
    latencyMs: 142,
    status: 'HEALTHY',
    httpCode: 200,
    tlsHandshakeMs: 24,
    lastPing: '2s ago',
    proxyType: 'Rotating Residential Pool',
    category: 'TCG / Collectibles'
  },
  {
    id: 'target',
    name: 'Target US Direct',
    url: 'https://www.target.com',
    endpoint: '/redsky_aggregations/v1/web/pdp_client_v1',
    active: true,
    latencyMs: 118,
    status: 'HEALTHY',
    httpCode: 200,
    tlsHandshakeMs: 19,
    lastPing: '1s ago',
    proxyType: 'Static ISP Dedicated',
    category: 'Retail Giant'
  },
  {
    id: 'best-buy',
    name: 'Best Buy API',
    url: 'https://www.bestbuy.com',
    endpoint: '/api/3.0/priceBlocks',
    active: true,
    latencyMs: 184,
    status: 'HEALTHY',
    httpCode: 200,
    tlsHandshakeMs: 31,
    lastPing: '3s ago',
    proxyType: 'Static ISP Dedicated',
    category: 'Electronics'
  },
  {
    id: 'walmart',
    name: 'Walmart US Fast-Cart',
    url: 'https://www.walmart.com',
    endpoint: '/terra-service/orchestration/item-view',
    active: true,
    latencyMs: 228,
    status: 'HEALTHY',
    httpCode: 200,
    tlsHandshakeMs: 36,
    lastPing: '4s ago',
    proxyType: 'Rotating Residential Pool',
    category: 'Retail Giant'
  },
  {
    id: 'amazon',
    name: 'Amazon US Restock Engine',
    url: 'https://www.amazon.com',
    endpoint: '/gp/product/ajax-cart-v3',
    active: true,
    latencyMs: 165,
    status: 'HEALTHY',
    httpCode: 200,
    tlsHandshakeMs: 28,
    lastPing: '2s ago',
    proxyType: 'Datacenter FastTrack',
    category: 'Retail Giant'
  },
  {
    id: 'shopify-boutiques',
    name: 'Shopify TCG Boutiques',
    url: 'https://cdn.shopify.com',
    endpoint: '/products.json?limit=50',
    active: true,
    latencyMs: 88,
    status: 'HEALTHY',
    httpCode: 200,
    tlsHandshakeMs: 14,
    lastPing: '1s ago',
    proxyType: 'Static ISP Dedicated',
    category: 'Shopify Custom'
  }
];

export const INITIAL_TRACKED_PRODUCTS: TrackedProductItem[] = [
  {
    id: 'prod-prev-etb',
    store: 'Pokémon Center US',
    name: 'Prismatic Evolutions Pokémon Center Elite Trainer Box',
    sku: 'PKM-PREV-ETB-PC',
    price: 59.99,
    targetMsrp: 59.99,
    status: 'RESTOCK_DETECTED',
    imageUrl: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&auto=format&fit=crop&q=80',
    lastChecked: 'Just now',
    stockCount: 14,
    category: 'Scarlet & Violet'
  },
  {
    id: 'prod-ss-bb',
    store: 'Target US Direct',
    name: 'Surging Sparks Booster Bundle (6 Packs Display)',
    sku: 'TGT-SS-BB-8891',
    price: 26.94,
    targetMsrp: 26.94,
    status: 'IN_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    lastChecked: '14s ago',
    stockCount: 42,
    category: 'Booster Bundles'
  },
  {
    id: 'prod-151-zapdos',
    store: 'Best Buy',
    name: '151 Collection: Zapdos ex Box & Promo Card Pack',
    sku: 'BBY-151-ZAP-44',
    price: 21.99,
    targetMsrp: 21.99,
    status: 'OUT_OF_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80',
    lastChecked: '32s ago',
    stockCount: 0,
    category: 'Special Sets'
  },
  {
    id: 'prod-cz-sea-sky',
    store: 'Walmart US Fast-Cart',
    name: 'Crown Zenith Sea & Sky Premium Collection Box',
    sku: 'WMT-CZ-SS-110',
    price: 39.98,
    targetMsrp: 39.98,
    status: 'IN_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&auto=format&fit=crop&q=80',
    lastChecked: '1m ago',
    stockCount: 8,
    category: 'Premium Collection'
  },
  {
    id: 'prod-twilight-bb',
    store: 'Shopify TCG Boutiques',
    name: 'Twilight Masquerade Sealed Booster Box (36 Packs)',
    sku: 'SHP-TWM-BOX-36',
    price: 104.99,
    targetMsrp: 109.99,
    status: 'IN_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
    lastChecked: '48s ago',
    stockCount: 19,
    category: 'Booster Boxes'
  }
];

export const INITIAL_TELEMETRY_LOGS: TelemetryLog[] = [
  {
    id: 'log-1',
    timestamp: '12:05:42',
    level: 'INFO',
    store: 'System Daemon',
    message: 'Scalper asyncio TaskGroup initialized with 24 worker routines.',
  },
  {
    id: 'log-2',
    timestamp: '12:05:44',
    level: 'LATENCY',
    store: 'Target US',
    message: 'HTTP/2 REST ping verified: redsky_aggregations returned 200 OK.',
    latencyMs: 118,
  },
  {
    id: 'log-3',
    timestamp: '12:05:46',
    level: 'INFO',
    store: 'Proxy Manager',
    message: 'Assigned 8 Static ISP proxy tunnels to Pokémon Center worker pool.',
  },
  {
    id: 'log-4',
    timestamp: '12:05:49',
    level: 'RESTOCK',
    store: 'Pokémon Center US',
    message: 'RESTOCK DETECTED: SKU PKM-PREV-ETB-PC (Prismatic Evolutions ETB)! Queue bypass payload armed.',
    latencyMs: 142,
  },
  {
    id: 'log-5',
    timestamp: '12:05:50',
    level: 'INFO',
    store: 'Dispatcher',
    message: 'Dispatched 5 concurrent guest cart reservation tasks with syntactic address jigging.',
  }
];
