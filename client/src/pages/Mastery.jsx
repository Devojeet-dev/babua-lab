import { Link } from 'react-router-dom';
import { Database, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Mastery() {
  const patterns = [
    { id: 'sliding-window', title: "Sliding Window", difficulty: "Medium", progress: 30 },
    { id: 'two-pointers', title: "Two Pointers", difficulty: "Easy", progress: 80 },
    { id: 'fast-slow', title: "Fast & Slow Pointers", difficulty: "Medium", progress: 0 },
    { id: 'merge-intervals', title: "Merge Intervals", difficulty: "Medium", progress: 0 },
    { id: 'cyclic-sort', title: "Cyclic Sort", difficulty: "Hard", progress: 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">Pattern Mastery</h1>
        <p className="text-slate-400 mt-2">The complete archive of Bhaiya's mental models.</p>
      </div>

      <div className="grid gap-4">
        {patterns.map((pattern) => (
          <div key={pattern.id} className="group flex items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${pattern.progress === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                <Database size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{pattern.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      pattern.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' : 
                      pattern.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                  }`}>{pattern.difficulty}</span>
                  <span className="text-xs text-slate-500">{pattern.progress}% Mastered</span>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" className="group-hover:translate-x-1 transition-transform" asChild>
              <Link to={`/learning/${pattern.id}`}>
                Start <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
