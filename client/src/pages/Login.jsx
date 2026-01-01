import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import API from '../api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Terminal } from 'lucide-react';
import { toast } from "sonner";

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await API.post('/auth/login', formData);
      dispatch(loginSuccess(data));
      toast.success("Welcome back!", { description: data.message });
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(loginFailure(message));
      toast.error("Login Failed", { description: message });
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-6 font-mono relative overflow-hidden">
      {/* Background Effect - Matches Landing Page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]"></div>
        <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]"></div>
      </div>

      {/* Logo / Brand (Visible on mobile for context) */}
      <Link to="/" className="relative z-10 flex items-center gap-2 text-emerald-500 font-black tracking-tighter text-xl italic mb-8 md:mb-12">
        <Terminal size={24} strokeWidth={3} />
        <span>BABUA DEV-LAB</span>
      </Link>

      <div className="w-full max-w-[400px] relative z-10">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden">
          {/* Window Header */}
          <div className="bg-black/60 px-4 py-3 border-b border-white/5 flex justify-between items-center">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">auth_session.exe</div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
                INITIATE <span className="text-emerald-500">LOGIN</span>
              </h1>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                Connect to the mainframe. Unauthorized access is strictly monitored.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase text-emerald-500 font-black tracking-[0.2em]">User Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-black border-white/10 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-slate-200 placeholder:text-slate-800 rounded-none h-12"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] uppercase text-emerald-500 font-black tracking-[0.2em]">Access Key</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-black border-white/10 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-slate-200 placeholder:text-slate-800 rounded-none h-12"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black tracking-widest uppercase h-12 rounded-none border-b-4 border-emerald-900 active:border-b-0 transition-all"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'AUTHENTICATE'}
              </Button>
            </form>

            <div className="text-center pt-6 border-t border-white/5">
              <Link to="/signup" className="text-[10px] md:text-xs text-slate-500 hover:text-emerald-400 transition-colors font-bold uppercase tracking-widest">
                New Recruit? <span className="text-emerald-500 underline underline-offset-4">Join the League</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile-friendly helper footer info */}
        <p className="text-center text-slate-700 text-[9px] mt-8 uppercase tracking-[0.3em]">
          Secured by Babua-Shield v2.4.0
        </p>
      </div>
    </div>
  );
}