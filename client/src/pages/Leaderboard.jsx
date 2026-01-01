import { useEffect, useState } from 'react';
import { Trophy, Medal, User, Loader2 } from 'lucide-react';
import API from '../api';
import { toast } from 'sonner';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await API.get('/user/leaderboard');
      setLeaders(data.leaderboard);
    } catch (error) {
      toast.error("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Trophy className="text-yellow-400" size={20} />;
      case 1: return <Medal className="text-slate-300" size={20} />; // Silver
      case 2: return <Medal className="text-amber-600" size={20} />; // Bronze
      default: return <span className="font-mono text-slate-500 font-bold">#{index + 1}</span>;
    }
  };

  const getBadge = (karma) => {
    if (karma > 10000) return "Grandmaster";
    if (karma > 5000) return "Master";
    if (karma > 2500) return "Diamond";
    if (karma > 1000) return "Platinum";
    return "Gold";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Global Leaderboard</h2>
        <p className="text-slate-400">Top engineers grinding the hardest this week.</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-5">Engineer</div>
          <div className="col-span-4 md:col-span-3 text-center">Karma</div>
          <div className="hidden md:block col-span-3 text-center">Link</div>
        </div>

        {leaders.length === 0 ? (
           <div className="p-8 text-center text-slate-500">No data available yet. Be the first to grind!</div>
        ) : (
          leaders.map((leader, index) => (
            <div 
              key={leader._id} 
              className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${
                index === 0 ? 'bg-emerald-900/10' : ''
              }`}
            >
              <div className="col-span-2 md:col-span-1 flex justify-center">
                {getRankIcon(index)}
              </div>
              
              <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
                  <User size={14} className="text-slate-400" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-200 truncate">{leader.name}</div>
                  <div className="text-[10px] text-emerald-500 font-mono uppercase">{getBadge(leader.karma)}</div>
                </div>
              </div>

              <div className="col-span-4 md:col-span-3 text-center font-mono font-bold text-slate-300">
                {leader.karma.toLocaleString()}
              </div>

              <div className="hidden md:block col-span-3 text-center">
                {leader.githubProfile ? (
                    <a href={leader.githubProfile} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                        Github
                    </a>
                ) : (
                    <span className="text-xs text-slate-600">-</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
