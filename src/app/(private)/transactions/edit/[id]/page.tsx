import React from "react";
import TransactionForm from "../../_components/transaction-form";
import { createClient } from "@/config/supabase-server-config";
import { Alert } from "antd";

async function EditTransactionPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const supabaseServerConfig = await createClient();
  const userResponse = await supabaseServerConfig.auth.getUser();
  if (!userResponse) {
    return (
      <Alert
        message="You need to be logged in to view this page"
        type="error"
      />
    );
  }

  const transactionResponse = await supabaseServerConfig
    .from("transactions")
    .select("*")
    .eq("id", params.id)
    .single();
  if (transactionResponse.error) {
    return (
      <Alert
        message="An error occurred while fetching the transaction"
        type="error"
      />
    );
  }

  console.log(transactionResponse);

  const transaction = transactionResponse.data
  return (
    <div>
      <h1 className="text-xl font-bold">Edit Transaction</h1>
      <TransactionForm formType="edit" initialValues={transaction} />
    </div>
  );
}

export default EditTransactionPage;
