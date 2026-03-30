import { motion, AnimatePresence } from "framer-motion";

interface XPFloatProps {
  xp?: number | null;
}

export const XPFloat: React.FC<XPFloatProps> = ({ xp }) => {
  return (
    <AnimatePresence>
      {xp && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: -20, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full shadow-lg font-bold text-sm"
        >
          +{xp} XP ✨
        </motion.div>
      )}
    </AnimatePresence>
  );
};