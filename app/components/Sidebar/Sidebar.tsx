import Image from "next/image";
import {
  MessageCircleMore,
  Orbit,
  PanelLeft,
  PanelRight,
  SquarePlus,
  Waypoints,
} from "lucide-react";
import { SidebarButton } from "./SidebarButton";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SidebarFooter } from "./SidebarFooter";

type Thread = {
  id: string;
  title: string;
};

export const Sidebar = ({
  threads,
  selectedThread,
  setSelectedThread,
  setChat,
  sidebarCollapsed,
  setSidebarCollapsed,
  setSelectedThreadReset,
  user, // ✅ receive user as prop
}: any) => {
  return (
    <div
      className={`bg-[#171717] border-r border-gray-700 p-4 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Collapse button + logo */}
      <div className="flex items-center justify-between mb-6">
        {!sidebarCollapsed && (
          <div className="relative w-4 h-4">
            <Image
              src="/chat-logo.png"
              alt="Chat Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <PanelRight /> : <PanelLeft />}
        </button>
      </div>

      {/* Quick action buttons */}
      <SidebarButton
        icon={SquarePlus}
        label="New Chat"
        onClick={() => {
          setSelectedThread(null);
          setChat([]);
          setSelectedThreadReset("");
        }}
        collapsed={sidebarCollapsed}
      />
      <SidebarButton
        icon={Waypoints}
        label="Quick Action"
        collapsed={sidebarCollapsed}
      />
      <SidebarButton icon={Orbit} label="Spaces" collapsed={sidebarCollapsed} />
      <SidebarButton
        icon={MessageCircleMore}
        label="Chat History"
        collapsed={sidebarCollapsed}
      />

      {/* Threads list */}
      <div className="flex-1 overflow-y-auto mt-2">
        {threads.map((thread: Thread) => (
          <div
            key={thread.id}
            onClick={() => setSelectedThread(thread)}
            className={`p-2 rounded-lg font-light cursor-pointer mb-1 text-[#9C9C9C] truncate ${
              selectedThread?.id === thread.id
                ? "bg-[#525252] text-white"
                : "hover:bg-gray-700"
            }`}
            title={thread.title}
          >
            {!sidebarCollapsed ? thread.title : thread.title[0]}
          </div>
        ))}
      </div>

      {/* ✅ User Info Section */}
      <SidebarFooter user={user} sidebarCollapsed={sidebarCollapsed} />
    </div>
  );
};
