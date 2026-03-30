import { Home, Heart, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

export default function NavBar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-6rem)] max-w-[1200px]">
      <div className="flex items-center justify-between px-6 py-2.5 bg-[#fefcfa]/90 backdrop-blur-xl rounded-full shadow-lg border border-[#7da3ed]/35">
        {/* Left: App Name */}
        <span className="text-[#342e3a] font-medium select-none">littleLife.exe</span>

        {/* Right: Nav Buttons */}
        <div className="flex items-center gap-3">
          {["#7da3ed", "#f293c7", "#7da3ed", "#f293c7"].map((color, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center w-8 h-8 rounded-full border border-[#7da3ed]/30 hover:bg-[${color}]/20 transition-colors cursor-pointer`}
            >
              {idx === 0 && <Home className="w-4 h-4 text-[#6b6270]" />}
              {idx === 1 && <Heart className="w-4 h-4 text-[#6b6270]" />}
              {idx === 2 && <Calendar className="w-4 h-4 text-[#6b6270]" />}
              {idx === 3 && <User className="w-4 h-4 text-[#6b6270]" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}