"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";

export function KpiCard({
  title,
  value,
  suffix,
  note,
}: {
  title: string;
  value: number;
  suffix: string;
  note?: string;
}) {
  return (
    <motion.div
      className="hud-card p-5"
      initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4 }}
    >
      <i className="corner tl" /><i className="corner tr" />
      <i className="corner bl" /><i className="corner br" />

      <div className="hud-title">{title}</div>

      <div className="mt-3 flex items-end gap-2">
        <div className="text-4xl font-semibold tracking-tight">
          <CountUp end={value} duration={1.1} decimals={Number.isInteger(value) ? 0 : 2} />
        </div>
        <div className="pb-1 text-white/60">{suffix}</div>
      </div>

      {note && <div className="subtext mt-2 text-sm">{note}</div>}
    </motion.div>
  );
}
