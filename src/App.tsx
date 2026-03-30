import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import { CharacterPanel } from "./components/CharacterPanel";
import { StuckButton } from "./components/StuckButton";
import { XPFloat } from "./components/XPFloat";
import { QuestList } from "./components/QuestList";
import type { Quest } from "./types";

export default function App() {
  const [currentXp, setCurrentXp] = useState(850);
  const [showXpGain, setShowXpGain] = useState<number | null>(null);
  const [greeting, setGreeting] = useState("");
  const [characterDialogue, setCharacterDialogue] = useState(
    "i know starting this was hard, this counts."
  );
  const [activeTask, setActiveTask] = useState<Quest | null>(null);
  const [lastTaskId, setLastTaskId] = useState<string | null>(null);
  const [showFullLists, setShowFullLists] = useState(false);

  const [quests, setQuests] = useState<Quest[]>([
    { id: "1", title: "finish reading chapter 3", category: "reading", xp: 15, completed: false },
    { id: "2", title: "morning meditation session", category: "health", xp: 10, completed: false },
    { id: "3", title: "work on creative writing", category: "creative", xp: 20, completed: false },
  ]);

  const [sideQuests, setSideQuests] = useState<Quest[]>([
    { id: "s1", title: "drink water", category: "chill", xp: 5, completed: false },
    { id: "s2", title: "open document", category: "chill", xp: 5, completed: false },
  ]);

  const maxXp = 1000;
  const characterLevel = 49;

  // Dialogue system
  const dialogues = {
    stuck: ["let’s just try something small 🌱", "we’ll go gently, okay?", "just one tiny step, i’ve got you 💖"],
    complete: ["you did it. that counts 💖", "see? you started. that’s everything.", "i’m really proud of you 💙"],
    rest: ["rest is part of this too 💜", "you’re allowed to pause. that matters."],
    empty: ["you’ve done enough today. i’m proud of you 💖"],
  };

  const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    const greetings = ["hi angel 🌷", "ready for a soft day? ✨", "let's just do one thing 💖"];
    setGreeting(getRandom(greetings));
  }, []);

  // Complete a quest
  const handleCompleteQuest = (id: string, isSide = false) => {
    const list = isSide ? sideQuests : quests;
    const quest = list.find((q) => q.id === id);
    if (!quest || quest.completed) return;

    const update = (prev: Quest[]) =>
      prev.map((q) => (q.id === id ? { ...q, completed: true } : q));

    isSide ? setSideQuests(update) : setQuests(update);

    setCurrentXp((prev) => Math.min(prev + quest.xp, maxXp));
    setShowXpGain(quest.xp);
    setTimeout(() => setShowXpGain(null), 1200);

    setCharacterDialogue(getRandom(dialogues.complete));

    if (activeTask?.id === id) setActiveTask(null);
  };

  // Pick a “stuck” task
  const handleStuck = () => {
    const availableTasks = [...quests, ...sideQuests].filter(
      (q) => !q.completed && q.id !== lastTaskId
    );
    if (availableTasks.length === 0) {
      setCharacterDialogue(getRandom(dialogues.empty));
      return;
    }

    const chillTasks = availableTasks.filter((q) => q.category === "chill");
    const pool = chillTasks.length > 0 ? chillTasks : availableTasks;

    const randomTask = pool[Math.floor(Math.random() * pool.length)];
    setActiveTask(randomTask);
    setLastTaskId(randomTask.id);
    setCharacterDialogue(getRandom(dialogues.stuck));
  };

  // Rest instead of doing a task
  const handleRest = () => {
    setActiveTask(null);
    setCharacterDialogue(getRandom(dialogues.rest));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ebe5df] via-[#f5f1ed] to-[#f0e9e6]">
      
      {/* NAVBAR */}
      <Navbar />

      <div className="w-full max-w-[1400px] mx-auto px-8 pt-24 pb-12">

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-12">

          {/* LEFT: Character Panel */}
          <div className="sticky top-24 self-start w-full">
            <CharacterPanel
              name="belle"
              level={characterLevel}
              xp={currentXp}
              maxXp={maxXp}
              dayProgress={80}
              dialogue={characterDialogue}
            />
          </div>

          {/* RIGHT: Main Content */}
          <div className="w-full space-y-6">
            <h1 className="text-[#342e3a] text-2xl font-medium leading-relaxed">{greeting}</h1>

            <StuckButton onStuck={handleStuck} onRest={handleRest} />

            {activeTask && (
              <div className="bg-[#fefcfa]/90 backdrop-blur-xl border-2 border-[#e889c8]/40 rounded-3xl p-6 shadow-xl space-y-5">
                <div>
                  <p className="text-xl font-semibold text-[#342e3a] mb-2">{activeTask.title}</p>
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-[#fde8f3] text-[#c2185b] font-medium uppercase tracking-wide">
                    +{activeTask.xp} XP
                  </span>
                </div>

                <button
                  onClick={() => handleCompleteQuest(activeTask.id)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#e889c8] to-[#f293c7] text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  done
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleStuck}
                    className="py-3 bg-white border border-[#e889c8]/40 rounded-2xl text-sm hover:shadow-sm transition"
                  >
                    different one
                  </button>

                  <button
                    onClick={handleRest}
                    className="py-3 bg-white border border-[#f293c7]/40 rounded-2xl text-sm hover:shadow-sm transition"
                  >
                    rest instead
                  </button>
                </div>
              </div>
            )}

            {/* Toggle full quest lists */}
            <button
              onClick={() => setShowFullLists(!showFullLists)}
              className="px-5 py-2.5 bg-[#fefcfa]/60 backdrop-blur-sm rounded-full border border-[#7da3ed]/30 hover:border-[#7da3ed]/60 hover:shadow-md transition-all text-[#342e3a] text-sm font-medium"
            >
              {showFullLists ? "hide quests" : "browse quests"}
            </button>

            {/* Full Quest Lists */}
            {showFullLists && (
              <>
                <QuestList title="main quests" quests={quests} onComplete={handleCompleteQuest} />
                <QuestList title="side quests" quests={sideQuests} onComplete={(id) => handleCompleteQuest(id, true)} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* XP Float */}
      <XPFloat xp={showXpGain} />
    </div>
  );
}