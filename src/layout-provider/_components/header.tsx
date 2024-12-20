import { IUser } from "@/interfaces";
import { Menu } from "lucide-react";
import React from "react";
import Sidebar from "./sidebar";
import { useRouter } from "next/navigation";

function Header({ user }: { user: IUser }) {
  const [openSidebar = false, setOpenSidebar] = React.useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="p-5 bg-primary flex justify-between items-center">
      <h1
        className="text-xl font-bold text-white cursor-pointer"
        onClick={() => router.push("/")}
      >
        NextSupa F
      </h1>
      <div className="flex gap-5 items-center">
        <h1 className="text-sm text-white">{user.profile.name}</h1>
        <Menu
          className="text-white cursor-pointer"
          size={16}
          onClick={() => setOpenSidebar(true)}
        />
      </div>

      {openSidebar && (
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      )}
    </div>
  );
}

export default Header;
