import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowRight, Github, Code2, ShieldCheck, Zap, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Footer from '../components/Footer'; // We will create this next

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-200 font-mono relative overflow-x-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]"></div>
        <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2 text-emerald-500 font-black tracking-tighter text-xl md:text-2xl italic">
          <Terminal size={24} strokeWidth={3} />
          <span>BABUA DEV-LAB</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/login" className="text-xs font-bold hover:text-emerald-400 transition-colors tracking-widest">LOGIN</Link>
          <Link to="/signup">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 border-b-4 border-emerald-800 active:border-b-0 transition-all">
              JOIN THE LEAGUE
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-emerald-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-5">
            <Link to="/login" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>LOGIN</Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-emerald-600 font-bold">JOIN THE LEAGUE</Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-20 md:pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase mb-8">
          <Zap size={12} fill="currentColor" /> Pattern-Based Mastery
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
          STOP GRINDING. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 italic">
            START BUILDING.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-xl mb-12 px-4 leading-relaxed">
          The only LMS designed for the <span className="text-emerald-400">"Babua"</span> mindset. 100% Free technical patterns. 
          Pay only when you need a Senior Architect to roast your code.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="h-16 w-full sm:px-10 bg-white text-black hover:bg-emerald-400 transition-colors text-lg font-black italic tracking-tight">
              GET ACCESS NOW <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-16 w-full sm:w-auto sm:px-10 border-slate-800 hover:bg-slate-900 text-lg font-bold text-slate-300">
            <Github className="mr-2" /> VIEW ON GITHUB
          </Button>
        </div>
      </section>

      {/* Feature Bricks */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 px-4 md:px-8 pb-32 max-w-7xl mx-auto">
        <FeatureBrick
          icon={<Code2 className="text-emerald-500" size={32} />}
          title="FREE PATTERNS"
          desc="Sliding Window, Two Pointers, Singleton - Master the core logic for free."
        />
        <FeatureBrick
          icon={<ShieldCheck className="text-cyan-500" size={32} />}
          title="PROOF OF WORK"
          desc="No useless certificates. Build projects, link GitHub, earn real Karma."
        />
        <FeatureBrick
          icon={<Zap className="text-amber-500" size={32} />}
          title="SOS DEBUGGING"
          desc="Stuck on a bug? Pay ₹49 for an emergency 10-min architectural roast."
        />
      </section>

      <Footer />
    </div>
  );
}

function FeatureBrick({ icon, title, desc }) {
  return (
    <div className="group p-8 md:p-12 bg-black hover:bg-slate-900/50 transition-all duration-300">
      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-black mb-4 italic tracking-tight group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}