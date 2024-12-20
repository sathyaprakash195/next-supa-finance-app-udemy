"use client";
import { resetUserPassword } from "@/actions/users";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

function ResetPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (values.password !== values.confirmPassword) {
        message.error("Password and Confirm Password must be the same");
        return;
      }
      const response = await resetUserPassword(code!, values.password);
      if (response.success) {
        message.success(response.message);
        form.resetFields();
        router.push("/");
      } else {
        message.error(response.message);
      }
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
          label="New Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input type="password" placeholder="New Password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
          ]}
        >
          <Input type="password" placeholder="Confirm Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Reset Password
        </Button>

        <div className="flex justify-end">
          <Link href="/auth/sign-in">Sign In</Link>
        </div>
      </Form>
    </div>
  );
}

export default ResetPasswordPage;
