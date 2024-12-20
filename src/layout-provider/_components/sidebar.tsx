import { Button, Drawer, message } from "antd";
import React from "react";
import { Home, User, Settings, List, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/config/supabase-browser-config";

function Sidebar({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const iconSize = 14;
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const menuItems = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      href: "/",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      href: "/profile",
    },
    {
      name: "Transactions",
      icon: <List size={iconSize} />,
      href: "/transactions",
    },
    {
      name: "Settings",
      icon: <Settings size={iconSize} />,
      href: "/settings",
    },
  ];

  const handleLogout = async () => {
    try {
      setLoading(true);
      const supabaseBrowserConfig = createClient();
      const { error } = await supabaseBrowserConfig.auth.signOut();
      if (error) {
        throw new Error(error.message);
      } else {
        message.success("Sign Out Success");
        router.push("/auth/sign-in");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={openSidebar}
      onClose={() => setOpenSidebar(false)}
      width={400}
    >
      <div className="flex flex-col gap-7 mt-10">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex gap-3 items-center p-2 cursor-pointer ${
              pathname === item.href
                ? "bg-gray-200 border-gray-500 border rounded-sm"
                : ""
            }`}
            onClick={() => {
              setOpenSidebar(false);
              router.push(item.href);
            }}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </div>
        ))}

        <Button type="primary" loading={loading} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Drawer>
  );
}

export default Sidebar;
