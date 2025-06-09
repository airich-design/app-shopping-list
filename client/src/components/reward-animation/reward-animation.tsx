import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface RewardAnimationProps {
  onTrigger: (callback: () => void) => void;
}

export function RewardAnimation({ onTrigger }: RewardAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const numParticles = 24;
  const particles = Array.from({ length: numParticles });

  useEffect(() => {
    const handleTrigger = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    };

    onTrigger(handleTrigger);
  }, [onTrigger]);

  useEffect(() => {
    if (isVisible && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Silently fail if autoplay is blocked
      });
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <audio ref={audioRef} src="/reward_sound.mp3" preload="auto" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white/10 backdrop-blur-xl pointer-events-none z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.5,
            }}
            className="flex items-center justify-center h-full w-full flex-col fixed text-center z-50 pointer-events-none top-0"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-full text-[clamp(1.5rem,8vw,2.5rem)] font-semibold mb-[clamp(0.5rem,2vw,1rem)] text-[#DAA520] font-sans leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
            >
              All Done!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-[clamp(0.875rem,4vw,1.25rem)] text-[#1a1a1a]/80 font-sans leading-relaxed max-w-full overflow-hidden text-ellipsis whitespace-nowrap dark:text-white"
            >
              Your shopping list is complete
            </motion.p>
          </motion.div>

          <motion.div
            className="fixed top-1/2 left-1/2 [perspective:1000px] pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {particles.map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${
                    ["#FFD700", "#DAA520", "#FFF8DC", "#B8860B"][i % 4]
                  } 0%, ${
                    ["#DAA520", "#B8860B", "#FFD700", "#FFF8DC"][i % 4]
                  } 100%)`,
                  boxShadow: "0 0 20px rgba(218, 165, 32, 0.4)",
                  filter: "blur(0.5px)",
                }}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  z: 0,
                  rotateX: 0,
                  rotateY: 0,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: [
                    0,
                    Math.cos((i * 2 * Math.PI) / numParticles) * 150,
                    Math.cos((i * 2 * Math.PI) / numParticles) * 200,
                  ],
                  y: [
                    0,
                    Math.sin((i * 2 * Math.PI) / numParticles) * 150,
                    Math.sin((i * 2 * Math.PI) / numParticles) * 200,
                  ],
                  z: [0, 100, -100],
                  rotateX: [0, 180, 360],
                  rotateY: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  times: [0, 0.5, 1],
                  repeat: 0,
                  exit: { duration: 0.3 },
                }}
              />
            ))}

            <motion.div
              style={{
                position: "absolute",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(218, 165, 32, 0.4) 50%, transparent 70%)",
                boxShadow: "0 0 40px rgba(218, 165, 32, 0.6)",
                transform: "translate(-50%, -50%)",
                filter: "blur(1px)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 5, 8],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                times: [0, 0.4, 1],
                repeat: 0,
                exit: { duration: 0.3 },
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
