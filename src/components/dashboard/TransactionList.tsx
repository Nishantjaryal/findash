import { useFinance } from "@/context/FinanceContext";
import { Category, TransactionType } from "@/data/mockData";
import { Search, ArrowUpDown, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AddTransactionDialog from "./AddTransactionDialog";

const categories: Category[] = ["Salary", "Freelance", "Food", "Transport", "Shopping", "Entertainment", "Bills", "Health", "Education", "Investment"];

const TransactionList = () => {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useFinance();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="rounded-xl bg-card border border-border">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Transactions</h3>
          {role === "admin" && (
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <select
            value={filters.type}
            onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value as TransactionType | "all" }))}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value as Category | "all" }))}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            onClick={() => setFilters((f) => ({ ...f, sortOrder: f.sortOrder === "asc" ? "desc" : "asc" }))}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background hover:bg-muted transition-colors"
          >
            <ArrowUpDown className="h-3 w-3" />
            {filters.sortOrder === "asc" ? "Oldest" : "Newest"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredTransactions.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">No transactions found.</div>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Description</th>
                <th className="text-left px-5 py-3 font-medium">Category</th>
                <th className="text-right px-5 py-3 font-medium">Amount</th>
                {role === "admin" && <th className="px-5 py-3 w-10" />}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3 text-muted-foreground">{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                  <td className="px-5 py-3 font-medium">{t.description}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">{t.category}</span>
                  </td>
                  <td className={`px-5 py-3 text-right font-semibold ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                    {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                  </td>
                  {role === "admin" && (
                    <td className="px-5 py-3">
                      <button onClick={() => deleteTransaction(t.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showAdd && <AddTransactionDialog onClose={() => setShowAdd(false)} />}
    </div>
  );
};

export default TransactionList;
