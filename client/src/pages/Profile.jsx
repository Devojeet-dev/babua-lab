import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '@/store/slices/authSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Github, Mail, Calendar, Edit2, Save } from 'lucide-react';
import { toast } from "sonner";
import API from "../api";
export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: user?.name || '', 
    email: user?.email || '', 
    githubProfile: user?.githubProfile || '' 
  });

  const handleUpdate = async () => {
    try {
      await API.put('/user/update-user', formData);
      dispatch(updateUser(formData));

      setIsEditing(false);

      toast.success("Profile updated", { description: "Your local configuration has been saved." });

    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (!user) return <div className="text-slate-400 font-mono p-8">Loading user data...</div>;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">Identity Matrix</h1>
          <p className="text-slate-400 mt-2">Manage your personal configuration.</p>
        </div>
        <Button 
          variant={isEditing ? "destructive" : "outline"}
          onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
          className="font-mono"
        >
          {isEditing ? 'Cancel Edit' : <><Edit2 className="mr-2 h-4 w-4"/> Edit Profile</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700">
              <User size={64} className="text-slate-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-emerald-500 text-sm font-mono">@{user.name.toLowerCase().replace(/\s/g, '_')}</p>
            </div>
            <div className="w-full pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase">Karma</p>
                <p className="text-xl font-bold text-white">{user.karma || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase">Joined</p>
                <p className="text-xl font-bold text-white">2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-4">User Configuration</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs uppercase">Full Name</Label>
                <div className="flex items-center gap-3">
                  <User size={16} className="text-slate-500"/>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={!isEditing}
                    className="bg-slate-950 border-slate-800 text-slate-200 focus:border-emerald-500/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs uppercase">GitHub Profile</Label>
                <div className="flex items-center gap-3">
                  <Github size={16} className="text-slate-500"/>
                  <Input 
                    value={formData.githubProfile} 
                    onChange={(e) => setFormData({...formData, githubProfile: e.target.value})}
                    disabled={!isEditing}
                    className="bg-slate-950 border-slate-800 text-slate-200 focus:border-emerald-500/50"
                    placeholder="github.com/username"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={handleUpdate}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
