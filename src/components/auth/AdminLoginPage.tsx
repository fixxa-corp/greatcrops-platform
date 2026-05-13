import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Leaf, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../lib/auth';

export function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in as admin, redirect
  if (user?.role === 'admin') {
    navigate('/app', { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password, 'admin');
    if (success) {
      navigate('/app', { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-green-deep rounded-xl flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Great Crops</span>
          <Leaf className="w-5 h-5 text-green-deep-light" />
        </div>

        <div className="bg-charcoal-light rounded-2xl p-8 border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-gray-400" />
            <h1 className="text-lg font-semibold text-white">Admin Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-charcoal border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-deep/40 focus:border-green-deep outline-none transition-all text-sm"
                  placeholder="Username"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-charcoal border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-deep/40 focus:border-green-deep outline-none transition-all text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-deep text-white font-semibold rounded-lg hover:bg-green-deep-light transition-colors mt-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
