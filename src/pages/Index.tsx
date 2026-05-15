import { FinanceProvider } from "@/context/FinanceContext";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceChart from "@/components/dashboard/BalanceChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import TransactionList from "@/components/dashboard/TransactionList";
import Insights from "@/components/dashboard/Insights";
import RoleToggle from "@/components/dashboard/RoleToggle";
import ChatComponent from "@/components/chat/ChatComponent";
import FirstTransaction from "@/components/dashboard/FirstTransaction";
import { useState } from "react";

const Index = () => {
  const [check, setCheck] = useState(
    JSON.parse(localStorage.getItem("transactions_data") || "[]").length === 0,
  );

  if (check) {
    return (
      <FinanceProvider>
        <div id="topelement" className="min-h-screen bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <FirstTransaction isChecked={setCheck} />
          </div>
        </div>
      </FinanceProvider>
    );
  }

  return (
    <FinanceProvider>
      <div id="topelement" className="min-h-screen bg-background">
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

          <div className="flex w-full max-lg:flex-col gap-4">
            <div className="w-full">
              {/* Summary */}
              <SummaryCards />

              {/* Charts row */}
              <div className="flex flex-col max-sm:flex-col-reverse lg:flex-row gap-4 mt-4">
                <BalanceChart />
                <SpendingBreakdown />
              </div>
            </div>
            <ChatComponent />
          </div>
          {/* Transactions */}
          <div className="mt-4">
            <TransactionList />
          </div>
          {/* Insights */}
          <div className="mt-4 mb-8">
            <Insights />
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Index;
