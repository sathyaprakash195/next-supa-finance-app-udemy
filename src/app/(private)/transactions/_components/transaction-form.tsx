"use client";
import { createClient } from "@/config/supabase-browser-config";
import {
  transactionTypes,
  incomeCategories,
  expenseCategories,
} from "@/constants";
import { Input, Select, Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function TransactionForm({
  formType = "new",
  initialValues = null,
}: {
  formType?: string;
  initialValues?: any;
}) {
  const [transactionType, setTransactionType] = React.useState(
    initialValues?.type || ""
  );
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const supabaseBrowserConfig = createClient();
      const userResponse = await supabaseBrowserConfig.auth.getUser();
      if (userResponse.error) {
        throw new Error(userResponse.error.message);
      }

      if (formType === "new") {
        const transactionResponse = await supabaseBrowserConfig
          .from("transactions")
          .insert({
            ...values,
            user_id: userResponse.data.user.id,
          })
          .single();
        if (transactionResponse.error) {
          throw new Error(transactionResponse.error.message);
        }
        message.success("Transaction created successfully!");
      } else {
        const transactionResponse = await supabaseBrowserConfig
          .from("transactions")
          .update({ ...values })
          .eq("id", initialValues.id)
          .single();
        if (transactionResponse.error) {
          throw new Error(transactionResponse.error.message);
        }
        message.success("Transaction updated successfully!");
      }

      router.push("/transactions");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <Form
        layout="vertical"
        className="grid grid-cols-4 gap-5"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Type"
          className="col-span-1"
          name="type"
          rules={[{ required: true, message: "Please select a type!" }]}
        >
          <Select
            options={transactionTypes}
            onChange={(value) => setTransactionType(value)}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          className="col-span-1"
          name="date"
          rules={[{ required: true, message: "Please select a date!" }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          label="Amount"
          className="col-span-1"
          name="amount"
          rules={[{ required: true, message: "Please input an amount!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Category"
          className="col-span-1"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            options={
              transactionType === "income"
                ? incomeCategories
                : expenseCategories
            }
          />
        </Form.Item>

        <Form.Item label="Notes" className="col-span-4" name="notes">
          <Input.TextArea />
        </Form.Item>

        <div className="flex justify-end gap-5 col-span-4">
          <Button type="default" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default TransactionForm;
