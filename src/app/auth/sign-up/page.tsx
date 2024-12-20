"use client";
import supabaseDBConfig from "@/config/supabase-db-config";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import React from "react";

function SignUpPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabaseDBConfig.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verification`,
        },
      });

      if (error) {
        throw new Error(error.message);
      } else {
        // insert the user data into user_profiles table

        const response = await supabaseDBConfig.from("user_profiles").insert([
          {
            id: data?.user?.id,
            name: values.name,
            profile_pic: null,
          },
        ]);

        if (response.error) {
          throw new Error(response.error.message);
        }

        message.success("Signup successful. Please verify your email.");
        form.resetFields();
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
          <h1 className="text-xl font-bold uppercase">Sign Up</h1>
          <div className="flex gap-5 text-sm">
            Already have an account ? <Link href="/auth/sign-in">Sign In</Link>
          </div>
        </div>

        <hr />

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

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
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default SignUpPage;
