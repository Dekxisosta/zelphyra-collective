// components/SalesBarChart.jsx

export default function SalesBarChart({ data = [] }) {
  // Helper to handle parsing safely
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(NaN);
    // Remove potential extra quotes from string inputs
    const cleanStr = typeof dateStr === "string" ? dateStr.replace(/['"]+/g, '') : dateStr;
    return new Date(cleanStr);
  };

  // 1. Calculate Daily Max
  const maxSoldDaily = Math.max(...data.map((d) => d.sold || 0), 1);

  // 2. Aggregate Data by Month
  const monthlyStats = data.reduce((acc, curr) => {
    const date = parseDate(curr.paid_at); 

    if (!isNaN(date.getTime())) {
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      acc[key] = (acc[key] || 0) + (curr.sold || 0);
    } else {
      console.warn("Invalid date encountered in aggregation:", curr.paid_at);
    }
    return acc;
  }, {});

  const monthlyData = Object.entries(monthlyStats).map(([label, total]) => ({
    label,
    total,
  }));

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Monthly Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {monthlyData.length > 0 ? (
          monthlyData.map((m, i) => (
            <div key={i} className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">{m.label}</p>
              <p className="text-xl font-black text-emerald-500">{m.total}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full p-4 text-center text-[var(--color-text-muted)] border border-dashed border-[var(--color-border)] rounded-2xl">
            No monthly data parsed
          </div>
        )}
      </div>

      {/* Daily Chart */}
      <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-sm">
        <h3 className="text-lg font-bold text-[var(--color-text)] mb-6">Daily Performance</h3>
        
        <div className="flex items-end gap-1 sm:gap-2 h-64 mt-4">
          {data.map((item, index) => {
            const heightPercent = (item.sold / maxSoldDaily) * 100;
            const d = parseDate(item.paid_at);
            const isValid = !isNaN(d.getTime());
            
            // Format: M/D (e.g. 3/18)
            const label = isValid ? `${d.getMonth() + 1}/${d.getDate()}` : "??";
            
            return (
              <div key={index} className="flex flex-col items-center flex-1 group h-full justify-end">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold mb-1 text-[var(--color-text)]">
                  {item.sold}
                </span>
                <div 
                  className="w-full bg-emerald-500 rounded-t-sm transition-all duration-300 group-hover:bg-emerald-400 group-hover:-translate-y-1"
                  style={{ height: `${heightPercent}%`, minHeight: "2px" }}
                ></div>
                <span className={`mt-3 text-[9px] font-medium whitespace-nowrap ${!isValid ? 'text-red-500' : 'text-[var(--color-text-muted)]'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}