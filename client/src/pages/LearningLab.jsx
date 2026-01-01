import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '@/store/slices/authSlice';
import { PlayCircle, FileText, CheckCircle, Code, ChevronRight, Briefcase, BookOpen, Layers } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import API from '../api';

export default function LearningLab() {
  const { patternId } = useParams(); // This is actually the slug now
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [pattern, setPattern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMastered, setIsMastered] = useState(false);

  useEffect(() => {
    const fetchPattern = async () => {
      try {
        const { data } = await API.get(`/patterns/${patternId}`);
        setPattern(data.pattern);
        
        // Check if user has already mastered this pattern
        const userRes = await API.get('/user/get-user');
        const masteredIds = userRes.data.user.masteredPatterns || [];
        if (masteredIds.includes(data.pattern._id)) {
            setIsMastered(true);
        }

      } catch (error) {
        toast.error("Module not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPattern();
  }, [patternId]);

  const handleMastery = async () => {
    try {
        const { data } = await API.post(`/patterns/${patternId}/master`);
        setIsMastered(data.mastered);
        
        // Update Redux state to reflect new karma and mastered count immediately
        if (user) {
            let newMasteredPatterns;
            if (data.mastered) {
                // Add if not present
                newMasteredPatterns = [...new Set([...(user.masteredPatterns || []), pattern._id])];
            } else {
                // Remove if present
                newMasteredPatterns = (user.masteredPatterns || []).filter(id => id !== pattern._id);
            }

            dispatch(updateUser({ 
                karma: data.karma,
                masteredPatterns: newMasteredPatterns
            }));
        }

        if (data.mastered) {
            toast.success(`+${data.karmaPoints} Karma!`, { description: "Engineering mastery recorded." });
        } else {
            toast.info("Mastery reverted", { description: "Pattern marked as incomplete." });
        }
    } catch (error) {
        toast.error("Failed to update mastery", { description: error.response?.data?.message || "Server error" });
    }
  };

  if (loading) return <div className="text-white p-10 font-mono">Loading Module...</div>;
  if (!pattern) return <div className="text-white p-10 font-mono">Module not found.</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-slate-950 font-sans text-slate-200 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Header Area */}
      <header className="h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-slate-900/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 p-1.5 rounded-lg">
            <Layers className="text-emerald-500" size={20} />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link to="/mastery" className="text-slate-500 hover:text-white transition-colors">Engineering Mastery</Link> 
            <ChevronRight size={14} className="text-slate-600" />
            <span className="text-white">{pattern.title}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Reward</span>
                <span className="text-xs text-emerald-400 font-mono">+{pattern.karmaPoints} Karma</span>
            </div>
            <Button 
                onClick={handleMastery}
                variant={isMastered ? "secondary" : "default"}
                className={`transition-all duration-300 shadow-lg ${
                    isMastered 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20" 
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
            >
                {isMastered ? <CheckCircle className="mr-2" size={18}/> : null}
                {isMastered ? "Mastered" : "Mark as Mastered"}
            </Button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Left Side: Concept & Theory */}
        <div className="flex-[0.5] bg-slate-900/30 p-8 overflow-y-auto border-r border-slate-800 custom-scrollbar">
           <div className="prose prose-invert max-w-none">
             <h2 className="text-3xl font-black text-white mb-6 tracking-tight">{pattern.title}</h2>
             <div className="bg-slate-900 border-l-4 border-emerald-500 p-4 rounded-r mb-8">
               <p className="text-emerald-300 italic text-lg">{pattern.description}</p>
             </div>
             
             <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
               <BookOpen size={20} className="text-purple-400"/> Core Concept
             </h3>
             <div className="text-slate-400 leading-relaxed whitespace-pre-wrap">
               {pattern.content.theoryMarkdown}
             </div>
           </div>
        </div>

        {/* Right Side: Application & Project */}
        <div className="flex-[0.5] flex flex-col bg-slate-950">
          <Tabs defaultValue="video" className="flex flex-col h-full">
            <div className="p-0 border-b border-slate-800">
                <TabsList className="w-full bg-slate-950 p-0 h-12 rounded-none">
                    <TabsTrigger value="video" className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-slate-900 data-[state=active]:text-emerald-400 transition-all">
                        <PlayCircle size={16} className="mr-2"/> Video Lesson
                    </TabsTrigger>
                    <TabsTrigger value="usecase" className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-slate-900 data-[state=active]:text-emerald-400 transition-all">
                        <Briefcase size={16} className="mr-2"/> Real World Use Case
                    </TabsTrigger>
                    <TabsTrigger value="project" className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-slate-900 data-[state=active]:text-emerald-400 transition-all">
                        <Code size={16} className="mr-2"/> Project Brief
                    </TabsTrigger>
                </TabsList>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <TabsContent value="video" className="mt-0 space-y-6 animate-in fade-in duration-300">
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-lg font-bold text-white mb-4">Video Tutorial</h3>
                        <div className="aspect-video bg-black rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
                            {pattern.content.videoUrl ? (
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={pattern.content.videoUrl} 
                                    title={pattern.title}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-500 flex-col gap-2">
                                    <PlayCircle size={48} className="opacity-20"/>
                                    <span>No video available for this module.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="usecase" className="mt-0 space-y-6 animate-in fade-in duration-300">
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-lg font-bold text-white mb-4">Industry Application</h3>
                        <p className="text-slate-300 leading-relaxed">
                            {pattern.content.realWorldUseCase}
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="project" className="mt-0 space-y-6 animate-in fade-in duration-300">
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-lg font-bold text-white mb-2">Engineering Challenge</h3>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-emerald-400 border border-slate-800 mb-4">
                            &gt; {pattern.content.projectBrief}
                        </div>
                        <p className="text-slate-400 text-sm">
                            Implement this solution in your own IDE. Once complete, submit your GitHub link in the "Proof of Work" section to get verified.
                        </p>
                        
                        <Button className="w-full mt-6" variant="outline" asChild>
                            <Link to="/proof-of-work">Submit Proof of Work</Link>
                        </Button>
                    </div>
                </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}
