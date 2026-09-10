export interface SupportedSite {
  id: string;
  name: string;
  category: 'TCG / Collectibles' | 'Retail Giants' | 'Sneakers & Streetwear' | 'Electronics';
  region: string; // e.g., 'US', 'US/CA', 'Global', 'UK', 'JP'
  status: 'Operational' | 'Instant Cart' | 'Queue Bypass' | 'BETA';
  statusColor: string;
  popular?: boolean;
  notes?: string;
}

export interface BotTask {
  id: string;
  site: string;
  product: string;
  mode: 'Guest' | 'Account Login' | 'Fast Cart';
  profile: string;
  proxy: string;
  status: 'IDLE' | 'MONITORING' | 'IN_QUEUE' | 'CARTING' | 'SOLVING_CAPTCHA' | 'CHECKING_OUT' | 'SUCCESS' | 'FAILED';
  speed?: string;
  price: string;
  time: string;
  orderNumber?: string;
}

export interface BillingProfile {
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  cardLast4: string;
  jiggingEnabled: boolean;
}

export interface ProxyPool {
  id: string;
  name: string;
  type: 'Rotating Residential' | 'Static ISP' | 'Datacenter FastTrack';
  count: number;
  avgLatency: number; // in ms
  status: 'Healthy' | 'Degraded' | 'Testing';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Open Source' | 'Architecture' | 'Proxies & Stealth';
}
