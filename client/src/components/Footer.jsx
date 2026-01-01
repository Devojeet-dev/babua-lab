import React from 'react';
import { Terminal, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand Side */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 text-emerald-500 font-black tracking-tighter text-2xl italic mb-6">
              <Terminal size={28} strokeWidth={3} />
              <span>BABUA DEV-LAB</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Killing the "Tutorial Hell" culture one pattern at a time. Built for engineers who want to build, not just watch.
            </p>
            <div className="flex gap-4">
              <a href="https://www.github.com/Devojeet-dev/"
                target="_blank"
                rel="noopener noreferrer" className="p-2 border border-white/10 rounded hover:bg-emerald-500/10 hover:text-emerald-500 transition-all">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/Devo-jeet/"
                target="_blank"
                rel="noopener noreferrer" className="p-2 border border-white/10 rounded hover:bg-emerald-500/10 hover:text-emerald-500 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-emerald-500 font-black text-xs tracking-[0.2em] uppercase mb-6">Syllabus</h4>
              <ul className="flex flex-col gap-4 text-sm text-slate-400 font-bold">
                <li><a href="#" className="hover:text-white transition-colors">Patterns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Architectures</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Deployment</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-500 font-black text-xs tracking-[0.2em] uppercase mb-6">Support</h4>
              <ul className="flex flex-col gap-4 text-sm text-slate-400 font-bold">
                <li><a href="#" className="hover:text-white transition-colors">SOS Debug</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-emerald-500 font-black text-xs tracking-[0.2em] uppercase mb-6">System Status</h4>
              <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/20 px-3 py-2 rounded">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                ALL SYSTEMS OPERATIONAL
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-center md:flex-row justify-center items-center gap-4 text-[15px] text-slate-600 font-black tracking-widest uppercase">
          <p>© 2025 BABUA DEV-LAB. ESTABLISHED FOR THE LEAGUE developed by <a href="https://www.linkedin.com/in/Devo-jeet/"
            target="_blank"
            rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">Babua</a>.</p>
        </div>
      </div>
    </footer>
  );
}