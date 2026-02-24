"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  BarChart3,
  Crown,
  MousePointer2,
  Rocket,
  ScrollText,
  Sword,
  Target,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------- 模擬數據集 ----------
const MOCK = {
  channel: {
    name: "lemonyang",
    stage: "領域展開期",
    oneLiner: "核心粉絲（羊群）黏著度極高，需透過『中二企劃』打破流量同溫層。",
    core: "中二魂實況 ｜ 陪伴型互動 ｜ 領域展開",
  },
  kpis: {
    faithWavelength: { value: 420, label: "信仰波長", unit: "ACV", status: "GREEN" as const },
    chatHeat: { value: 0.85, label: "聊天室熱度", unit: "CPM", status: "GREEN" as const },
    retention: { value: 0.72, label: "羊群留存", unit: "Index", status: "AMBER" as const },
    viral: { value: 0.45, label: "擴散力", unit: "Low", status: "RED" as const },
  },
  chuniKpis: [
    { id: 1, category: "設定沉浸度", metric: "內梗頻率", target: "50", actual: "62", status: "EXCEED", advice: "羊群對新設定接受度高。" },
    { id: 2, category: "儀式感執行", metric: "領域展開留存", target: "85%", actual: "78%", status: "WARNING", advice: "儀式吟唱建議縮短。" },
    { id: 3, category: "造梗擴散", metric: "二創產量 (週)", target: "5", actual: "8", status: "EXCEED", advice: "本週發言極具剪輯潛力。" },
  ],
  traffic: [
    { name: "羊群回流", value: 65 },
    { name: "演算法推薦", value: 20 },
    { name: "外部導流", value: 15 },
  ],
  contentMatrix: [
    { name: "中二企劃", x: 85, y: 40, z: 45 },
    { name: "深夜雜談", x: 30, y: 85, z: 35 },
    { name: "聯動直播", x: 70, y: 50, z: 15 },
    { name: "遊戲挑戰", x: 45, y: 60, z: 5 },
  ],
  phases: [
    { title: "Phase 1｜領域鞏固", goal: "強化內梗與儀式感", bullets: ["固定開台吟唱規則", "建立羊群專屬術語表", "每週一次真心話環節"] },
    { title: "Phase 2｜概念擴散", goal: "製造可剪輯的爆點", bullets: ["高張力賭注企劃", "跨台連動『領域碰撞』", "短影音高頻投放"] },
    { title: "Phase 3｜品牌神格化", goal: "IP 商業化與社群固化", bullets: ["推出專屬中二週邊", "開啟會員專屬階級", "線下大型教眾聚會"] },
  ],
};

type KPIStatus = "GREEN" | "AMBER" | "RED";

// ✅ AnalysisPanel 動態載入（recharts 不進首屏）
const AnalysisPanel = dynamic(() => import("./components/AnalysisPanel"), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl bg-white shadow-card ring-1 ring-border-soft p-8 text-sm text-muted">
      Loading charts…
    </div>
  ),
});

// ---------- Apple 官方感：Design System ----------
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section
    className={[
      "rounded-3xl bg-white shadow-card ring-1 ring-border-soft",
      "transition-transform duration-250 ease-apple hover:-translate-y-[1px]",
      className,
    ].join(" ")}
  >
    {children}
  </section>
);

