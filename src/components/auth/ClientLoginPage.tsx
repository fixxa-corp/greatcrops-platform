import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Leaf, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../lib/auth';

export function ClientLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user?.role === 'client') {
    navigate('/client', { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password, 'client');
    if (success) {
      navigate('/client', { replace: true });
    } else {
      setError('Invalid email or password. Please contact your account manager.');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-10 h-10 bg-green-deep rounded-xl flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-charcoal">Great Crops</span>
          <Leaf className="w-5 h-5 text-green-deep" />
        </div>
        <p className="text-center text-charcoal-lighter text-sm mb-8">Grower Portal</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-charcoal-lighter" />
            <h1 className="text-lg font-semibold text-charcoal">Client Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-charcoal placeholder-gray-400 focus:ring-2 focus:ring-green-deep/20 focus:border-green-deep outline-none transition-all text-sm"
                  placeholder="your@email.com"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-charcoal placeholder-gray-400 focus:ring-2 focus:ring-green-deep/20 focus:border-green-deep outline-none transition-all text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-deep text-white font-semibold rounded-lg hover:bg-green-deep-light transition-colors mt-2"
            >
              Sign In to Portal
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-charcoal-lighter mt-6">
          Need access? Contact your Great Crops account manager.
        </p>
      </div>
    </div>
  );
}
