export type TransactionType = "income" | "expense";

export const categories = [
  "Salary",
  "Freelance",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Investment",
] as const;

export type Category = (typeof categories)[number];

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string; // yyyy-mm-dd
}

// export const transactions: Transaction[] = [
//   { id: "1", description: "Salary", amount: 50000, type: "income", category: "Salary", date: "2025-03-01" },
//   { id: "2", description: "Groceries", amount: 2450, type: "expense", category: "Food", date: "2025-03-05" },
//   { id: "3", description: "Metro pass", amount: 1200, type: "expense", category: "Transport", date: "2025-03-08" },
//   { id: "4", description: "Freelance design", amount: 12000, type: "income", category: "Freelance", date: "2025-03-12" },
//   { id: "5", description: "Movie night", amount: 800, type: "expense", category: "Entertainment", date: "2025-03-16" },
//   { id: "6", description: "Shopping", amount: 3200, type: "expense", category: "Shopping", date: "2025-03-19" },
//   { id: "7", description: "Electricity bill", amount: 2100, type: "expense", category: "Bills", date: "2025-03-25" },
//   { id: "8", description: "Investment SIP", amount: 5000, type: "expense", category: "Investment", date: "2025-03-28" },
//   { id: "9", description: "Salary", amount: 50000, type: "income", category: "Salary", date: "2025-04-01" },
//   { id: "10", description: "Pharmacy", amount: 950, type: "expense", category: "Health", date: "2025-04-04" },
//   { id: "11", description: "Dining out", amount: 1800, type: "expense", category: "Food", date: "2025-04-10" },
//   { id: "12", description: "Online course", amount: 3000, type: "expense", category: "Education", date: "2025-04-12" },
//   { id: "13", description: "Freelance dev", amount: 15000, type: "income", category: "Freelance", date: "2025-04-18" },
//   { id: "14", description: "Fuel", amount: 1400, type: "expense", category: "Transport", date: "2025-04-22" },
//   { id: "15", description: "Streaming", amount: 499, type: "expense", category: "Entertainment", date: "2025-04-26" },
// ];
