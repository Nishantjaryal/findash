import { monthlyData } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BalanceChart = () => (
  <div className="rounded-xl bg-card p-5 border border-border">
    <h3 className="text-sm font-semibold mb-4">Balance Trend</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyData}>
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
  </div>
);

export default BalanceChart;
