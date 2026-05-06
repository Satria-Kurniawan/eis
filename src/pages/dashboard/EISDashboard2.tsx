import logoUndiksha from "@/assets/logo-undiksha.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useHubPortal } from "@/contexts/HubPortalContext";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Layout,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EISMobileDashboard from "./EISMobileDashboard";

const StatsView = lazy(() => import("./StatsView"));
const IKUView = lazy(() => import("./IKUView"));

import { nodes, paths, SCENE_H, SCENE_W } from "./dashboard-data";
import { useLowSpec } from "@/contexts/LowSpecContext";

const ikuSignalPaths = [
  { from: "akademik", x: 300, y: 250, color: "#0ea5e9" },
  { from: "kemahasiswaan", x: 200, y: 550, color: "#f472b6" },
  { from: "alumni", x: 450, y: 750, color: "#a3e635" },
  { from: "umum", x: 750, y: 750, color: "#fb7185" },
  { from: "kinerja", x: 1000, y: 550, color: "#c084fc" },
  { from: "keuangan", x: 900, y: 250, color: "#2dd4bf" },
  { from: "hub", x: 600, y: 450, color: "#ff8c42" },
];

/** Isometric cube (SVG) */
function IsoCube({
  w = 40,
  h = 20,
  z = 20,
  color,
  leftColor,
  rightColor,
  className = "",
}: {
  w?: number;
  h?: number;
  z?: number;
  color: string;
  leftColor: string;
  rightColor: string;
  className?: string;
}) {
  return (
    <svg
      width={w}
      height={h + z}
      viewBox={`0 0 ${w} ${h + z}`}
      className={`overflow-visible drop-shadow-2xl ${className}`}
      aria-hidden
    >
      <polygon
        points={`0,${h / 2} ${w / 2},0 ${w},${h / 2} ${w / 2},${h}`}
        fill={color}
      />
      <polygon
        points={`0,${h / 2} ${w / 2},${h} ${w / 2},${h + z} 0,${h / 2 + z}`}
        fill={leftColor}
      />
      <polygon
        points={`${w / 2},${h} ${w},${h / 2} ${w},${h / 2 + z} ${w / 2},${h + z}`}
        fill={rightColor}
      />
    </svg>
  );
}

function CircularIcon({
  icon,
  strokeColor,
}: {
  icon: React.ReactNode;
  strokeColor: string;
}) {
  return (
    <div className="relative h-12 w-12 shrink-0 flex items-center justify-center group/ring">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          className="stroke-slate-200 dark:stroke-[#2e303a] transition-colors duration-500"
          strokeWidth="2.5"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{
            strokeDasharray: ["1, 150", "150, 150"],
            strokeDashoffset: [0, -126],
          }}
          transition={{
            duration: 2.5,
            repeat: 0,
            ease: "easeOut",
          }}
          className="drop-shadow-[0_0_8px_var(--stroke-color)]"
          style={{ "--stroke-color": strokeColor } as any}
        />
      </svg>
      <div
        className="relative z-10 p-2 rounded-full transition-transform duration-500 group-hover/ring:scale-110 flex flex-col items-center justify-center gap-0"
        style={{ color: strokeColor }}
      >
        <div className="scale-90">{icon}</div>
        <span className="text-[7px] font-black uppercase tracking-tighter -mt-1 opacity-80">
          CDC
        </span>
      </div>
    </div>
  );
}

function FloatingCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`pointer-events-auto z-30 flex min-w-[240px] max-w-[min(92vw,280px)] items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-[#2e303a] bg-white/90 dark:bg-[#14151a]/85 p-3.5 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors duration-500 ${className ?? ""}`}
    >
      <div className="min-w-0">
        <h3 className="text-sm font-semibold tracking-tight text-slate-800 dark:text-[#f3f4f6] transition-colors duration-500">
          {title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-[#9ca3af] transition-colors duration-500">
          {subtitle}
        </p>
      </div>
      {children}
    </motion.div>
  );
}

// All nodes and paths data moved to dashboard-data.tsx

