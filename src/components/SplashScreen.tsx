import { motion } from 'motion/react';
import { useEffect } from 'react';
import infinallLogo from 'figma:asset/40920a779287009a943ac68f085b12b54d225f97.png';

interface SplashScreenProps {
  username: string;
  onComplete: () => void;
}

export function SplashScreen({ username, onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0A0F14] z-[200] flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <motion.img
        src={infinallLogo}
        alt="Infinall"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32 mb-8"
      />

      {/* Welcome Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl text-white mb-4">
          Welcome
        </h1>
        <p className="text-2xl text-[#00C2FF]">
          {username}
        </p>
      </motion.div>

      {/* Animated Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 bg-[#00C2FF] rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}