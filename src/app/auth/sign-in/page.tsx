"use client";
import { createClient } from "@/config/supabase-browser-config";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function SignInPage() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();


  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { email, password } = values;
      const supabseBrowserConfig = createClient();
      const { data, error } = await supabseBrowserConfig.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        message.success("Sign In Success");
        router.push("/");
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
      >
        <div>
          <h1 className="text-xl font-bold uppercase">Sign In</h1>
          <div className="flex gap-5 text-sm">
            Dont have an account ? <Link href="/auth/sign-up">Sign Up</Link>
          </div>
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
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Sign In
        </Button>

        <div className="flex justify-end text-sm">
          <Link href="/auth/forgot-password">Forgot Password</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignInPage;
