/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayCircle, FileText, CheckCircle, Code, ChevronRight, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function LearningLab() {
  const { patternId } = useParams();
  const [isMastered, setIsMastered] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] min-h-[500px] bg-slate-950 font-sans text-slate-200 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Header Area */}
      <header className="h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-slate-900/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 p-1.5 rounded-lg">
            <Code className="text-emerald-500" size={20} />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-slate-500">DSA Vault</span> 
            <ChevronRight size={14} className="text-slate-600" />
            <span className="text-white">Sliding Window Pattern</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Progress</span>
                <span className="text-xs text-emerald-400 font-mono">Earn +50 Karma</span>
            </div>
            <Button 
                onClick={() => setIsMastered(!isMastered)}
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
        {/* Left Side: Video Player Container */}
        <div className="flex-[0.65] bg-black relative group">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/4v0VzAWlz1Y?modestbranding=1&rel=0" 
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Right Side: Resources & Logic */}
        <div className="flex-[0.35] flex flex-col bg-slate-900/50 border-l border-slate-800">
          <Tabs defaultValue="logic" className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-800 bg-slate-900/80">
                <TabsList className="w-full bg-slate-950 border border-slate-800 p-1">
                    <TabsTrigger value="logic" className="flex-1 data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400">
                        <FileText size={14} className="mr-2"/> Logic
                    </TabsTrigger>
                    <TabsTrigger value="problems" className="flex-1 data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400">
                        <Code size={14} className="mr-2"/> Problems
                    </TabsTrigger>
                </TabsList>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <TabsContent value="logic" className="mt-0 space-y-6 animate-in fade-in duration-300">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Bhaiya's Core Logic</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Sliding Window technique ka use tab hota hai jab hume ek continuous subset (subarray or substring) find karni ho under certain constraints. 
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cheat Sheet</h4>
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono shadow-inner">
                            <div className="flex gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                            </div>
                            <code className="text-[13px] text-emerald-300 leading-6">
                                <span className="text-purple-400">while</span>(right &lt; n) {'{'}<br/>
                                &nbsp;&nbsp;<span className="text-slate-500">// 1. Expand</span><br/>
                                &nbsp;&nbsp;window.add(arr[right]);<br/><br/>
                                &nbsp;&nbsp;<span className="text-slate-500">// 2. Shrink</span><br/>
                                &nbsp;&nbsp;<span className="text-purple-400">while</span>(invalid) {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;window.remove(arr[left++]);<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                &nbsp;&nbsp;right++;<br/>
                                {'}'}
                            </code>
                        </div>
                    </div>

                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                        <h4 className="text-sm font-semibold text-emerald-400 mb-1 flex items-center gap-2">
                            <PlayCircle size={16}/> Pro Tip
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Always check if the window size is fixed or variable before starting the implementation.
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="problems" className="mt-0 space-y-3 animate-in fade-in duration-300">
                    <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest">Curated Practice</h3>
                    <ProblemLink title="Longest Substring Without Repeating Characters" difficulty="Medium" />
                    <ProblemLink title="Minimum Window Substring" difficulty="Hard" />
                    <ProblemLink title="Find All Anagrams in a String" difficulty="Medium" />
                    <ProblemLink title="Sliding Window Maximum" difficulty="Hard" />
                </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}

function ProblemLink({ title, difficulty }) {
  return (
    <div className="group flex items-center justify-between p-4 bg-slate-800/30 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all cursor-pointer">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{title}</span>
        <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                difficulty === 'Hard' 
                ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
            }`}>
                {difficulty}
            </span>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                LeetCode <ExternalLink size={10}/>
            </span>
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-600 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" />
    </div>
  );
}