const CardHeader = ({
  title,
  icon: Icon,
  right,
}: {
  title: string;
  icon: LucideIcon;
  right?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-4 px-8 py-6 border-b border-black/5">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-2xl bg-black/[0.05] ring-1 ring-black/5 flex items-center justify-center">
        <Icon size={18} className="text-ink" />
      </div>
      <h3 className="text-[15px] font-semibold text-ink tracking-tight">{title}</h3>
    </div>
    {right}
  </div>
);

const Segmented = ({
  value,
  onChange,
  items,
}: {
  value: string;
  onChange: (v: string) => void;
  items: Array<{ id: string; label: string; icon: LucideIcon }>;
}) => (
  <div className="inline-flex rounded-2xl bg-black/[0.05] p-1 ring-1 ring-border-soft shadow-inset">
    {items.map((it) => {
      const Icon = it.icon;
      const active = value === it.id;
      return (
        <button
          key={it.id}
          onClick={() => onChange(it.id)}
          className={[
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium",
            "transition duration-250 ease-apple",
            active ? "bg-white text-ink shadow-soft ring-1 ring-border-softer" : "text-muted hover:text-ink",
          ].join(" ")}
        >
          <Icon size={16} />
          {it.label}
        </button>
      );
    })}
  </div>
);

const MetricCard = ({
  label,
  value,
  unit,
  status,
}: {
  label: string;
  value: number | string;
  unit: string;
  status: KPIStatus;
}) => {
  const dot = status === "GREEN" ? "bg-lemon" : status === "AMBER" ? "bg-amber-400" : "bg-red-400";
  return (
    <Card className="px-8 py-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted">{label}</p>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-semibold text-ink tracking-tight tabular-nums">{value}</div>
            <div className="text-xs font-medium text-muted pb-1">{unit}</div>
          </div>
        </div>
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
      </div>
    </Card>
  );
};

// ---------- Panels ----------
const ChuniPanel = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lemon" />
                <span className="text-xs font-medium text-muted">Command</span>
              </div>
              <h3 className="text-xl font-semibold text-ink tracking-tight">本週重點指令</h3>
              <p className="text-sm text-muted leading-relaxed">
                羊群對設定驅動型內容反應佳，但「新觀眾理解成本」偏高。把規則說清楚，就能把黏著轉化成擴散。
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center shrink-0">
              <MousePointer2 size={18} className="text-ink" />
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-bg-soft p-4 ring-1 ring-border-soft">
            <div className="text-xs font-medium text-muted mb-2">即刻行動</div>
            <div className="text-sm text-ink">在直播畫面增加「今日領地規則」小浮窗，降低新教眾的認知難度。</div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black/30" />
                <span className="text-xs font-medium text-muted">Lore Sync</span>
              </div>
              <h3 className="text-xl font-semibold text-ink tracking-tight">術式穩定度</h3>
              <p className="text-sm text-muted leading-relaxed">
                儀式感要穩、但不要拖。把流程變短，觀眾更容易跟上、也更容易剪成短影音。
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center shrink-0">
              <Target size={18} className="text-ink" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {[
              { name: "吟唱完成度", v: 85 },
              { name: "視覺特效同步", v: 80 },
              { name: "觀眾口號配合", v: 75 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted font-medium">{item.name}</span>
                  <span className="text-ink font-semibold tabular-nums">{item.v}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.v}%` }}
                    transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                    className="h-full bg-lemon rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="企劃 KPI 追蹤"
          icon={ScrollText}
          right={
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-sm font-medium text-muted hover:text-ink transition duration-250 ease-apple"
            >
              {open ? "收合" : "展開"}
            </button>
          }
        />
        {open ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/[0.03] text-muted text-[11px] font-medium">
                <tr>
                  <th className="px-8 py-4 border-b border-black/5">類別</th>
                  <th className="px-8 py-4 border-b border-black/5">關鍵指標</th>
                  <th className="px-8 py-4 border-b border-black/5 text-center">實際 / 目標</th>
                  <th className="px-8 py-4 border-b border-black/5">建議</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {MOCK.chuniKpis.map((kpi) => {
                  const ok = kpi.status !== "WARNING";
                  return (
                    <tr key={kpi.id} className="hover:bg-black/[0.015] transition-colors">
                      <td className="px-8 py-5">
                        <span className="text-sm font-semibold text-ink">{kpi.category}</span>
                      </td>
                      <td className="px-8 py-5 text-sm text-muted">{kpi.metric}</td>
                      <td className="px-8 py-5 text-center tabular-nums">
                        <span className={`text-sm font-semibold ${ok ? "text-ink" : "text-red-600"}`}>{kpi.actual}</span>
                        <span className="text-muted text-sm ml-2">/ {kpi.target}</span>
                      </td>
                      <td className="px-8 py-5 text-sm text-muted">{kpi.advice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-8 py-6 text-sm text-muted">已收合。點右上角展開查看細節。</div>
        )}
      </Card>
    </div>
  );
};

const PlanPanel = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {MOCK.phases.map((p, i) => (
      <Card key={i} className="p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-medium text-muted">Phase {i + 1}</div>
          <span className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-lemon" : "bg-black/20"}`} />
        </div>

        <h4 className="text-lg font-semibold text-ink tracking-tight">{p.title}</h4>

        <div className="mt-4 rounded-2xl bg-bg-soft p-4 ring-1 ring-border-soft">
          <p className="text-xs font-medium text-muted mb-1">主要目標</p>
          <p className="text-sm text-ink">{p.goal}</p>
        </div>

        <ul className="mt-5 space-y-3">
          {p.bullets.map((b, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-muted">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lemon shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Card>
    ))}
  </div>
);

// ---------- Page ----------
export default function Page() {
  const [activeTab, setActiveTab] = useState<"chuni" | "analysis" | "plan">("chuni");

  const tabs: Array<{ id: "chuni" | "analysis" | "plan"; label: string; icon: LucideIcon }> = useMemo(
    () => [
      { id: "chuni", label: "企劃", icon: Sword },
      { id: "analysis", label: "分析", icon: BarChart3 },
      { id: "plan", label: "計畫", icon: Rocket },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-bg-soft text-ink font-sans selection:bg-lemon selection:text-black">
      <div className="mx-auto max-w-content px-6 md:px-10 py-10 md:py-14 space-y-10">
        {/* Hero */}
        <header className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="rounded-full bg-black text-white px-3 py-1 text-xs font-medium">Live Monitor</span>
                <span className="text-xs text-muted">Channel · {MOCK.channel.name}</span>
              </div>

              <h1 className="text-hero font-semibold tracking-tight">
                LemonYang <span className="text-muted">Dashboard</span>
              </h1>

              <p className="text-base text-muted max-w-2xl leading-relaxed">用更少資訊，做更快決策。</p>
              <p className="text-sm text-muted/80 max-w-2xl leading-relaxed">{MOCK.channel.oneLiner}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium ring-1 ring-border-soft">
                  <Crown size={14} className="text-ink" />
                  {MOCK.channel.stage}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted ring-1 ring-border-soft">
                  {MOCK.channel.core}
                </span>
              </div>
            </div>

            <Segmented value={activeTab} onChange={(v) => setActiveTab(v as any)} items={tabs} />
          </div>
        </header>

        {/* KPI */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard {...MOCK.kpis.faithWavelength} />
          <MetricCard {...MOCK.kpis.chatHeat} />
          <MetricCard {...MOCK.kpis.retention} />
          <MetricCard {...MOCK.kpis.viral} />
        </section>

        {/* Main */}
        <main className="min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {activeTab === "chuni" && <ChuniPanel />}
              {activeTab === "analysis" && <AnalysisPanel traffic={MOCK.traffic} contentMatrix={MOCK.contentMatrix} />}
              {activeTab === "plan" && <PlanPanel />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lemon" />
            系統運作中 <span className="text-muted/70">·</span> <span className="text-muted/70">v2.5.0</span>
          </div>
          <div className="text-muted/70">© 2026 Lemon Dashboard</div>
        </footer>
      </div>
    </div>
  );
}