function TabSkeletonLoader() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 py-10 px-4 animate-pulse">
      <div className="h-8 bg-slate-200 dark:bg-slate-800/40 rounded-xl w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-slate-200 dark:bg-slate-800/30 rounded-[2rem]"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 h-[350px] bg-slate-200 dark:bg-slate-800/20 rounded-[2.5rem]" />
        <div className="lg:col-span-7 h-[350px] bg-slate-200 dark:bg-slate-800/20 rounded-[2.5rem]" />
      </div>
    </div>
  );
}

export default function EISDashboard2() {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<(typeof nodes)[0] | null>(
    null,
  );
  const { isOpen: isHubOpen, setIsOpen: setIsHubOpen } = useHubPortal();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeView =
    (searchParams.get("view") as "dashboard" | "stats" | "iku") || "dashboard";
  const { isLowSpec } = useLowSpec();

  const setActiveView = (view: "dashboard" | "stats" | "iku") => {
    setSearchParams((prev) => {
      prev.set("view", view);
      return prev;
    });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  if (isMobile) return <EISMobileDashboard />;

  // const sectors = nodes.filter((n) => n.kind === "sector");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-500 font-sans text-slate-800 dark:text-[#e5e7eb]">
      {/* 3D Perspective Grid Background */}
      <div className="absolute inset-0 perspective-[1000px] pointer-events-none overflow-hidden">
        <motion.div
          initial={{ rotateX: 60, rotateZ: 30, opacity: 0 }}
          animate={{
            rotateX: 60,
            rotateZ: 30,
            opacity: isHubOpen ? 0 : isDark ? 0.4 : 0.4,
            backgroundPosition:
              isLowSpec || isHubOpen ? "0px 0px" : ["0px 0px", "60px 60px"],
          }}
          transition={{
            opacity: { duration: 0.5 },
            backgroundPosition: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className={`absolute -inset-full origin-center transition-all duration-700 ${isHubOpen ? "invisible" : "visible"}`}
          style={{
            backgroundImage: `
              linear-gradient(to right, ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"} 1.5px, transparent 1.5px),
              linear-gradient(to bottom, ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"} 1.5px, transparent 1.5px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }}
        />
      </div>

      {/* Floating View Switcher - Positioned on the header's bottom border */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="p-1.5 rounded-full bg-white/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl flex items-center gap-1 transition-all duration-500">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "stats", label: "Statistik", icon: BarChart3 },
            { id: "iku", label: "IKU", icon: Sparkles },
          ].map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`relative px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  isActive
                    ? "text-white dark:text-slate-950 font-black"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary dark:bg-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon
                  size={16}
                  className={`relative z-10 ${isActive ? "text-white dark:text-slate-900" : ""}`}
                />
                <span className="relative z-10 text-xs font-black uppercase tracking-widest">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`relative z-10 flex w-full flex-col items-center justify-center p-8 ${activeView === "dashboard" ? "-mt-20" : "pt-10"}`}
      >
        <AnimatePresence mode="wait">
          {activeView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className={`relative aspect-1200/800 w-full max-w-[1200px] overflow-visible transition-all duration-700 ${isHubOpen ? "opacity-0 scale-95 blur-xl pointer-events-none" : "opacity-100 scale-100 blur-0"}`}
              style={{
                minHeight: "min(70vh, 800px)",
                willChange: "transform, opacity",
              }}
            >
              <div
                className="absolute inset-0 scale-[0.58] sm:scale-[0.72] md:scale-[0.88] lg:scale-100"
                style={{ transformOrigin: "center center" }}
              >
                <div className="relative h-[800px] w-[1200px]">
                  {/* Corner cards mapping dynamically moved to Nodes */}

                  <svg
                    viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
                    className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden
                  >
                    <defs>
                      <filter
                        id="line-glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="1.2" result="b" />
                        <feMerge>
                          <feMergeNode in="b" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <linearGradient
                        id="iot-grad-sky"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#ff8c42" />
                      </linearGradient>
                      <linearGradient
                        id="iot-grad-pink"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#ff8c42" />
                      </linearGradient>
                      <linearGradient
                        id="iot-grad-lime"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#a3e635" />
                        <stop offset="100%" stopColor="#ff8c42" />
                      </linearGradient>
                      <linearGradient
                        id="iot-grad-rose"
                        x1="100%"
                        y1="100%"
                        x2="0%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#fb7185" />
                        <stop offset="100%" stopColor="#ff8c42" />
                      </linearGradient>
                      <linearGradient
                        id="iot-grad-purple"
                        x1="100%"
                        y1="100%"
                        x2="0%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#ff8c42" />
                      </linearGradient>
                      <linearGradient
                        id="iot-grad-teal"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#ff8c42" />
                      </linearGradient>
                      <linearGradient
                        id="iot-grad-amber"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ff8c42" />
                      </linearGradient>
                    </defs>

                    {/* Ground ring under hub */}
                    <ellipse
                      cx={600}
                      cy={465}
                      rx={98}
                      ry={40}
                      fill="none"
                      stroke="#ff8c42"
                      strokeWidth="2"
                      opacity={0.55}
                      filter={isLowSpec ? undefined : "url(#line-glow)"}
                    />

                    {paths.map((p, i) => (
                      <motion.path
                        key={p.d}
                        d={p.d}
                        fill="none"
                        stroke={p.stroke}
                        strokeWidth={3}
                        filter={isLowSpec ? undefined : "url(#line-glow)"}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.88 }}
                        transition={{
                          duration: 1.8,
                          delay: i * 0.12,
                          ease: "easeOut",
                        }}
                      />
                    ))}

                    {!isLowSpec &&
                      paths.map((p, i) => (
                        <motion.circle
                          key={`pkt-${i}`}
                          r={3}
                          fill={isDark ? "#f8fafc" : "#334155"}
                          className={isDark ? "" : "drop-shadow-none"}
                          opacity={isDark ? 0.85 : 0.6}
                          animate={{
                            offsetDistance: ["0%", "100%"],
                            opacity: [0, isDark ? 1 : 0.8, 0],
                          }}
                          transition={{
                            duration: 3.2 + (i % 3) * 0.4,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.35,
                          }}
                          style={{ offsetPath: `path('${p.d}')` }}
                        />
                      ))}
                    {/* IKU Signal Paths and flowing particles */}
                    {ikuSignalPaths.map((p, idx) => {
                      const pathD = `M ${p.x} ${p.y} Q ${(p.x + 600) / 2} ${(p.y + 130) / 2 - 40} 600 130`;
                      return (
                        <React.Fragment key={`iku-sig-${idx}`}>
                          {/* Curved Signal Line */}
                          <path
                            d={pathD}
                            fill="none"
                            stroke={p.color}
                            strokeWidth={1.5}
                            strokeDasharray="4 6"
                            className="opacity-25"
                          />
                          {/* Flowing particle circle along the path */}
                          {!isLowSpec && (
                            <motion.circle
                              r={3}
                              fill="#fbbf24"
                              className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                              animate={{
                                offsetDistance: ["0%", "100%"],
                                opacity: [0, 1, 1, 0],
                              }}
                              transition={{
                                duration: 2.5 + (idx % 3) * 0.5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: idx * 0.25,
                              }}
                              style={{ offsetPath: `path('${pathD}')` }}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </svg>

                  {nodes.map((node) => {
                    const leftPct = (node.x / SCENE_W) * 100;
                    const topPct = (node.y / SCENE_H) * 100;

                    if (node.kind === "hub") {
                      return (
                        <div
                          key={node.id}
                          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer hover:scale-105 transition-all duration-500 will-change-transform"
                          style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                          onClick={() => setIsHubOpen(true)}
                        >
                          <div
                            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[14px] group-hover:opacity-70 group-hover:blur-[20px] transition-all duration-500"
                            style={{
                              width: 120,
                              height: 56,
                              backgroundColor: node.color,
                              transform: "translate(-50%, -40%) rotateX(58deg)",
                            }}
                          />
                          <div className="relative drop-shadow-[0_18px_24px_rgba(255,140,66,0.35)]">
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 mb-4 group-hover:-translate-y-2 transition-transform duration-500">
                              <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center relative shadow-[0_0_20px_rgba(255,140,66,0.6)] ${isDark ? "bg-[#ff8c42]" : "bg-[#e66c1f]"}`}
                              >
                                <Activity
                                  size={28}
                                  className={
                                    isDark ? "text-[#0a0a0c]" : "text-white"
                                  }
                                />
                                {!isLowSpec && (
                                  <div
                                    className={`absolute inset-0 rounded-full border-2 animate-ping opacity-60 ${isDark ? "border-[#ff8c42]" : "border-[#e66c1f]"}`}
                                  ></div>
                                )}
                              </div>
                            </div>
                            <IsoCube
                              w={84}
                              h={42}
                              z={62}
                              color={node.color}
                              leftColor={node.left}
                              rightColor={node.right}
                            />
                             {/* Holographic Undiksha Emblem on left side surface of Core Hub */}
                             <div
                               className="absolute pointer-events-none z-10 flex items-center justify-center select-none"
                               style={{
                                 width: 28,
                                 height: 28,
                                 left: 21,
                                 top: 62,
                                 transform: "translate(-50%, -50%) skewY(30deg) scaleX(0.866)",
                               }}
                             >
                               <img
                                 src={logoUndiksha}
                                 alt="Undiksha Logo"
                                 className="w-full h-full object-contain opacity-85 dark:opacity-95 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-pulse"
                                 style={{ animationDuration: "3s" }}
                               />
                             </div>
                            <div className="absolute bottom-0 right-[-8px]">
                              <IsoCube
                                w={42}
                                h={22}
                                z={34}
                                color={node.color}
                                leftColor={node.left}
                                rightColor={node.right}
                              />
                            </div>
                          </div>
                          <div className="absolute left-1/2 top-full z-10 mt-5 w-max -translate-x-1/2 rounded-full border border-slate-300 dark:border-[#2e303a] bg-white/90 dark:bg-[#1c1d22]/90 px-4 py-1.5 text-sm font-black uppercase tracking-widest text-slate-800 dark:text-[#f3f4f6] shadow-lg backdrop-blur-md transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                            {node.label}
                          </div>
                        </div>
                      );
                    }

                    if (node.kind === "sector") {
                      // Position all cards consistently above the node to prevent screen overflow
                      const cardPosClass =
                        "absolute bottom-[110%] left-1/2 -translate-x-1/2 mb-4";

                      return (
                        <div
                          key={node.id}
                          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer hover:scale-105 transition-transform duration-300 will-change-transform"
                          style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                          onClick={() => setSelectedNode(node as any)}
                        >
                          <div className="relative drop-shadow-xl">
                            {/* Glow Behind */}
                            <div
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[10px]"
                              style={{
                                width: 60,
                                height: 30,
                                backgroundColor: node.color,
                                transform:
                                  "translate(-50%, -40%) rotateX(60deg)",
                              }}
                            />
                            <IsoCube
                              w={48}
                              h={24}
                              z={28}
                              color={node.color}
                              leftColor={node.left}
                              rightColor={node.right}
                            />

                            {/* Attached Floating Card */}
                            <div
                              className={`pointer-events-none z-30 transition-all duration-300 ${cardPosClass}`}
                            >
                              <FloatingCard
                                title={node.title}
                                subtitle={node.subtitle}
                                className="w-max min-w-[200px]"
                              >
                                <CircularIcon
                                  strokeColor={node.color}
                                  icon={node.icon}
                                />
                              </FloatingCard>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}

                  {/* SPECIAL DEDICATED IKU NODE (Position: 600, 130 -> 50%, 16.25%) */}
                  <div
                    className="absolute z-25 -translate-x-1/2 -translate-y-1/2 group cursor-pointer hover:scale-110 transition-all duration-500 will-change-transform"
                    style={{ left: "50%", top: "16.25%" }}
                    onClick={() => setActiveView("iku")}
                  >
                    <div className="relative">
                      {/* Ambient Aura Glow under the node */}
                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[18px] group-hover:opacity-90 group-hover:blur-xl transition-all duration-500 bg-amber-500"
                        style={{
                          width: 90,
                          height: 45,
                          transform: "translate(-50%, -10%) rotateX(60deg)",
                        }}
                      />

                      {/* Custom SVG Isometric Crystal Prism Shape */}
                      <div className="relative drop-shadow-[0_15px_30px_rgba(245,158,11,0.4)]">
                        <svg
                          width={80}
                          height={92}
                          viewBox="0 0 80 92"
                          className="overflow-visible"
                        >
                          {/* Base platform ring */}
                          <polygon
                            points="40,50 80,63 40,76 0,63"
                            fill="rgba(245, 158, 11, 0.08)"
                            stroke="#f59e0b"
                            strokeWidth="1"
                            strokeDasharray="3 3"
                            className={isLowSpec ? "" : "animate-spin"}
                            style={{
                              transformOrigin: "40px 63px",
                              animationDuration: "12s",
                            }}
                          />
                          <polygon
                            points="40,48 80,61 40,74 0,61"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="1.5"
                            className="opacity-40"
                          />

                          {/* Float animation grouping */}
                          <g
                            className={isLowSpec ? "" : "animate-bounce"}
                            style={{ animationDuration: "3.5s" }}
                          >
                            {/* Outer glowing halo */}
                            <ellipse
                              cx={40}
                              cy={30}
                              rx={28}
                              ry={12}
                              fill="none"
                              stroke="#fbbf24"
                              strokeWidth="0.75"
                              className={`opacity-30 ${isLowSpec ? "" : "animate-pulse"}`}
                            />

                            {/* Main Top pyramid facets */}
                            {/* Top Facet */}
                            <polygon
                              points="40,5 58,18 40,31 22,18"
                              fill="#fbbf24"
                              className="fill-amber-300 dark:fill-amber-400"
                            />
                            {/* Left Facet */}
                            <polygon
                              points="22,18 40,31 40,53 22,40"
                              fill="#f59e0b"
                              className="fill-amber-500"
                            />
                            {/* Right Facet */}
                            <polygon
                              points="40,31 58,18 58,40 40,53"
                              fill="#d97706"
                              className="fill-amber-600"
                            />

                            {/* Little floating core node inside (double diamond style) */}
                            <polygon
                              points="40,55 48,60 40,65 32,60"
                              fill="#f59e0b"
                              className="opacity-80"
                            />
                            <polygon
                              points="32,60 40,65 40,73 32,68"
                              fill="#d97706"
                              className="opacity-90"
                            />
                            <polygon
                              points="40,65 48,60 48,68 40,73"
                              fill="#b45309"
                              className="opacity-95"
                            />
                          </g>

                          {/* Sparkles on top */}
                          <g
                            transform="translate(28, -12)"
                            className={isLowSpec ? "" : "animate-pulse"}
                          >
                            <Sparkles
                              size={24}
                              className="text-amber-400 drop-shadow-[0_0_8px_#f59e0b]"
                            />
                          </g>
                        </svg>
                      </div>

                      {/* Premium Label */}
                      <div className="absolute left-1/2 top-full z-10 mt-5 w-max -translate-x-1/2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-md transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                        IKU Dashboard
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="w-full"
            >
              <Suspense fallback={<TabSkeletonLoader />}>
                <StatsView />
              </Suspense>
            </motion.div>
          )}

          {activeView === "iku" && (
            <motion.div
              key="iku"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="w-full"
            >
              <Suspense fallback={<TabSkeletonLoader />}>
                <IKUView />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Identical Side Panel logic ported over for feature-parity */}
      <Sheet
        open={!!selectedNode}
        onOpenChange={(open) => !open && setSelectedNode(null)}
      >
        <SheetContent className="w-[400px] sm:w-[540px] p-0 bg-white dark:bg-[#14151a] border-l-slate-200 dark:border-l-[#2e303a] text-slate-800 dark:text-[#f3f4f6] transition-colors duration-500 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="p-8">
              <SheetHeader className="mb-8 pl-1">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl"
                    style={{ backgroundColor: selectedNode?.color }}
                  >
                    {selectedNode?.icon}
                  </div>
                  <div className="text-left">
                    <SheetTitle className="text-3xl text-slate-900 dark:text-[#f3f4f6] font-black tracking-tight transition-colors duration-500">
                      {selectedNode?.title}
                    </SheetTitle>
                    <SheetDescription className="text-slate-500 dark:text-[#9ca3af] font-medium transition-colors duration-500">
                      {selectedNode?.subtitle}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              {selectedNode && (
                <div className="space-y-8">
                  {/* CDC Activity Monitor Card (Sync from Mobile version) */}
                  <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-inner">
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                          CDC Activity Monitor
                        </span>
                        <div className="flex items-center gap-2.5 mt-1.5">
                          {isLowSpec ? (
                            <div className="size-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          ) : (
                            <motion.div
                              animate={{
                                opacity: [1, 0.4, 1],
                                scale: [1, 1.2, 1],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="size-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            />
                          )}
                          <span className="text-xs font-black text-emerald-500 uppercase tracking-wider">
                            Real-time Streaming
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          Latency
                        </span>
                        <span className="text-lg font-black text-slate-800 dark:text-slate-100">
                          12ms
                        </span>
                      </div>
                    </div>

                    {/* Visual Stream Animation */}
                    <div className="flex items-center gap-1.5 h-12 px-3 bg-white/50 dark:bg-slate-950/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden backdrop-blur-sm">
                      {[...Array(24)].map((_, i) =>
                        isLowSpec ? (
                          <div
                            key={i}
                            className="w-full min-w-[4px] rounded-full"
                            style={{
                              height: `${20 + (i % 5) * 15}%`,
                              backgroundColor: selectedNode.color,
                              opacity: 0.2 + (i / 24) * 0.8,
                            }}
                          />
                        ) : (
                          <motion.div
                            key={i}
                            animate={{
                              height: [
                                "25%",
                                `${30 + Math.random() * 60}%`,
                                `${15 + Math.random() * 50}%`,
                                "25%",
                              ],
                            }}
                            transition={{
                              duration: 0.6 + Math.random() * 0.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.05,
                            }}
                            className="w-full min-w-[4px] rounded-full"
                            style={{
                              backgroundColor: selectedNode.color,
                              opacity: 0.2 + (i / 24) * 0.8,
                            }}
                          />
                        ),
                      )}
                    </div>
                    <div className="mt-4 flex justify-between items-center px-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Capture Engine: v2.4
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Healthy
                      </span>
                    </div>
                  </div>

                  {selectedNode.menuItems && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-6 pl-1">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                          <Layout size={16} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-[#6b7280]">
                          Sistem Navigasi Cepat
                        </h4>
                      </div>
                      <div className="grid gap-3">
                        {selectedNode.menuItems.map((item, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ x: 6 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              item.path !== "#" && navigate(item.path)
                            }
                            className={`group relative flex items-center justify-between p-5 rounded-[1.5rem] border transition-all duration-300 ${
                              item.path === "#"
                                ? "opacity-50 cursor-not-allowed bg-slate-50/50 dark:bg-[#1c1d22]/50 border-transparent shadow-none"
                                : "bg-white dark:bg-[#1c1d22] border-slate-200/60 dark:border-[#2e303a] hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 shadow-sm"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`size-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                                  item.path === "#"
                                    ? "bg-slate-200 dark:bg-slate-800"
                                    : "bg-primary/5 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30"
                                }`}
                              >
                                <Sparkles
                                  size={16}
                                  className={
                                    item.path === "#" ? "opacity-20" : ""
                                  }
                                />
                              </div>
                              <span className="font-black text-sm tracking-tight text-slate-700 dark:text-[#f3f4f6] group-hover:text-primary transition-colors">
                                {item.label}
                              </span>
                            </div>
                            <div
                              className={`p-2 rounded-full transition-all duration-500 ${
                                item.path === "#"
                                  ? "bg-transparent"
                                  : "bg-slate-50 dark:bg-slate-800/50 group-hover:bg-primary/10 group-hover:translate-x-1"
                              }`}
                            >
                              {item.path === "#" ? (
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                                  Soon
                                </span>
                              ) : (
                                <ArrowUpRight
                                  size={16}
                                  className="text-primary group-hover:rotate-45 transition-transform duration-500"
                                />
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Diagnostic Log Detail - Moved below Quick Navigation */}
                  <div className="space-y-3 px-1 pt-4 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <Activity size={16} className="text-slate-400" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        Diagnostic Log
                      </h4>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#9ca3af] font-medium bg-slate-50/50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                      {selectedNode.details}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
