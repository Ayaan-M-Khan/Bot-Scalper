import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import SupportedSites from './components/SupportedSites';
import MonitorsView from './components/MonitorsView';
import ArchitectureLab from './components/ArchitectureLab';
import OpenSourceSection from './components/OpenSourceSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CommandPaletteModal from './components/CommandPaletteModal';
import QuickstartModal from './components/QuickstartModal';
import DashboardModal from './components/DashboardModal';

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuickstartModalOpen, setIsQuickstartModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

  // Listen for Cmd+K or Ctrl+K globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandPaletteAction = (actionId: string) => {
    switch (actionId) {
      case 'task-engine': {
        const el = document.getElementById('task-engine');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'view-sites': {
        const el = document.getElementById('supported-sites');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'monitors-view': {
        const el = document.getElementById('monitors-view');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'architecture-lab': {
        const el = document.getElementById('architecture-lab');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'open-source': {
        const el = document.getElementById('open-source');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'quickstart': {
        setIsQuickstartModalOpen(true);
        break;
      }
      case 'how-it-works': {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'open-faq': {
        const el = document.getElementById('faq');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'pokemon-center':
      case 'target-engine':
      case 'best-buy-engine': {
        const sitesEl = document.getElementById('supported-sites');
        if (sitesEl) sitesEl.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'github-repo': {
        window.open('https://github.com/Ayaan-M-Khan/pokemon-bot', '_blank');
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Announcement Bar & Sticky Header */}
      <Navbar 
        onOpenQuickstart={() => setIsQuickstartModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenDashboard={() => setIsDashboardModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Interactive Task Engine Simulator */}
        <Hero 
          onOpenQuickstart={() => setIsQuickstartModalOpen(true)}
          onExploreFeatures={() => {
            const el = document.getElementById('features');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Bento Grid: Inside the Scalper Engine */}
        <Features 
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onExploreSites={() => {
            const el = document.getElementById('supported-sites');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3-Step Workflow: Create, Automate, Analyze */}
        <HowItWorks />

        {/* Supported Retailers Directory & Real-Time Filter */}
        <SupportedSites />

        {/* Live Retailer Health, Product Watcher & Telemetry Stream */}
        <MonitorsView />

        {/* Concurrency, Distributed Locking & Rate Limit Research Lab */}
        <ArchitectureLab />

        {/* 100% Free & Open Source Configuration & Repo Section */}
        <OpenSourceSection 
          onOpenQuickstart={() => setIsQuickstartModalOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer 
        onOpenQuickstart={() => setIsQuickstartModalOpen(true)}
      />

      {/* Modals */}
      <CommandPaletteModal 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleCommandPaletteAction}
      />

      <QuickstartModal 
        isOpen={isQuickstartModalOpen}
        onClose={() => setIsQuickstartModalOpen(false)}
      />

      <DashboardModal 
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
        onOpenQuickstart={() => setIsQuickstartModalOpen(true)}
      />

    </div>
  );
}
