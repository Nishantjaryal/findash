import { useFinance } from "@/context/FinanceContext";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const SummaryCards = () => {
  const { balance, totalIncome, totalExpenses } = useFinance();

  const cards = [
    { label: "Total Balance", value: fmt(balance), icon: Wallet, accent: "bg-primary/10 text-primary" },
    { label: "Income", value: fmt(totalIncome), icon: TrendingUp, accent: "bg-success/10 text-success" },
    { label: "Expenses", value: fmt(totalExpenses), icon: TrendingDown, accent: "bg-destructive/10 text-destructive" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl bg-card p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground font-medium">{c.label}</span>
            <div className={`p-2 rounded-lg ${c.accent}`}>
              <c.icon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold tracking-tight">{c.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
