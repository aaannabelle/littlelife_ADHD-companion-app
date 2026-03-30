import { Sparkles, Moon } from "lucide-react";

interface StuckButtonProps {
  onStuck: () => void;
  onRest: () => void;
}

export const StuckButton: React.FC<StuckButtonProps> = ({ onStuck, onRest }) => (
  <div className="flex flex-col items-center gap-4 mt-6">
    
    {/* 🌱 Primary action */}
    <button
      onClick={onStuck}
      className="px-10 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-[1.5rem] shadow-lg flex items-center gap-3 text-lg font-medium hover:scale-[1.02] active:scale-[0.98] transition"
    >
      <Sparkles className="w-5 h-5" />
      i feel stuck
    </button>

    {/* 🌙 Secondary action */}
    <button
      onClick={onRest}
      className="flex items-center gap-2 px-5 py-2 bg-white/60 rounded-full border border-pink-300 hover:border-pink-500 text-sm transition"
    >
      <Moon className="w-4 h-4 text-pink-400" />
      i'm drained today
    </button>

  </div>
);