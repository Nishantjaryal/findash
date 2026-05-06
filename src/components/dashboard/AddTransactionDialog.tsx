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
    <div className={`fixed inset-0 z-50 flex gap-8 items-center justify-center ${!check?"bg-foreground/20":"bg-white"} backdrop-blur-sm`} onClick={check ?   undefined:onClose}>
      <div className={`${check?"flex":"hidden"} flex-col items-center gap-4  `}>
        <img src="/2.svg" alt="Add Transaction" width={200} height={200} className="mb-4" />
      </div>
      <div className="bg-card rounded-xl border border-border p-6 w-full max-w-md shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold">{!check ? "Add Transaction" : "Start Adding Transactions"}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
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
