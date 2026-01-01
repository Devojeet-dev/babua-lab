import { Zap, Code, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Services() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-emerald-500 mb-2 uppercase tracking-widest">REVENUE HUB</h2>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base">
          We monetize human time & expertise, not recorded videos. Get personalized help from CTO Bhaiya.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SOS DEBUG CARD */}
        <div className="bg-[#0f1115] border border-emerald-500/30 rounded-xl overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-700" />
          
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="mb-6">
              <div className="w-12 h-12 mb-4">
                 <Zap className="w-full h-full text-emerald-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-emerald-500 mb-2 tracking-tight">SOS DEBUG</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-emerald-400">₹49</span>
                <span className="text-slate-500 font-mono text-sm">/ 10 minutes</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8 min-h-[60px]">
              Stuck on a bug? Get a 10-minute emergency screen-share session with an expert engineer. Real-time debugging, no BS.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "10-minute live screen-share",
                "Real-time bug fixing",
                "Expert guidance"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check size={16} className="text-emerald-500" /> {item}
                </li>
              ))}
            </ul>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-widest uppercase h-12">
              REQUEST SOS DEBUG
            </Button>
          </div>
        </div>

        {/* CODE ROAST CARD */}
        <div className="bg-[#0f1115] border border-yellow-500/30 rounded-xl overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500" />
          
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="mb-6">
              <div className="w-12 h-12 mb-4">
                 <Code className="w-full h-full text-yellow-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-emerald-500 mb-2 tracking-tight">CODE ROAST</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-yellow-500">₹99</span>
                <span className="text-slate-500 font-mono text-sm">/ review</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8 min-h-[60px]">
              Submit your GitHub PR for a 1-on-1 LLD/Architecture review. Get honest feedback on your code design.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Code architecture review",
                "LLD pattern feedback",
                "1-on-1 discussion"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check size={16} className="text-yellow-500" /> {item}
                </li>
              ))}
            </ul>

            <Button className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold tracking-widest uppercase h-12">
              REQUEST CODE ROAST
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
