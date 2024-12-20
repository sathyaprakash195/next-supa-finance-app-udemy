"use client";
import DashboardCard from "@/components/dashboard-card";
import React, { useEffect } from "react";
import TransactionsTable from "./transactions/_components/transactions-table";
import { message } from "antd";
import { getDashboardData } from "@/actions/transactions";
import Loader from "@/components/loader";

function Homepage() {
  const [lastFiveTransactions, setLastFiveTransactions] = React.useState([]);
  const [reportsData, setReportsData] = React.useState({
    totalDebitsTransactions: 0,
    totalCreditsTransactions: 0,
    totalDebitsAmount: 0,
    totalCreditsAmount: 0,
    balance: 0,
  });
  const [loading, setLoading] = React.useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response: any = await getDashboardData();
      if (response.error) {
        throw new Error(response.error.message);
      }
      setLastFiveTransactions(response.data.lastFiveTransactions);
      setReportsData(response.data.reportsData);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1 className="text-xl text-primary font-bold">Dashboard</h1>
      {loading && (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      )}
      {!loading && (
        <div>
          <div className="grid grid-cols-4 gap-5 mt-5">
            <DashboardCard
              title="Total Credits"
              value={reportsData.totalCreditsAmount}
              description={`Total Credits Transactions: ${reportsData.totalCreditsTransactions}`}
            />

            <DashboardCard
              title="Total Debits"
              value={reportsData.totalDebitsAmount}
              description={`Total Debits Transactions: ${reportsData.totalDebitsTransactions}`}
            />

            <DashboardCard
              title="Balance"
              value={reportsData.balance}
              description="Total Credits - Total Debits"
            />
          </div>

          <div className="mt-7">
            <h1 className="text-sm font-bold">Last 5 Transactions</h1>
            <TransactionsTable transactions={lastFiveTransactions} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
