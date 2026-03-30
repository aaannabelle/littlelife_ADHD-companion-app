import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Quest } from "../types";

interface QuestCardProps {
  quest: Quest;
  onComplete: (id: string) => void;
}

export function QuestCard({ quest, onComplete }: QuestCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex justify-between items-center p-4 rounded-2xl shadow-md ${
        quest.completed
          ? "bg-[#deeafc]/50 text-[#7da3ed] line-through"
          : "bg-[#fefcfa]/90 text-[#342e3a]"
      }`}
    >
      <div className="flex flex-col">
        <span className="font-semibold text-sm">{quest.title}</span>
        <span className="text-xs mt-1 px-2 py-0.5 rounded-full bg-[#fde8f3] text-[#c2185b] font-medium uppercase tracking-wide w-max">
          +{quest.xp} XP
        </span>
      </div>

      {!quest.completed && (
        <button
          onClick={() => onComplete(quest.id)}
          className="p-2 bg-gradient-to-r from-[#e889c8] to-[#f293c7] rounded-full text-white shadow hover:scale-105 transition-transform"
        >
          <Check className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}