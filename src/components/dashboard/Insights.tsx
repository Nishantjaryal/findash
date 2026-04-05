import { useFinance } from "@/context/FinanceContext";
import { useMemo } from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const Insights = () => {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const catMap = new Map<string, number>();
    expenses.forEach((t) => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
    const topCategory = [...catMap.entries()].sort((a, b) => b[1] - a[1])[0];

    // Monthly comparison (Mar vs Apr)
    const aprExpenses = expenses.filter((t) => t.date.startsWith("2025-04")).reduce((s, t) => s + t.amount, 0);
    const marExpenses = expenses.filter((t) => t.date.startsWith("2025-03")).reduce((s, t) => s + t.amount, 0);
    const change = marExpenses > 0 ? ((aprExpenses - marExpenses) / marExpenses) * 100 : 0;

    const avgTransaction = expenses.length > 0 ? expenses.reduce((s, t) => s + t.amount, 0) / expenses.length : 0;

    return [
      {
        icon: TrendingUp,
        title: "Top Spending Category",
        value: topCategory ? `${topCategory[0]} — $${topCategory[1].toFixed(0)}` : "N/A",
        accent: "text-destructive",
      },
      {
        icon: change <= 0 ? TrendingDown : TrendingUp,
        title: "Monthly Change (Mar → Apr)",
        value: `${change > 0 ? "+" : ""}${change.toFixed(1)}% spending`,
        accent: change <= 0 ? "text-success" : "text-destructive",
      },
      {
        icon: BarChart3,
        title: "Avg. Expense",
        value: `$${avgTransaction.toFixed(2)}`,
        accent: "text-primary",
      },
    ];
  }, [transactions]);

  return (
    <div className="rounded-xl bg-card p-5 border border-border">
      <h3 className="text-sm font-semibold mb-4">Insights</h3>
      <div className="space-y-4">
        {insights.map((ins) => (
          <div key={ins.title} className="flex items-start gap-3">
            <ins.icon className={`h-4 w-4 mt-0.5 ${ins.accent}`} />
            <div>
              <p className="text-xs text-muted-foreground">{ins.title}</p>
              <p className="text-sm font-semibold">{ins.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
