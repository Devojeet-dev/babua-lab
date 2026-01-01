import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { LogOut, Zap, User, ShieldCheck, Trophy, LayoutDashboard } from 'lucide-react';

export default function DashboardLayout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { label: 'LEARN', path: '/dashboard', icon: LayoutDashboard },
    { label: 'PROFILE', path: '/profile', icon: User },
    { label: 'SERVICES', path: '/services', icon: Zap },
    { label: 'MASTERY', path: '/mastery', icon: LayoutDashboard },
    { label: 'LEADERBOARD', path: '/leaderboard', icon: Trophy },
    { label: 'PROOF OF WORK', path: '/proof-of-work', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-300 font-mono selection:bg-emerald-500/30">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-emerald-500 font-black text-xl tracking-tighter">
              {'>_'} BABUA DEV-LAB
            </span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-emerald-900/20 border border-emerald-500/30 px-3 py-1.5 rounded text-xs font-bold text-emerald-400">
              <Zap size={14} className="fill-emerald-400" />
              <span>{user?.karma || 0} KARMA</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-wider"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Welcome & Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-0">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
              WELCOME BACK, <span className="text-emerald-500">{user?.name?.split(' ')[0] || 'DEV'}</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Ready to master more patterns?</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-slate-800">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  pb-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2
                  ${isActive 
                    ? 'text-emerald-400 border-emerald-500' 
                    : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-700'}
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full custom-scrollbar bg-[#0a0a0f] relative">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
