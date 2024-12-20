import React, { useEffect } from "react";
import Header from "./_components/header";
import { getLoggedInUser } from "@/actions/users";
import { IUser } from "@/interfaces";
import { Alert } from "antd";
import Loader from "@/components/loader";

function Private({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response: any = await getLoggedInUser();
      if (response.success) {
        setUser(response.data);
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div>
      <Header user={user!} />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default Private;
