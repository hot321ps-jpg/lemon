"use client";

import React, { useState } from "react";
import {
  Activity,
  BarChart3,
  Crown,
  Flame,
  MousePointer2,
  Rocket,
  ScrollText,
  ShieldAlert,
  Sword,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

// ---------- 視覺配置 ----------
const THEME = {
  lemon: "#D9E021",
  bg: "#0A0A0A",
  card: "#141414",
  border: "rgba(217, 224, 33, 0.15)",
  danger: "#FF4D4D"
};

const PIE_COLORS = [THEME.lemon, "#BCC41E", "#9AA118", "#787D13"];

// ---------- 模擬數據 ----------
const MOCK = {
  channel: {
    name: "lemonyang",
    stage: "領域展開期",
    oneLiner: "核心粉絲黏著度極高，需透過『中二企劃』打破同溫層流量。",
    core: "中二魂實況 ｜ 陪伴型互動"
  },
  kpis: [
    { icon: Flame, label: "信仰波長", value: "85%", sub: "CPM: 62", color: THEME.lemon },
    { icon: Users, label: "平均觀看", value: "420", sub: "ACV", color: THEME.lemon },
    { icon: Activity, label: "羊群黏著", value: "72%", sub: "Retention", color: THEME.lemon },
    { icon: Zap, label: "擴散指標", value: "Low", sub: "Viral Index", color: THEME.danger },
  ],
  chuniKpis: [
    { id: 1, category: "設定沉浸度", metric: "內梗頻率", target: "50", actual: "62", status: "EXCEED", advice: "羊群對新設定接受度高。" },
    { id: 2, category: "儀式感執行", metric: "領域展開留存", target: "85%", actual: "78%", status: "WARNING", advice: "建議縮短吟唱時間。" },
    { id: 3, category: "造梗擴散", metric: "二創產量", target: "5", actual: "8", status: "EXCEED", advice: "本週發言極具剪輯潛力。" },
  ],
  contentMatrix: [
    { name: "中二企劃", x: 85, y: 40, z: 45 },
    { name: "深夜雜談", x: 30, y: 85, z: 35 },
    { name: "聯動直播", x: 70, y: 50, z: 15 },
  ],
  phases: [
    { title: "Phase 1｜領域鞏固", goal: "強化儀式感", bullets: ["固定開台吟唱", "建立術語表", "羊群真心話"] },
    { title: "Phase 2｜概念擴散", goal: "製造爆點", bullets: ["賭注企劃", "領域碰撞連動", "短影音投放"] },
    { title: "Phase 3｜神格化", goal: "IP 固化", bullets: ["中二週邊", "會員專屬階級", "線下聚會"] },
  ]
};

// ---------- 子組件 ----------

const Card = ({ children, className = "" }) => (
  <div className={`bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-2xl ${className}`}>
    {children}
  </div>
);

const ChuniPanel = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-gradient-to-br from-[#D9E021]/10 to-transparent border-[#D9E021]/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MousePointer2 size={18} className="text-[#D9E021]" /> 指揮官指令</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          目前「羊群」對於設定驅動型內容反應極佳。建議在直播畫面增加「今日領地規則」小浮窗，降低新教眾的認知難度。
        </p>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white"><Target size={18} className="text-[#D9E021]" /> 術式穩定度</h3>
        <div className="space-y-4">
          {["吟唱完成度", "視覺特效同步"].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-[10px] mb-1.5 text-neutral-500 font-bold uppercase">{item}</div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#D9E021] shadow-[0_0_8px_#D9E021]" style={{ width: `${85 - i * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="p-4">類別</th>
              <th className="p-4">指標</th>
              <th className="p-4 text-center">達成</th>
              <th className="p-4">作戰建議</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK.chuniKpis.map((kpi) => (
              <tr key={kpi.id} className="hover:bg-white/[0.02]">
                <td className="p-4 font-black text-[#D9E021] italic">{kpi.category}</td>
                <td className="p-4 text-neutral-400">{kpi.metric}</td>
                <td className="p-4 text-center font-mono">
                  <span className={kpi.status === 'WARNING' ? 'text-red-500' : 'text-emerald-400'}>{kpi.actual}</span>
                  <span className="text-neutral-600"> / {kpi.target}</span>
                </td>
                <td className="p-4 text-[11px] text-neutral-500 italic leading-relaxed">{kpi.advice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const AnalysisPanel = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <Card className="lg:col-span-2 p-6">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><BarChart3 size={18} className="text-[#D9E021]" /> 內容貢獻矩陣</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <XAxis type="number" dataKey="x" name="擴散性" stroke="#444" fontSize={12} />
            <YAxis type="number" dataKey="y" name="穩定度" stroke="#444" fontSize={12} />
            <ZAxis type="number" dataKey="z" range={[100, 1000]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{backgroundColor:'#141414', border:'1px solid #333'}} />
            {MOCK.contentMatrix.map((entry, index) => (
              <Scatter key={index} name={entry.name} data={[entry]} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Activity size={18} className="text-[#D9E021]" /> 風險監控</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
            { subject: '情緒', A: 85 }, { subject: '內容', A: 60 }, { subject: '擴散', A: 75 }, { subject: '連動', A: 50 }
          ]}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="subject" tick={{fill:'#666', fontSize:12}} />
            <Radar dataKey="A" stroke="#D9E021" fill="#D9E021" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

// ---------- 主頁面 ----------

export default function WarRoomPage() {
  const [activeTab, setActiveTab] = useState("chuni");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 font-sans selection:bg-[#D9E021] selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#D9E021] text-black px-2 py-0.5 text-[10px] font-black rounded uppercase italic">System Live</span>
              <h1 className="text-5xl font-black tracking-tighter italic uppercase">Lemon<span className="text-[#D9E021]">yang</span> Command</h1>
            </div>
            <p className="text-neutral-500 max-w-xl text-sm font-medium">{MOCK.channel.oneLiner}</p>
          </div>

          <nav className="flex p-1.5 bg-neutral-900 border border-white/5 rounded-2xl">
            {[
              { id: "chuni", label: "中二企劃", icon: Sword },
              { id: "analysis", label: "數據矩陣", icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all uppercase ${
                  activeTab === tab.id ? "bg-[#D9E021] text-black shadow-[0_0_20px_rgba(217,224,33,0.3)]" : "text-neutral-500 hover:text-white"
                }`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK.kpis.map((kpi, i) => (
            <Card key={i} className="p-5 flex items-center gap-4 hover:border-[#D9E021]/30 transition-all cursor-default">
              <div className="p-3 rounded-2xl bg-white/5" style={{ color: kpi.color }}><kpi.icon size={24} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">{kpi.label}</p>
                <p className="text-2xl font-black italic">{kpi.value}</p>
                <p className="text-[10px] text-neutral-700 font-mono">{kpi.sub}</p>
              </div>
            </Card>
          ))}
        </div>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "chuni" ? <ChuniPanel /> : <AnalysisPanel />}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="pt-10 border-t border-white/5 flex justify-between items-center text-[10px] text-neutral-700 font-black tracking-widest uppercase">
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D9E021] animate-pulse" /> Command Center Online</div>
          <div>© 2026 LEMON COMMAND // v2.5.0</div>
        </footer>
      </div>
    </div>
  );
}
