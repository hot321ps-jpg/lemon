// ---------- 主要頁面組件 ----------

export default function LemonyangWarRoom() {
  const [activeTab, setActiveTab] = useState("chuni");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 selection:bg-[#D9E021] selection:text-black font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#D9E021] text-black px-2 py-0.5 text-[10px] font-black rounded italic uppercase">Live Monitor</span>
              <h1 className="text-5xl font-black tracking-tighter italic uppercase text-white font-sans">
                Lemon<span className="text-[#D9E021]">yang</span> Command
              </h1>
            </div>
            <p className="text-neutral-500 max-w-xl text-sm leading-relaxed">{MOCK.channel.oneLiner}</p>
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
          {Object.entries(MOCK.kpis).map(([key, kpi]) => (
            <div key={key} className="bg-[#141414] border border-white/5 p-5 rounded-2xl group hover:border-[#D9E021]/30 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">{kpi.label}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${kpi.status === 'GREEN' ? 'bg-[#D9E021]' : 'bg-red-500'} shadow-[0_0_8px_currentColor]`} />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-black italic text-white font-sans tracking-tighter">{kpi.value}</span>
                <span className="text-[10px] text-neutral-600 font-bold uppercase">{kpi.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <main className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "chuni" && <ChuniPanel />}
              {activeTab === "analysis" && <AnalysisPanel />}
              {activeTab === "plan" && <PlanPanel />}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-600 text-[10px] font-black tracking-widest uppercase">
          <div className="flex items-center gap-2 font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D9E021] animate-pulse" /> 
            系統核心運作中
          </div>
          <div className="font-mono">VER: 2.5.0_LEMON_BURST</div>
        </footer>
      </div>
    </div>
  );
}
