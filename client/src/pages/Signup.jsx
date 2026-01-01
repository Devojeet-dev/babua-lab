import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import API from '../api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', githubProfile: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      await API.post('/auth/register', formData);
      toast.success("Account created!", { description: "Logging you in..." });
      
      const { data } = await API.post('/auth/login', { 
        email: formData.email, 
        password: formData.password 
      });
      
      dispatch(loginSuccess(data));
      toast.success("Welcome!", { description: data.message });
      navigate('/dashboard');

    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(loginFailure(message));
      toast.error("Registration Failed", {
        description: message
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="ml-4 text-xs text-slate-500 font-mono">register.sh</div>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-emerald-500 tracking-tight">REGISTER</h1>
              <p className="text-slate-400 text-sm">Initialize your engineering journey.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase text-emerald-500/80 tracking-wider font-bold">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="bg-slate-950 border-slate-800 focus:border-emerald-500/50 text-slate-200 placeholder:text-slate-700 h-10"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase text-emerald-500/80 tracking-wider font-bold">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-slate-950 border-slate-800 focus:border-emerald-500/50 text-slate-200 placeholder:text-slate-700 h-10"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase text-emerald-500/80 tracking-wider font-bold">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-slate-950 border-slate-800 focus:border-emerald-500/50 text-slate-200 placeholder:text-slate-700 h-10"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubProfile" className="text-xs uppercase text-emerald-500/80 tracking-wider font-bold">GitHub Profile (Optional)</Label>
                <Input
                  id="githubProfile"
                  name="githubProfile"
                  className="bg-slate-950 border-slate-800 focus:border-emerald-500/50 text-slate-200 placeholder:text-slate-700 h-10"
                  placeholder="github.com/username"
                  value={formData.githubProfile}
                  onChange={handleChange}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-widest uppercase h-11"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Initialize Account'}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-slate-800/50">
              <Link to="/login" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">
                Already have an account? <span className="underline decoration-emerald-500/30 underline-offset-4">Login here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
