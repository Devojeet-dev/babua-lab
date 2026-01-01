import { Trophy, Medal, User } from 'lucide-react';

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: "Sanket Singh", karma: 15420, streak: 45, badge: "Grandmaster" },
    { rank: 2, name: "Nishu Kumar", karma: 12100, streak: 32, badge: "Master" },
    { rank: 3, name: "Ankit Kumar", karma: 9850, streak: 28, badge: "Diamond" },
    { rank: 4, name: "Rahul Sharma", karma: 8540, streak: 12, badge: "Platinum" },
    { rank: 5, name: "Priya Patel", karma: 7200, streak: 15, badge: "Gold" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Global Leaderboard</h2>
        <p className="text-slate-400">Top engineers grinding the hardest this week.</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Engineer</div>
          <div className="col-span-3 text-center">Karma</div>
          <div className="col-span-3 text-center">Streak</div>
        </div>

        {leaders.map((leader, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${
              index === 0 ? 'bg-emerald-900/10' : ''
            }`}
          >
            <div className="col-span-1 flex justify-center">
              {index === 0 ? <Trophy className="text-yellow-400" size={20} /> :
               index === 1 ? <Medal className="text-slate-400" size={20} /> :
               index === 2 ? <Medal className="text-amber-700" size={20} /> :
               <span className="font-mono text-slate-500 font-bold">#{leader.rank}</span>}
            </div>
            
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <User size={14} className="text-slate-400" />
              </div>
              <div>
                <div className="font-bold text-slate-200">{leader.name}</div>
                <div className="text-[10px] text-emerald-500 font-mono uppercase">{leader.badge}</div>
              </div>
            </div>

            <div className="col-span-3 text-center font-mono font-bold text-slate-300">
              {leader.karma.toLocaleString()}
            </div>

            <div className="col-span-3 text-center">
              <span className="inline-flex items-center px-2 py-1 rounded bg-slate-800 text-xs font-bold text-orange-400 border border-slate-700">
                🔥 {leader.streak}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
