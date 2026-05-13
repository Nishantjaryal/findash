import { useFinance } from "@/context/FinanceContext";
import { useState } from "react";
import { X } from "lucide-react";

const categories: string[] = ["Salary", "Freelance", "Food", "Transport", "Shopping", "Entertainment", "Bills", "Health", "Education", "Investment"];

const AddTransactionDialog = ({ onClose }: { onClose: () => void }) => {
  const { addTransaction } = useFinance();
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense" as "income" | "expense",
    category: "Food" as string,
    date: new Date().toISOString().slice(0, 10),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    addTransaction({
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    });
    onClose();
  };

  const check = JSON.parse(localStorage.getItem("transactions_data") || "[]").length === 0;

  const inputClass = "w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-ring";
  
  return (
    <div className={`fixed inset-0 z-50 flex flex-row max-lg:flex-col items-center justify-center gap-8 ${!check?"bg-foreground/20":"bg-gradient-to-r from-blue-500/50 to-pink-200/50 "} backdrop-blur-sm `} onClick={check ?   undefined:onClose}>
      
      <div className={`${check?"flex min-h-[400px] ":"hidden"} flex-col items-start justify-between gap-5 bg-card/95 rounded-2xl border border-border/70 p-7 w-[90%] max-w-md shadow-[0_20px_60px_-30px_rgba(16,24,40,0.45)]`}>
        <div className="flex w-full items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-foreground/60">GET STARTED</span>
          <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground">First entry</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold leading-tight text-foreground">FinDash</h2>
          <p className="text-sm text-muted-foreground">
            Add one purchase or income to unlock your personal Ai Powred dashboard insights.
          </p>
        </div>
        <div className="w-full rounded-xl border border-dashed border-border/70 bg-background p-4">
          <div className="flex items-center gap-4">
            <img src="/2.svg" alt="Add Transaction" className="max-h-[120px] w-auto" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Try a quick entry</p>
              <p className="text-xs text-muted-foreground">Example: Coffee - 80 - Food</p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <span>Tip: Data stored locally</span>
          <span>Press enter to save.</span>
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border p-6 w-[90%] min-h-[400px] max-w-md shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold">{!check ? "Add Transaction" : "Start Adding Transactions"}</h3>
          <button onClick={onClose} className={`${!check ? "":"hidden"} text-muted-foreground hover:text-foreground`}><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inputClass} required />
          <input type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} className={inputClass} required />
          <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className={inputClass} />
          <div className="flex gap-2">
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "income" | "expense" }))} className={inputClass}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as string }))} className={inputClass}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionDialog;
