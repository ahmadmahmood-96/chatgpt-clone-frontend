import { Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { LogOutIcon } from "lucide-react";
import { SidebarButton } from "./SidebarButton";
import { useState } from "react";
import Loader from "../Loader";

export const SidebarFooter = ({ user, sidebarCollapsed }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true); // show loader
      //   Logout from Supabase
      await supabase.auth.signOut();

      //   Redirect to login page
      router.push("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div
      className={`mt-auto pt-4 border-t border-gray-700 flex flex-col items-start ${
        sidebarCollapsed ? "justify-center" : "justify-start gap-3"
      }`}
    >
      {/* Logout button */}
      {!sidebarCollapsed && (
        <SidebarButton
          icon={LogOutIcon}
          label={loading ? "Logging out..." : "Logout"}
          onClick={handleLogout}
        />
      )}

      {/* Avatar + Name + Email */}
      <div className="flex items-center gap-3">
        <Avatar
          size={30}
          icon={<UserOutlined />}
          className="bg-[#2A2A2A] flex-shrink-0"
        />
        {!sidebarCollapsed && (
          <div className="flex flex-col text-sm text-gray-300 truncate">
            <span className="font-medium text-white truncate text-ellipsis">
              {user?.user_metadata?.full_name || "User"}
            </span>
            <span className="text-gray-400 text-xs truncate">
              {user?.email || "example@email.com"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
