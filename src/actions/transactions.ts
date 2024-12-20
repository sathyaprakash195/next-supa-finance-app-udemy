"use server";

import { createClient } from "@/config/supabase-server-config";

export const getDashboardData = async () => {
  try {
    let response: any = {};

    const supabaseServerConfig = await createClient();
    const userResponse = await supabaseServerConfig.auth.getUser();
    if (userResponse.error) {
      throw new Error(userResponse.error.message);
    }
    const lastFiveTransactionsResponse = await supabaseServerConfig
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (lastFiveTransactionsResponse.error) {
      throw new Error(lastFiveTransactionsResponse.error.message);
    }

    response.lastFiveTransactions = lastFiveTransactionsResponse.data;

    // prepare reports data

    const [totalCreditsTransactionsResponse, totalDebitsTransactionsResponse] =
      await Promise.all([
        supabaseServerConfig
          .from("transactions")
          .select("amount")
          .eq("type", "income")
          .eq("user_id", userResponse.data.user.id),
        supabaseServerConfig
          .from("transactions")
          .select("amount")
          .eq("type", "expense")
          .eq("user_id", userResponse.data.user.id),
      ]);

    if (totalCreditsTransactionsResponse.error) {
      throw new Error(totalCreditsTransactionsResponse.error.message);
    }

    if (totalDebitsTransactionsResponse.error) {
      throw new Error(totalDebitsTransactionsResponse.error.message);
    }

    const totalCreditsAmount = totalCreditsTransactionsResponse.data.reduce(
      (acc: number, transaction: any) => acc + transaction.amount,
      0
    );

    const totalDebitsAmount = totalDebitsTransactionsResponse.data.reduce(
      (acc: number, transaction: any) => acc + transaction.amount,
      0
    );

    const balance = totalCreditsAmount - totalDebitsAmount;

    response.reportsData = {
      totalDebitsTransactions: totalDebitsTransactionsResponse.data.length,
      totalCreditsTransactions: totalCreditsTransactionsResponse.data.length,
      totalDebitsAmount,
      totalCreditsAmount,
      balance,
    };

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
