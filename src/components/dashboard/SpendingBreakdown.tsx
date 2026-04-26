import { useFinance } from "@/context/FinanceContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";

const COLORS = [
  "hsl(220, 70%, 50%)",
  "hsl(150, 60%, 40%)",
  "hsl(0, 70%, 55%)",
  "hsl(40, 90%, 50%)",
  "hsl(280, 60%, 55%)",
  "hsl(130, 60%, 55%)",
  "hsl(240, 80%, 55%)",
  "hsl(80, 20%, 55%)",
  "hsl(180, 50%, 45%)",
  "hsl(330, 60%, 50%)",
  "hsl(30, 70%, 50%)",
];

const SpendingBreakdown = () => {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => map.set(t.category, (map.get(t.category) || 0) + t.amount));
    return Array.from(map, ([category, value]) => ({ category, value })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="rounded-xl bg-card p-5 border border-border">
      <h3 className="text-sm font-semibold mb-4">Spending Breakdown</h3>
      <div className="h-64 flex items-center">
        <ResponsiveContainer width="50%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,15%,90%)", fontSize: 13 }}
              formatter={(val: number, name: string) => [`$${val.toFixed(2)}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2 pl-2">
          {data.map((d, i) => (
            <div key={d.category} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
              <span className="text-muted-foreground truncate">{d.category}</span>
              <span className="ml-auto font-medium">${d.value.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
