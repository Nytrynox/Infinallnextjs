import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerifySuccess: () => void;
}

export function OTPModal({ isOpen, onClose, email, onVerifySuccess }: OTPModalProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for resend button
  useEffect(() => {
    if (resendTimer > 0 && isOpen) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer, isOpen]);

  // Reset timer when modal opens
  useEffect(() => {
    if (isOpen) {
      setResendTimer(60);
      setOtp(['', '', '', '', '', '']);
      setError('');
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      // In real implementation, verify OTP with backend
      // For now, accept any 6-digit code
      onVerifySuccess();
    }, 1500);
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setResendTimer(60);
      setOtp(['', '', '', '', '', '']);
      setError('');
      inputRefs.current[0]?.focus();
      // In real implementation, trigger resend OTP API call
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
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md relative"
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
                  {/* Email Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00C2FF]/10 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-[#00C2FF]" />
                  </div>

                  <h1 className="text-3xl text-white mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Verify Your Email
                  </h1>
                  <p className="text-gray-300">
                    We've sent a 6-digit code to
                  </p>
                  <p className="text-[#00C2FF] mt-1">
                    {email}
                  </p>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleSubmit} className="relative z-10">
                  {/* OTP Input Boxes */}
                  <div className="flex gap-3 justify-center mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-14 text-center text-2xl bg-black/40 border-2 border-[#00C2FF]/30 rounded-xl text-white focus:outline-none focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/20 focus:bg-black/60 transition-all backdrop-blur-sm"
                      />
                    ))}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm text-center mb-4"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Resend Code */}
                  <div className="text-center mb-6">
                    <p className="text-gray-300 text-sm mb-2">
                      Didn't receive the code?
                    </p>
                    {resendTimer > 0 ? (
                      <p className="text-gray-400 text-sm">
                        Resend code in {resendTimer}s
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-[#00C2FF] hover:text-[#72D4FF] transition-colors text-sm flex items-center gap-1 mx-auto"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Resend Code
                      </button>
                    )}
                  </div>

                  {/* Verify Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isVerifying || otp.join('').length !== 6}
                    className="w-full bg-[#00C2FF] hover:bg-[#72D4FF] text-[#0A0F14] font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#00C2FF]/30 hover:shadow-[#00C2FF]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Continue
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Help Text */}
                <div className="mt-6 text-center relative z-10">
                  <p className="text-gray-400 text-xs">
                    Check your spam folder if you don't see the email
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