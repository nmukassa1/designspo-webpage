"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mouse, Sparkles, FolderOpen } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse & Discover",
    description: "Find inspiring designs while browsing the web",
    icon: Mouse,
  },
  {
    id: 2,
    title: "Capture Instantly",
    description: "Click the extension to save with one click",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Organize & Access",
    description: "View all your inspirations in your dashboard",
    icon: FolderOpen,
  },
];

export function AnimatedDemo() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Browser mockup */}
      <div className="relative bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
        {/* Browser header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-background rounded-lg px-4 py-1.5 text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-xs">🔒</span>
              <span>dribbble.com/shots/beautiful-design</span>
            </div>
          </div>
          {/* Extension icon */}
          <motion.div
            animate={{
              scale: activeStep === 1 ? [1, 1.2, 1] : 1,
              boxShadow:
                activeStep === 1
                  ? [
                      "0 0 0 0 rgba(226, 112, 91, 0)",
                      "0 0 0 8px rgba(226, 112, 91, 0.3)",
                      "0 0 0 0 rgba(226, 112, 91, 0)",
                    ]
                  : "none",
            }}
            transition={{
              duration: 1,
              repeat: activeStep === 1 ? Infinity : 0,
            }}
            className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        </div>

        {/* Browser content */}
        <div className="relative h-[320px] md:h-[400px] bg-gradient-to-br from-secondary to-muted p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div
                key="browse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl bg-card shadow-lg overflow-hidden"
                  >
                    <div
                      className="h-full w-full"
                      style={{
                        background: `linear-gradient(135deg, 
                          hsl(${20 + i * 30}, 70%, ${75 + (i % 2) * 10}%) 0%, 
                          hsl(${40 + i * 30}, 60%, ${65 + (i % 2) * 10}%) 100%)`,
                      }}
                    />
                  </motion.div>
                ))}
                <motion.div
                  animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-8 right-8 w-6 h-6"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M5.5 3.21V20.79c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z"
                      fill="currentColor"
                      className="text-foreground"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                key="capture"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full"
              >
                <div className="relative">
                  {/* Card being captured */}
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 0.95, 1.02, 1] }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-64 h-48 rounded-xl bg-card shadow-xl overflow-hidden"
                  >
                    <div
                      className="h-full w-full"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(25, 80%, 70%) 0%, hsl(45, 70%, 65%) 100%)",
                      }}
                    />
                  </motion.div>

                  {/* Capture effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1.2, 1.5, 2],
                    }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute inset-0 rounded-xl border-4 border-primary"
                  />

                  {/* Sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: Math.cos((i * Math.PI) / 3) * 80,
                        y: Math.sin((i * Math.PI) / 3) * 80,
                      }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="absolute top-1/2 left-1/2 w-3 h-3"
                    >
                      <Sparkles className="w-full h-full text-primary" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="organize"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex gap-4"
              >
                {/* Sidebar */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="w-48 bg-card rounded-xl p-4 shadow-lg hidden md:block"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <FolderOpen className="w-4 h-4" />
                      <span>All Designs</span>
                    </div>
                    {["Landing Pages", "Mobile Apps", "Dashboards"].map(
                      (cat, i) => (
                        <motion.div
                          key={cat}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="text-sm text-muted-foreground pl-6"
                        >
                          {cat}
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>

                {/* Grid */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-lg bg-card shadow-md overflow-hidden group cursor-pointer"
                    >
                      <div
                        className="h-full w-full min-h-[80px]"
                        style={{
                          background: `linear-gradient(135deg, 
                            hsl(${15 + i * 25}, 65%, ${72 + (i % 3) * 8}%) 0%, 
                            hsl(${35 + i * 25}, 55%, ${62 + (i % 3) * 8}%) 100%)`,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-center gap-8 mt-8">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(index)}
            className="flex flex-col items-center gap-2 group"
          >
            <motion.div
              animate={{
                scale: activeStep === index ? 1.1 : 1,
                backgroundColor:
                  activeStep === index ? "var(--primary)" : "var(--secondary)",
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            >
              <step.icon
                className={`w-5 h-5 transition-colors ${
                  activeStep === index
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              />
            </motion.div>
            <span
              className={`text-xs font-medium transition-colors ${
                activeStep === index
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
