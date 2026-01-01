import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import DashboardLayout from './components/layout/DashboardLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LearningLab from './pages/LearningLab';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Mastery from './pages/Mastery';
import Leaderboard from './pages/Leaderboard';
import ProofOfWork from './pages/ProofOfWork';
import { Toaster } from "@/components/ui/sonner"
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/mastery" element={<Mastery />} />
            <Route path="/learning/:patternId" element={<LearningLab />} />
            <Route path="/services" element={<Services />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/proof-of-work" element={<ProofOfWork />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </Provider>
  );
}

export default App;