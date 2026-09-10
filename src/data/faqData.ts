import { FAQItem } from '../types';

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Open Source',
    question: 'Is Scalper really 100% free and open source?',
    answer: 'Yes! Scalper is created by Ayaan Khan as an open-source project released under the permissive MIT License. There are no subscriptions, purchase fees, renewal charges, or license locks. All source code, worker engines, task schedulers, and GUI interfaces are freely available on GitHub (https://github.com/Ayaan-M-Khan/pokemon-bot).'
  },
  {
    id: 'faq-2',
    category: 'Architecture',
    question: 'How does Scalper achieve high concurrency across dozens of tasks?',
    answer: 'Scalper uses Python 3.11+ asynchronous networking (via asyncio and a custom TaskGroup worker pool) alongside lightweight REST/WebSocket handlers. Rather than spawning heavy browser windows for routine tasks, Scalper conducts headless REST requests with custom TLS fingerprints, allowing dozens of concurrent tasks to execute on standard laptop hardware.'
  },
  {
    id: 'faq-3',
    category: 'Architecture',
    question: 'What is Address Jigging and why is it included in Scalper?',
    answer: 'Retailers deploy automated cancellation algorithms targeting duplicate orders sent to the same household. Scalper includes a built-in Address Jigging generator that creates syntactic permutations (e.g., swapping "Street" for "St.", adding variations like "Ste 4B", "Unit 4B", or "#4B") so carriers deliver to the exact same physical home while passing merchant fraud filters.'
  },
  {
    id: 'faq-4',
    category: 'Proxies & Stealth',
    question: 'What proxy configurations are recommended for Scalper?',
    answer: 'Scalper supports proxy group isolation:\n\n• Static ISP Proxies: Recommended for actual checkout and carting tasks on sites like Target, Best Buy, and Walmart. They provide sub-30ms response times while appearing as genuine residential connections.\n• Rotating Residential Proxies: Recommended for high-frequency stock polling and product page monitoring on Amazon and Pokémon Center, rotating IPs on each ping to prevent 429 rate limits.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'How can I run Scalper locally on my machine?',
    answer: 'You only need Python 3.11+ and Git. Simply run:\n\n1. git clone https://github.com/Ayaan-M-Khan/pokemon-bot.git\n2. cd pokemon-bot && pip install -r requirements.txt\n3. python -m bot.tasks.engine\n\nYou can also launch the web dashboard locally using npm install && npm run dev.'
  },
  {
    id: 'faq-6',
    category: 'Architecture',
    question: 'How does Scalper simulate drop contention and race conditions?',
    answer: 'In our Architecture & Concurrency Lab, Scalper benchmarks atomic in-memory Redis reservation scripts (using Lua DECRBY and TTL holds) against traditional SQL transactions. Under 100 simultaneous simulated checkout requests, this demonstrates how naive relational database locks cause inventory overselling, whereas atomic in-memory queues preserve 100% stock precision.'
  }
];
