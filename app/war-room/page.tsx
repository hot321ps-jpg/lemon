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
  Zap,
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

// ---------- 視覺定義 ----------
const THEME = {
  lemon: "#D9E021",
  bg: "#0A0A0A",
  card: "#141414",
  border: "rgba(217, 224, 33, 0.2)",
  text: "#FFFFFF",
  muted: "#A3A3A3",
  danger: "#FF4D4D"
};

const PIE_COLORS = [THEME.lemon, "#BCC41E", "#9AA118", "#787D13"];

// ---------- 模擬數據 ----------
const MOCK = {
  channel: {
    name: "lemonyang",
    stage: "領域展開期",
    oneLiner: "核心粉絲（羊群）黏著度極高，需透過『中二企劃』打破流量同溫層。",
    core: "中二魂實況 ｜ 陪伴型互動 ｜ 領域展開"
  },
  kpis: {
    faithWavelength: { value: 420, label: "信仰波長", unit: "ACV", status: "GREEN" },
    chatHeat: { value: 0.85, label: "聊天室熱度", unit: "CPM", status: "GREEN" },
    retention: { value: 0.72, label: "羊群留存", unit: "Index", status: "AMBER" },
    viral: { value: 0.45, label: "擴散力", unit: "Low", status: "RED" },
  },
  chuniKpis: [
    { id: 1, category: "設定沉浸度", metric: "內梗頻率", target: "50", actual: "62", status: "EXCEED", advice: "羊群對新設定接受度高。" },
    { id: 2, category: "儀式感執行", metric: "領域展開留存", target: "85%", actual: "78%", status: "WARNING", advice: "儀式吟唱建議縮短。" },
    { id: 3, category: "造梗擴散", metric: "二創產量", target: "5", actual: "8", status: "EXCEED", advice: "本週發言極具剪輯潛力。" },
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
  ]
};

// ---------- UI 基礎組件 ----------
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-2xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title, icon: Icon, color = THEME.lemon }: { title: string; icon: any; color?: string }) => (
  <div className="flex items-center gap-3 p-6 border-b border-white/5">
    <Icon size={20} style={{ color }} />
    <h3 className="text-lg font-bold tracking-tight text-white">{title}</h3>
  </div>
);

// ---------- 分頁面板 ----------

const ChuniPanel = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-[#D9E021]/10 to-transparent border-[#D9E021]/30">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MousePointer2 size={20} className="text-[#D9E021]" /> 指揮官指令
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            目前「羊群」對於設定驅動型內容反應極佳，但轉化為「新觀眾」的效率停滯。建議增加「今日領地規則」小浮窗。
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
            <Target size={20} className="text-[#D9E021]" /> 術式穩定度
          </h3>
          <div className="space-y-5">
            {["吟唱完成度", "視覺特效同步", "觀眾口號配合"].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neutral-500 font-bold uppercase">{item}</span>
                  <span className="text-[#D9E021] font-mono">{85 - i * 5}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full">
                  <div className="h-full bg-[#D9E021] shadow-[0_0_10px_#D9E021] rounded-full" style={{ width: `${85 - i * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="中二企劃 KPI 追蹤" icon={ScrollText} />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-neutral-500 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="p-4 border-b border-white/5">類別</th>
                <th className="p-4 border-b border-white/5">關鍵指標</th>
                <th className="p-4 border-b border-white/5 text-center">實際 / 目標</th>
                <th className="p-4 border-b border-white/5">作戰指令</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK.chuniKpis.map((kpi) => (
                <tr key={kpi.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-black text-[#D9E021] italic">{kpi.category}</td>
                  <td className="p-4 text-neutral-300">{kpi.metric}</td>
                  <td className="p-4 text-center font-mono font-bold">
                    <span className={kpi.status === 'WARNING' ? 'text-red-500' : 'text-emerald-400'}>{kpi.actual}</span>
                    <span className="text-neutral-600 ml-1">/ {kpi.target}</span>
                  </td>
                  <td className="p-4 text-xs text-neutral-500 italic">{kpi.advice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const AnalysisPanel = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-6">
        <CardHeader title="內容貢獻矩陣" icon={BarChart3} />
        <div className="h-[350px]">
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
        <CardHeader title="流量信仰來源" icon={Users} />
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={MOCK.traffic} innerRadius={70} outerRadius={100} dataKey="value" paddingAngle={5}>
                {MOCK.traffic.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} stroke="none" />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4 text-[10px]">
            {MOCK.traffic.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-neutral-500 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: PIE_COLORS[i]}} /> {item.name}
                </span>
                <span className="text-white font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const PlanPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {MOCK.phases.map((p, i) => (
        <Card key={i} className={`p-6 ${i === 0 ? 'border-[#D9E021]/40' : ''}`}>
          <div className="text-[10px] font-black text-[#D9E021] uppercase tracking-widest mb-2">Phase 0{i+1}</div>
          <h4 className="text-xl font-black text-white italic mb-4">{p.title}</h4>
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <p className="text-xs text-neutral-500 uppercase font-bold mb-1">主要目標</p>
            <p className="text-sm text-white">{p.goal}</p>
          </div>
          <ul className="space-y-3">
            {p.bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-neutral-400">
                <div className="mt-1.5 w-1 h-1 rounded-full bg-[#D9E021] shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
};

// ---------- 主頁面組件 ----------
export default function LemonyangWarRoom() {
  const [activeTab, setActiveTab] = useState("chuni");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 font-sans selection:bg-[#D9E021] selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#D9E021] text-black px-2 py-0.5 text-[10px] font-black rounded uppercase italic tracking-tighter">Live Monitor</span>
              <h1 className="text-5xl font-black tracking-tighter italic text-white uppercase">
                Lemon<span className="text-[#D9E021]">yang</span> Command
              </h1>
            </div>
            <p className="text-neutral-500 max-w-xl text-sm font-medium leading-relaxed">
              {MOCK.channel.oneLiner}
            </p>
            <div className="flex gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                <Crown size={12} className="text-[#D9E021]" /> {MOCK.channel.stage}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                定位：{MOCK.channel.core}
              </span>
            </div>
          </div>

          <nav className="flex p-1.5 bg-neutral-900 border border-white/5 rounded-2xl">
            {[
              { id: "chuni", label: "中二企劃", icon: Sword },
              { id: "analysis", label: "矩陣分析", icon: BarChart3 },
              { id: "plan", label: "作戰計畫", icon: Rocket },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-tighter ${
                  activeTab === tab.id 
                    ? "bg-[#D9E021] text-black shadow-[0_0_25px_rgba(217,224,33,0.4)]" 
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(MOCK.kpis).map(([key, kpi]) => (
            <div key={key} className="bg-[#141414] border border-white/5 p-5 rounded-2xl group hover:border-[#D9E021]/30 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">{kpi.label}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${kpi.status === 'GREEN' ? 'bg-[#D9E021]' : kpi.status === 'AMBER' ? 'bg-amber-500' : 'bg-red-500'} shadow-[0_0_8px_currentColor]`} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white italic tracking-tighter">{kpi.value}</span>
                <span className="text-[10px] text-neutral-600 font-bold uppercase">{kpi.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <main className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "chuni" && <ChuniPanel />}
              {activeTab === "analysis" && <AnalysisPanel />}
              {activeTab === "plan" && <PlanPanel />}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-600 text-[10px] font-black tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D9E021] animate-pulse" /> 
            系統核心運作中
          </div>
          <div>VER: 2.5.0_LEMON_BURST</div>
        </footer>
      </div>
    </div>
  );
}
