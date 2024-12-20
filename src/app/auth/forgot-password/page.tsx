"use client";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { createClient } from "@/config/supabase-browser-config";

function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const supabaseBrowserConfig = createClient();
      const { data, error } =
        await supabaseBrowserConfig.auth.resetPasswordForEmail(values.email, {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
        });
      if (error) {
        throw new Error(error.message);
      }
      message.success("Reset password link sent to your email");
      form.resetFields();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center auth-parent h-screen">
      <Form
        className="bg-white p-5 flex flex-col gap-5 w-[400px]"
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <div>
          <h1 className="text-xl font-bold uppercase">Forgot Password</h1>
        </div>

        <hr />

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input valid email!" },
          ]}
        >
          <Input placeholder="Enter your email to get the reset password link" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Send Reset Link
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPasswordPage;
