import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Database, ArrowRight, Server, Layers, Cpu, Globe, Monitor, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import API from '../api';
import { toast } from "sonner";

export default function Mastery() {
  const { user } = useSelector(state => state.auth);
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("DSA");

  useEffect(() => {
    fetchPatterns();
  }, []);

  const fetchPatterns = async () => {
    try {
      // Fetch all patterns
      const { data } = await API.get('/patterns');
      setPatterns(data.patterns);
      
      // Auto-seed if empty
      if (data.patterns.length === 0) {
        await API.get('/patterns/seed');
        const retry = await API.get('/patterns');
        setPatterns(retry.data.patterns);
      }
    } catch (error) {
      toast.error("Failed to load curriculum");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (category) => {
    switch(category) {
      case 'DSA': return <Cpu size={24} />;
      case 'DBMS': return <Database size={24} />;
      case 'Networking': return <Globe size={24} />;
      case 'OS': return <Monitor size={24} />;
      default: return <Layers size={24} />;
    }
  };

  const categories = ["DSA", "DBMS", "Networking", "OS"];

  if (loading) return <div className="text-slate-500 font-mono p-10">Loading Engineering Modules...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">Engineering Mastery</h1>
        <p className="text-slate-400 mt-2">Deep dive into the core principles of modern software engineering.</p>
      </div>

      <Tabs defaultValue="DSA" className="w-full" onValueChange={setActiveCategory}>
        <TabsList className="bg-slate-900 border border-slate-800 p-1 mb-8">
            {categories.map(cat => (
                <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 font-bold tracking-wider"
                >
                    {cat}
                </TabsTrigger>
            ))}
        </TabsList>

        {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="space-y-4">
                {patterns.filter(p => p.category === cat).length === 0 ? (
                    <div className="text-slate-500 italic">No modules available for {cat} yet.</div>
                ) : (
                    patterns.filter(p => p.category === cat).map((pattern) => {
                        const isMastered = user?.masteredPatterns?.includes(pattern._id);
                        return (
                        <div key={pattern._id} className={`group flex items-center justify-between p-6 bg-slate-900 border ${isMastered ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-slate-800'} rounded-xl hover:border-emerald-500/50 transition-all`}>
                            <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${isMastered ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'} group-hover:text-emerald-400 transition-colors`}>
                                {isMastered ? <CheckCircle size={24} /> : getIcon(pattern.category)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    {pattern.title}
                                    {isMastered && <span className="text-[10px] bg-emerald-500 text-black font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Mastered</span>}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                    pattern.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' : 
                                    pattern.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                                }`}>{pattern.difficulty}</span>
                                <span className="text-xs text-slate-500">{pattern.category}</span>
                                </div>
                            </div>
                            </div>
                            
                            <Button variant={isMastered ? "secondary" : "ghost"} className="group-hover:translate-x-1 transition-transform" asChild>
                            <Link to={`/learning/${pattern.slug}`}>
                                {isMastered ? "Review Module" : "Start Module"} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            </Button>
                        </div>
                    )})
                )}
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
