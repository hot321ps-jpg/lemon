].map((tab) => {
  const TabIcon = tab.icon;
  return (
    <button ...>
      <TabIcon size={14} /> {tab.label}
    </button>
  );
})}
