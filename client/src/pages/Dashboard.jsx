import { Play, TrendingUp, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">THE VAULT</h1>
          <p className="text-slate-400 mt-2">Resume your engineering journey, Babua.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider">
          <Play className="mr-2 h-4 w-4" /> Resume Learning
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<TrendingUp className="text-emerald-400" />}
          label="Current Streak"
          value="12 Days"
          sub="Top 5% of learners"
        />
        <StatCard 
          icon={<Award className="text-yellow-400" />}
          label="Patterns Mastered"
          value="4 / 20"
          sub="Keep grinding!"
        />
        <StatCard 
          icon={<Clock className="text-blue-400" />}
          label="Time Invested"
          value="48 Hrs"
          sub="This week"
        />
      </div>

      {/* Recent Activity / Content */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-200">Recommended Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PatternCard 
                title="Sliding Window" 
                desc="Master fixed and variable window problems." 
                difficulty="Medium" 
                progress={30}
            />
            <PatternCard 
                title="Two Pointers" 
                desc="Optimize quadratic solutions to linear time." 
                difficulty="Easy" 
                progress={80}
            />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-800 rounded-lg">{icon}</div>
        <span className="text-xs font-mono text-slate-500 uppercase">{label}</span>
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-black text-white">{value}</h3>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

function PatternCard({ title, desc, difficulty, progress }) {
  return (
    <div className="group relative overflow-hidden bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all cursor-pointer">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
        <div className="space-y-3">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">{title}</h3>
                <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                    difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' : 
                    difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                }`}>{difficulty}</span>
            </div>
            <p className="text-sm text-slate-400">{desc}</p>
            
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    </div>
  );
}
