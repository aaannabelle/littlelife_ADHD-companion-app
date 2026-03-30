import { AnimatePresence, motion } from "framer-motion";
import { QuestCard } from "./QuestCard";
import type { Quest } from "../types";

interface QuestListProps {
  title: string;
  quests: Quest[];
  onComplete: (id: string) => void;
}

export function QuestList({ title, quests, onComplete }: QuestListProps) {
  return (
    <div className="bg-[#fefcfa]/85 backdrop-blur-xl border border-[#7da3ed]/35 rounded-3xl overflow-hidden shadow-lg">
      
      <div className="px-6 py-3 bg-gradient-to-r from-[#deeafc] to-[#f0eef5] border-b border-[#7da3ed]/30">
        <p className="text-xs font-mono text-[#5f6c7b] uppercase tracking-wider">{title}</p>
      </div>

      <div className="p-6 space-y-3">
        <AnimatePresence>
          {quests.map((q) => (
            <QuestCard key={q.id} quest={q} onComplete={onComplete} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}