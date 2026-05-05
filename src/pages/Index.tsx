import { FinanceProvider } from "@/context/FinanceContext";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceChart from "@/components/dashboard/BalanceChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import TransactionList from "@/components/dashboard/TransactionList";
import Insights from "@/components/dashboard/Insights";
import RoleToggle from "@/components/dashboard/RoleToggle";
import ChatComponent from "@/components/chat/ChatComponent";

const Index = () => (
  <FinanceProvider>
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Finance Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Track your income, expenses, and insights.
            </p>
          </div>
          <RoleToggle />
        </div>

        <div className="flex w-full gap-4">
          <div className="w-full">
            {/* Summary */}
            <SummaryCards />

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <BalanceChart />
              <SpendingBreakdown />
            </div>
          </div>
          <ChatComponent />
        </div>

        {/* Insights */}
        <div className="mt-4">
          <Insights />
        </div>

        {/* Transactions */}
        <div className="mt-4">
          <TransactionList />
        </div>
      </div>
    </div>
  </FinanceProvider>
);

export default Index;
