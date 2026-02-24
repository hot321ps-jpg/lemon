"use client";

import React from "react";
import { BarChart3, Users, type LucideIcon } from "lucide-react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const PIE_COLORS = ["#D9E021", "#111827", "#6B7280", "#D1D5DB"];

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={["rounded-3xl bg-white shadow-card ring-1 ring-border-soft", className].join(" ")}>{children}</section>
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
      <div className="w-9 h-9 rounded-2xl bg-black/5 flex items-center justify-center">
        <Icon size={18} className="text-ink" />
      </div>
      <h3 className="text-base font-semibold text-ink tracking-tight">{title}</h3>
    </div>
    {right}
  </div>
);

const WhiteTooltip = (props: any) => {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl bg-white px-4 py-3 shadow-soft ring-1 ring-black/10">
      {label ? <div className="text-xs font-medium text-muted mb-1">{label}</div> : null}
      {payload.map((p: any, i: number) => (
        <div key={i} className="text-sm text-ink">
          <span className="font-medium">{p.name ?? p.dataKey}</span>
          <span className="text-muted"> · </span>
          <span className="font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function AnalysisPanel({
  traffic,
  contentMatrix,
}: {
  traffic: Array<{ name: string; value: number }>;
  contentMatrix: Array<{ name: string; x: number; y: number; z: number }>;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader title="內容貢獻矩陣" icon={BarChart3} right={<span className="text-xs text-muted">X: 擴散 · Y: 穩定</span>} />
        <div className="px-6 md:px-8 py-6">
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 16, right: 16, bottom: 16, left: 0 }}>
                <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="擴散性"
                  stroke="rgba(0,0,0,0.35)"
                  tick={{ fill: "rgba(0,0,0,0.45)", fontSize: 12 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="穩定度"
                  stroke="rgba(0,0,0,0.35)"
                  tick={{ fill: "rgba(0,0,0,0.45)", fontSize: 12 }}
                />
                <ZAxis type="number" dataKey="z" range={[90, 520]} />
                <Tooltip content={<WhiteTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "rgba(0,0,0,0.2)" }} />
                {contentMatrix.map((entry, index) => (
                  <Scatter key={index} name={entry.name} data={[entry]} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-xs text-muted">
            建議：先把「高擴散但低穩定」的內容補上固定開場與規則提示，讓新觀眾更容易留下來。
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="流量來源" icon={Users} />
        <div className="px-6 md:px-8 py-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={traffic} innerRadius={70} outerRadius={105} dataKey="value" paddingAngle={4}>
                  {traffic.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} stroke="rgba(0,0,0,0.08)" />
                  ))}
                </Pie>
                <Tooltip content={<WhiteTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {traffic.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  {item.name}
                </div>
                <div className="font-semibold tabular-nums text-ink">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
