import { ChevronRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nodes } from "../../pages/dashboard/dashboard-data";

export function FloatingSidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  const navigate = useNavigate();

  const sectors = nodes.filter((n) => n.kind === "sector");

  return (
    <motion.div
      initial={{ width: 80, x: -100 }}
      animate={{
        width: isHovered ? 320 : 80,
        x: 0,
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setExpandedSector(null);
      }}
      className="fixed left-4 top-32 bottom-8 z-45 hidden md:flex flex-col rounded-3xl bg-white/40 dark:bg-[#14151a]/40 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
      style={{
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-white/20 dark:from-white/5 to-transparent pointer-events-none" />

      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-6">
        <div className="flex flex-col gap-2 px-2">
          {/* SPECIAL MENU: strategic IKU dashboard */}
          <div className="flex flex-col border-b border-slate-200/40 dark:border-white/5 pb-3 mb-2">
            <button
              onClick={() => navigate("/dashboard?view=iku")}
              className={`group relative flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${
                !isHovered ? "justify-center" : ""
              }`}
            >
              {/* Hover Background - Golden/Amber Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-amber-500" />

              {/* Icon Container */}
              <div className="relative shrink-0 flex items-center justify-center size-10 rounded-xl transition-transform duration-300 group-hover:scale-110">
                {/* Glowing effect behind icon */}
                <div className="absolute inset-0 rounded-xl opacity-25 blur-md transition-opacity duration-300 group-hover:opacity-75 bg-amber-500" />
                {/* Icon border */}
                <div className="absolute inset-0 rounded-xl border border-amber-500/40" />
                {/* Icon */}
                <div className="relative z-10 text-amber-500 drop-shadow-[0_2px_4px_rgba(245,158,11,0.4)]">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
              </div>

              {/* Expanded Title */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex flex-col items-start min-w-0 flex-1"
                  >
                    <span className="text-sm font-black text-slate-900 dark:text-white truncate w-full text-left flex items-center gap-1.5">
                      IKU Dashboard
                      <span className="px-1.5 py-0.5 rounded-md text-[8px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        HOT
                      </span>
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 truncate w-full text-left">
                      Strategic Performance
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arrow right */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="shrink-0 text-amber-500"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
          {sectors.map((sector) => {
            const isExpanded = expandedSector === sector.id;

            return (
              <div key={sector.id} className="flex flex-col">
                <button
                  onClick={() =>
                    setExpandedSector(isExpanded ? null : sector.id)
                  }
                  className={`group relative flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${
                    !isHovered ? "justify-center" : ""
                  }`}
                >
                  {/* Hover Background */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: sector.color }}
                  />

                  {/* Icon Container */}
                  <div className="relative shrink-0 flex items-center justify-center size-10 rounded-xl transition-transform duration-300 group-hover:scale-110">
                    {/* Glowing effect behind icon */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-60"
                      style={{ backgroundColor: sector.color }}
                    />
                    {/* Icon border */}
                    <div
                      className="absolute inset-0 rounded-xl border border-white/20 dark:border-white/10"
                      style={{ borderColor: `${sector.color}40` }}
                    />
                    <div
                      className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                      style={{ color: sector.color }}
                    >
                      {sector.icon}
                    </div>
                  </div>

                  {/* Expanded Title */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="flex flex-col items-start min-w-0 flex-1"
                      >
                        <span className="text-sm font-bold text-slate-900 dark:text-white truncate w-full text-left">
                          {sector.title}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 truncate w-full text-left">
                          {sector.subtitle}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Accordion Chevron */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="shrink-0 text-slate-400"
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight size={16} />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Submenu Items */}
                <AnimatePresence>
                  {isHovered && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-14 pr-3 py-2 flex flex-col gap-1 relative">
                        {/* Connecting Line */}
                        <div
                          className="absolute left-8 top-0 bottom-4 w-px opacity-30"
                          style={{ backgroundColor: sector.color }}
                        />

                        {sector.menuItems?.map((item, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (item.path !== "#") {
                                navigate(item.path);
                              }
                            }}
                            className={`group/item relative flex items-center w-full px-3 py-2 rounded-xl text-left transition-all ${
                              item.path === "#"
                                ? "opacity-30 cursor-not-allowed"
                                : "hover:bg-black/5 dark:hover:bg-white/5"
                            }`}
                          >
                            {/* Horizontal connecting tick */}
                            <div
                              className="absolute left-[-24px] top-1/2 w-3 h-px opacity-30 transition-all duration-300 group-hover/item:w-5 group-hover/item:opacity-100 group-hover/item:bg-current"
                              style={{ backgroundColor: sector.color }}
                            />
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors truncate">
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
