import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Code, GitCommit, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import API from '../api'; // Assuming your axios instance is here

export default function ProofOfWork() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    githubLink: '',
    projectLink: '',
    description: '',
    tags: '' 
  });

  // 1. Fetch Projects on Mount
  useEffect(() => {
    const fetchPOWs = async () => {
      try {
        const { data } = await API.get('/userPow/get'); // Matches your powRouter.get('/get')
        setProjects(data.projects || []);
      } catch (error) {
        toast.error("Failed to sync registry", {
          description: error.response?.data?.message || "Internal server error"
        });
      } finally {
        setFetching(false);
      }
    };
    fetchPOWs();
  }, []);

  // 2. Handle Submit to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };

      const { data } = await API.post('/userPow/add', payload); // Matches powRouter.post('/add')
      
      toast.success("Project Deployed", { description: "Your Proof of Work has been registered." });
      
      // Update local state so UI updates immediately
      setProjects([data.project, ...projects]); 
      setIsOpen(false);
      setFormData({ title: '', githubLink: '', projectLink: '', description: '', tags: '' });
    } catch (error) {
      toast.error("Deployment Failed", {
        description: error.response?.data?.message || "Check your connection"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight italic">Proof of Work</h2>
        <p className="text-slate-400">Showcase your engineering mastery. Talk is cheap, show me the code.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 3. Render Projects from Backend */}
        {fetching ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader2 className="animate-spin text-emerald-500" size={40} />
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-[#0f1115] border border-slate-800 rounded-xl p-6 hover:border-emerald-500/30 transition-all group flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-900/10 rounded-lg text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                  <Code size={24} />
                </div>
                <div className="flex gap-2">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white">
                      <Github size={16} />
                    </Button>
                  </a>
                  {project.projectLink && (
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white">
                        <ExternalLink size={16} />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors uppercase tracking-tighter">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-black px-2 py-0.5 rounded bg-slate-900 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Add New Project Trigger */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="border border-dashed border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-pointer min-h-[250px] group">
              <div className="p-4 bg-slate-900 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Plus size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-300">Add New Project</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-xs">Link your GitHub repositories to demonstrate your skills.</p>
            </div>
          </DialogTrigger>

          <DialogContent className="bg-slate-950 border-white/10 text-slate-200 max-w-lg font-mono">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black italic tracking-tighter text-emerald-500">INITIATE_PROJECT_UPLOAD</DialogTitle>
              <DialogDescription className="text-slate-500 text-xs uppercase tracking-widest">
                Populate the fields to update the dev-lab registry.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-emerald-500/70">Project Title</Label>
                  <Input 
                    required 
                    className="bg-black border-white/10 rounded-none focus:border-emerald-500" 
                    placeholder="E.g. Neural Link"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-emerald-500/70">Tags (Comma Sep)</Label>
                  <Input 
                    required 
                    className="bg-black border-white/10 rounded-none focus:border-emerald-500" 
                    placeholder="React, Node, TS"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-emerald-500/70">GitHub Repository URL</Label>
                <Input 
                  required 
                  type="url"
                  className="bg-black border-white/10 rounded-none focus:border-emerald-500" 
                  placeholder="https://github.com/..."
                  value={formData.githubLink}
                  onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-emerald-500/70">Live Demo URL</Label>
                <Input 
                  type="url"
                  className="bg-black border-white/10 rounded-none focus:border-emerald-500" 
                  placeholder="https://your-demo.com"
                  value={formData.projectLink}
                  onChange={(e) => setFormData({...formData, projectLink: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-emerald-500/70">Technical Description</Label>
                <Textarea 
                  required 
                  className="bg-black border-white/10 rounded-none focus:border-emerald-500 min-h-[80px]" 
                  placeholder="What patterns did you use?"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-none border-b-4 border-emerald-900 active:border-b-0 transition-all pt-2"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : 'DEPLOY TO PROFILE'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}