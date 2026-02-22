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

// ---------- 視覺與數據配置 ----------
const THEME = {
  lemon: "#D9E021",
  bg: "#0A0A0A",
  card: "#141414",
  border: "rgba(217, 224, 33, 0.2)",
  danger: "#FF4D4D"
};

const PIE_COLORS = [THEME.lemon, "#BCC41E", "#9AA118", "#787D13"];

const MOCK = {
  channel: {
    name: "lemonyang",
    stage: "領域展開期",
    oneLiner: "核心粉絲黏著度極高，需透過『中二企劃』打破流量同溫層。",
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
    { id: 2, category: "儀式感執行", metric: "領域展開留存", target: "85%", actual: "78%", status: "WARNING", advice: "建議縮短吟唱時間。" },
    { id: 3, category: "造梗擴散", metric: "二創產量", target: "5", actual: "8", status: "EXCEED", advice: "本週發言具剪輯潛力。" },
  ],
  traffic: [
    { name: "羊群回流", value: 65 },
    { name: "演算法", value: 20 },
    { name: "外部導流", value: 15 },
  ],
  contentMatrix: [
    { name: "中二企劃", x: 85, y: 40, z: 45 },
    { name: "深夜雜談", x: 30, y: 85, z: 35 },
    { name: "聯動直播", x: 70, y: 50, z: 15 },
    { name: "遊戲挑戰", x: 45, y: 60, z: 5 },
  ],
  phases: [
    { title: "Phase 1｜領域鞏固", goal: "強化儀式感", bullets: ["固定開台吟唱", "建立術語表", "真心話環節"] },
    { title: "Phase 2｜概念擴散", goal: "製造爆點", bullets: ["賭注企劃", "領域碰撞連動", "短影音投放"] },
    { title: "Phase 3｜神格化", goal: "IP 固化", bullets: ["中二週邊", "會員階級", "線下聚會"] },
  ]
};

// ---------- UI 基礎組件 ----------
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, icon: Icon, color = THEME.lemon }: { title: string; icon: any; color?: string }) {
  return (
    <div className="flex items-center gap-3 p-6 border-b border-white/5">
      <Icon size={20} style={{ color }} />
      <h3 className="text-lg font-bold tracking-tight text-white">{title}</h3>
    </div>
  );
}

// ---------- 面板組件 ----------

function ChuniPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-[#D9E021]/10 to-transparent border-[#D9E021]/30">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MousePointer2 size={20} className="text-[#D9E021]" /> 指揮官指令
          </h3>
          <p className="text-sm text-neutral-400">目前「羊群」反應極佳，建議增加「今日領地規則」浮窗。</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white italic">術式穩定度</h3>
          <div className="space-y-5">
            {["吟唱完成", "特效同步", "觀眾配合"].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neutral-500 font-bold uppercase">{item}</span>
                  <span className="text-[#D9E021] font-mono">{85 - i * 5}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full">
                  <div className="h-full bg-[#D9E021] rounded-full" style={{ width: `${85 - i * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <CardHeader title="中二企劃 KPI 追蹤" icon={ScrollText} />
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left text-sm">
            <thead className="text-neutral-500 text-[10px] uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="pb-4">類別</th>
                <th className="pb-4">指標</th>
                <th className="pb-4 text-center">實際/目標</th>
                <th className="pb-4">作戰指令</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK.chuniKpis.map((kpi) => (
                <tr key={kpi.id} className="hover:bg-white/[0.02]">
                  <td className="py-4 font-black text-[#D9E021] italic">{kpi.category}</td>
                  <td className="py-4 text-neutral-300">{kpi.metric}</td>
                  <td className="py-4 text-center font-mono font-bold">
                    <span className={kpi.status === 'WARNING' ? 'text-red-500' : 'text-emerald-400'}>{kpi.actual}</span>
                    <span className="text-neutral-600 ml-1">/{kpi.target}</span>
                  </td>
                  <td className="py-4 text-xs text-neutral-500 italic">{kpi.advice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AnalysisPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-6">
        <CardHeader title="內容矩陣" icon={BarChart3} />
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis type="number" dataKey="x" stroke="#444" />
              <YAxis type="number" dataKey="y" stroke="#444" />
              <ZAxis type="number" dataKey="z" range={[100, 1000]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{backgroundColor:'#141414', border:'none'}} />
              {MOCK.contentMatrix.map((entry, index) => (
                <Scatter key={index} name={entry.name} data={[entry]} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-6">
        <CardHeader title="流量來源" icon={Users} />
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={MOCK.traffic} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                {MOCK.traffic.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} stroke="none" />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-4">
          {MOCK.traffic.map((item, i) => (
            <div key={i} className="flex justify-between text-[10px] uppercase">
              <span className="text-neutral-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: PIE_COLORS[i]}} /> {item.name}
              </span>
              <span className="text-white font-mono">{item.value}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PlanPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {MOCK.phases.map((p, i) => (
        <Card key
