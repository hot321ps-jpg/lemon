"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type KPIStatus = "GREEN" | "AMBER" | "RED";

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!Number.isFinite(target)) return;

    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export function KpiCard({
  label,
  value,
  unit,
  status = "GREEN",
}: {
  label: string;
  value: number;
  unit: string;
  status?: KPIStatus;
}) {
  const dot =
    status === "GREEN" ? "bg-lemon" : status === "AMBER" ? "bg-amber-400" : "bg-red-400";

  const animated = useCountUp(value, 900);

  const display = useMemo(() => {
    // 小數處理：0.xx 類型顯示 2 位；其他盡量整數
    const isSmall = Math.abs(value) < 1 && value !== 0;
    const digits = isSmall ? 2 : Number.isInteger(value) ? 0 : 2;
    return animated.toFixed(digits);
  }, [animated, value]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      className="rounded-3xl bg-white shadow-card ring-1 ring-border-soft px-8 py-6"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted">{label}</p>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-semibold text-ink tracking-tight tabular-nums">
              {display}
            </div>
            <div className="text-xs font-medium text-muted pb-1">{unit}</div>
          </div>
        </div>
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
      </div>
    </motion.section>
  );
}
