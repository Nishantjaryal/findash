import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BalanceChart = () => {
  const { transactions } = useFinance();

  const monthWiseTransactiondata = useMemo(() => {
    if (!transactions.length) {
      return [];
    }

    const groupedByMonth = new Map<
      string,
      { date: Date; income: number; expenses: number }
    >();

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const key = `${date.getFullYear()}-${date.getMonth()}`;

      const current = groupedByMonth.get(key) ?? {
        date: monthStart,
        income: 0,
        expenses: 0,
      };

      if (transaction.type === "income") {
        current.income += transaction.amount;
      } else {
        current.expenses += transaction.amount;
      }

      groupedByMonth.set(key, current);
    });

    return Array.from(groupedByMonth.values())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((entry) => ({
        month: entry.date.toLocaleString("en-US", { month: "short" }),
        income: Number(entry.income.toFixed(2)),
        expenses: Number(entry.expenses.toFixed(2)),
        balance: Number((entry.income - entry.expenses).toFixed(2)),
      }));
  }, [transactions]);


  return (

  <div className="rounded-xl bg-card p-5 border border-border">
    <h3 className="text-sm font-semibold mb-4">Balance Trend</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthWiseTransactiondata}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,15%,90%)", fontSize: 13 }}
            formatter={(val: number) => [`$${val.toLocaleString()}`, ""]}
          />
          <Area type="monotone" dataKey="balance" stroke="hsl(220, 70%, 50%)" fill="url(#balGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>)
};

export default BalanceChart;
