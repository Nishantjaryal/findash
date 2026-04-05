export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Bills"
  | "Health"
  | "Education"
  | "Investment";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export const transactions: Transaction[] = [
  { id: "1", date: "2025-04-01", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: "2", date: "2025-04-02", description: "Grocery Store", amount: 87.50, type: "expense", category: "Food" },
  { id: "3", date: "2025-04-03", description: "Uber Ride", amount: 24.00, type: "expense", category: "Transport" },
  { id: "4", date: "2025-04-04", description: "Netflix Subscription", amount: 15.99, type: "expense", category: "Entertainment" },
  { id: "5", date: "2025-04-05", description: "Freelance Project", amount: 800, type: "income", category: "Freelance" },
  { id: "6", date: "2025-04-06", description: "Electric Bill", amount: 120, type: "expense", category: "Bills" },
  { id: "7", date: "2025-04-07", description: "New Shoes", amount: 95, type: "expense", category: "Shopping" },
  { id: "8", date: "2025-04-08", description: "Dentist Visit", amount: 200, type: "expense", category: "Health" },
  { id: "9", date: "2025-04-09", description: "Online Course", amount: 49.99, type: "expense", category: "Education" },
  { id: "10", date: "2025-04-10", description: "Restaurant Dinner", amount: 65, type: "expense", category: "Food" },
  { id: "11", date: "2025-04-11", description: "Stock Dividend", amount: 150, type: "income", category: "Investment" },
  { id: "12", date: "2025-04-12", description: "Gas Station", amount: 45, type: "expense", category: "Transport" },
  { id: "13", date: "2025-04-13", description: "Phone Bill", amount: 55, type: "expense", category: "Bills" },
  { id: "14", date: "2025-04-14", description: "Coffee Shop", amount: 12.50, type: "expense", category: "Food" },
  { id: "15", date: "2025-04-15", description: "Freelance Consulting", amount: 450, type: "income", category: "Freelance" },
  { id: "16", date: "2025-03-01", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: "17", date: "2025-03-05", description: "Grocery Store", amount: 110, type: "expense", category: "Food" },
  { id: "18", date: "2025-03-10", description: "Internet Bill", amount: 65, type: "expense", category: "Bills" },
  { id: "19", date: "2025-03-15", description: "Gym Membership", amount: 40, type: "expense", category: "Health" },
  { id: "20", date: "2025-03-20", description: "Movie Tickets", amount: 30, type: "expense", category: "Entertainment" },
  { id: "21", date: "2025-03-25", description: "Freelance Work", amount: 600, type: "income", category: "Freelance" },
  { id: "22", date: "2025-02-01", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: "23", date: "2025-02-10", description: "Winter Jacket", amount: 180, type: "expense", category: "Shopping" },
  { id: "24", date: "2025-02-14", description: "Valentine Dinner", amount: 95, type: "expense", category: "Food" },
  { id: "25", date: "2025-02-20", description: "Car Insurance", amount: 210, type: "expense", category: "Bills" },
];

export const monthlyData = [
  { month: "Jan", income: 5200, expenses: 3100, balance: 2100 },
  { month: "Feb", income: 5200, expenses: 3485, balance: 1715 },
  { month: "Mar", income: 5800, expenses: 2945, balance: 2855 },
  { month: "Apr", income: 6600, expenses: 769.98, balance: 5830.02 },
];
