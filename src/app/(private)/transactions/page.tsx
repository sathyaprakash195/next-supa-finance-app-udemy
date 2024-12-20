import { createClient } from "@/config/supabase-server-config";
import { Alert, Button } from "antd";
import Link from "next/link";
import React from "react";
import TransactionsTable from "./_components/transactions-table";

async function TransactionsPage() {
  const supabaseServerConfig = await createClient();
  const userResponse = await supabaseServerConfig.auth.getUser();
  if (userResponse.error) {
    return (
      <Alert
        message="You need to be logged in to view this page"
        type="error"
        showIcon
      />
    );
  }

  const transactionsResponse = await supabaseServerConfig
    .from("transactions")
    .select("*")
    .eq("user_id", userResponse.data.user.id);

  if(transactionsResponse.error) {
    return (
      <Alert
        message="An error occurred while fetching transactions"
        type="error"
        showIcon
      />
    );
  }

  const transactions = transactionsResponse.data;


  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Transactions</h1>
        <Button type="primary">
          <Link href="/transactions/new" className="no-underline">
            New Transaction
          </Link>
        </Button>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
}

export default TransactionsPage;
