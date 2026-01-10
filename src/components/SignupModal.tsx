import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { api } from '../utils/api';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSignupSuccess: (email: string) => void;
}

export function SignupModal({ isOpen, onClose, onSwitchToLogin, onSignupSuccess }: SignupModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      setError("You must agree to the terms.");
      return;
    }
    
    setLoading(true);
    setError(null);

    const res = await api.signup({
      email: formData.email,
      password: formData.password,
      name: formData.name
    });

    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      // Success - switch to login
      onSwitchToLogin();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Starfield */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          >
            {/* Starfield Stars */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-[5%] left-[10%] w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-[15%] left-[80%] w-1 h-1 bg-white rounded-full opacity-40"></div>
              <div className="absolute top-[25%] left-[20%] w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute top-[35%] left-[70%] w-1 h-1 bg-white rounded-full opacity-70"></div>
              <div className="absolute top-[45%] left-[15%] w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
              <div className="absolute top-[55%] left-[85%] w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute top-[65%] left-[30%] w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
              <div className="absolute top-[75%] left-[60%] w-1 h-1 bg-white rounded-full opacity-60"></div>
              <div className="absolute top-[85%] left-[40%] w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
              <div className="absolute top-[12%] left-[50%] w-1 h-1 bg-white rounded-full opacity-45 animate-pulse"></div>
              <div className="absolute top-[28%] left-[90%] w-0.5 h-0.5 bg-white rounded-full opacity-55"></div>
              <div className="absolute top-[42%] left-[5%] w-1 h-1 bg-white rounded-full opacity-65"></div>
              <div className="absolute top-[58%] left-[95%] w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute top-[72%] left-[25%] w-1 h-1 bg-white rounded-full opacity-60"></div>
              <div className="absolute top-[88%] left-[75%] w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
            </div>
          </motion.div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Form Card */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-[#00C2FF]/30 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                {/* Starfield effect */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="absolute top-[10%] left-[5%] w-1 h-1 bg-white rounded-full opacity-60"></div>
                  <div className="absolute top-[25%] left-[85%] w-1 h-1 bg-white rounded-full opacity-40"></div>
                  <div className="absolute top-[45%] left-[12%] w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
                  <div className="absolute top-[65%] left-[75%] w-1 h-1 bg-white rounded-full opacity-70"></div>
                  <div className="absolute top-[35%] left-[55%] w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
                  <div className="absolute top-[80%] left-[25%] w-1 h-1 bg-white rounded-full opacity-50"></div>
                  <div className="absolute top-[18%] left-[65%] w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
                  <div className="absolute top-[55%] left-[92%] w-1 h-1 bg-white rounded-full opacity-60"></div>
                  <div className="absolute top-[90%] left-[50%] w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
                  <div className="absolute top-[72%] left-[8%] w-1 h-1 bg-white rounded-full opacity-45"></div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                  <h1 className="text-4xl text-white mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Create Account
                  </h1>
                  <p className="text-gray-300">
                    Start your journey with Infinall
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm relative z-10">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {/* Name Field */}
                  <div>
                    <label className="block text-white mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00C2FF]" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-[#00C2FF]/30 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/20 focus:bg-black/60 transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-white mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00C2FF]" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-[#00C2FF]/30 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/20 focus:bg-black/60 transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-white mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00C2FF]" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Create a password"
                        required
                        minLength={6}
                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-[#00C2FF]/30 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/20 focus:bg-black/60 transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                      required
                      className="w-4 h-4 mt-1 rounded border-[#00C2FF]/30 bg-black/40 text-[#00C2FF] focus:ring-[#00C2FF]/50 focus:ring-offset-0"
                    />
                    <label className="text-gray-300 text-sm">
                      I agree to the{' '}
                      <button type="button" className="text-[#00C2FF] hover:text-[#72D4FF] transition-colors">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-[#00C2FF] hover:text-[#72D4FF] transition-colors">
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00C2FF] hover:bg-[#72D4FF] text-[#0A0F14] font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#00C2FF]/30 hover:shadow-[#00C2FF]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </motion.button>
                </form>

                {/* Login Link */}
                <div className="mt-8 text-center relative z-10">
                  <p className="text-gray-300">
                    Already have an account?{' '}
                    <button
                      onClick={onSwitchToLogin}
                      className="text-[#00C2FF] hover:text-[#72D4FF] transition-colors"
                    >
                      Log in
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}