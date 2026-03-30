import { motion } from "framer-motion";

interface CharacterPanelProps {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  dayProgress: number;
  dialogue: string;
}

export function CharacterPanel({ name, level, xp, maxXp, dayProgress, dialogue }: CharacterPanelProps) {
  const xpPercentage = Math.min((xp / maxXp) * 100, 100);

  return (
    <div className="bg-[#fefcfa]/85 backdrop-blur-xl border border-[#7da3ed]/35 rounded-3xl p-6 shadow-lg transition-all hover:shadow-xl hover:shadow-[#7da3ed]/15 group">
      
      {/* Character Portrait + Dialogue Overlay */}
      <div className="relative mb-5 rounded-2xl overflow-hidden group-hover:shadow-2xl group-hover:shadow-[#7da3ed]/25 transition-all duration-300">
        <img
          src="https://images.unsplash.com/photo-1635696893391-ecf1fe614cf4"
          className="w-full aspect-[3/4] object-cover"
          alt="Character avatar"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#7da3ed]/15 via-transparent to-[#f293c7]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <motion.div
          key={dialogue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-4 right-4"
        >
          <div className="bg-[#fefcfa]/95 backdrop-blur-md border-2 border-[#342e3a]/80 rounded-lg px-4 py-3 shadow-xl">
            <p className="text-[#342e3a] text-[15px] leading-relaxed font-semibold text-center">
              {dialogue}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Stats Panel */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-[#342e3a] font-semibold text-lg">{name}</h2>
          <span className="text-sm text-[#7da3ed] font-medium">Lvl {level}</span>
        </div>

        {/* XP Bar */}
        <div className="w-full bg-[#deeafc]/40 rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            className="h-4 bg-gradient-to-r from-[#e889c8] to-[#f293c7] rounded-full"
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Day Progress */}
        <div className="flex justify-between items-center text-xs text-[#5f6c7b]">
          <span>ENERGY.EXE</span>
          <span>{dayProgress}%</span>
        </div>
        <div className="w-full bg-[#fde8f3]/40 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${dayProgress}%` }}
            className="h-2 bg-gradient-to-r from-[#f293c7] to-[#e889c8] rounded-full"
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
}