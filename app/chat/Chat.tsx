"use client";
import { useEffect, useState } from "react";
import { message as antdMessage, Avatar } from "antd";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { Send } from "lucide-react";
import Image from "next/image";
import client from "@/utils/axios";
import { UserOutlined } from "@ant-design/icons";
import { TypingIndicator } from "../components/TypingIndicator";
import { Sidebar } from "../components/Sidebar/Sidebar";
import Loader from "../components/Loader"; // ✅ Import your Loader

type Thread = {
  id: string;
  title: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ Loader state

  // Automatically collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch threads from backend
  useEffect(() => {
    if (!user) return;
    console.log("data", user.id);
    const fetchThreads = async () => {
      try {
        const res = await client.get(`/chat/threads?userId=${user.id}`);
        setThreads(res.data.threads || []);
      } catch (err: any) {
        console.error(err);
        antdMessage.error(
          err.response?.data?.error || "Failed to fetch threads"
        );
      }
    };

    fetchThreads();
  }, [user]);

  // Fetch messages from backend
  useEffect(() => {
    if (!selectedThread) return;

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const res = await client.get(
          `/chat/messages?threadId=${selectedThread.id}`
        );
        setChat(res.data.messages || []);
      } catch (err: any) {
        console.error(err);
        antdMessage.error(
          err.response?.data?.error || "Failed to fetch messages"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [selectedThread]);

  // Handle sending message
  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || !user) return;

    const userMessage = message.trim();
    setMessage("");
    setIsTyping(true);

    try {
      const res = await client.post(`/chat/send`, {
        userId: user.id,
        content: userMessage,
        threadId: selectedThread?.id,
      });

      const { reply, threadId } = res.data;

      // If no thread was selected, set the thread now
      if (!selectedThread) {
        const newThread = {
          id: threadId,
          title: userMessage.slice(0, 50),
        };
        setSelectedThread(newThread);
        setThreads((prev) => [newThread, ...prev]);
      }

      // Add both user + assistant messages locally
      setChat((prev) => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      console.error(err);
      antdMessage.error("Error sending message.");
    } finally {
      setIsTyping(false);
    }
  };

  // Shared input box JSX
  const ChatInput = (
    <form onSubmit={sendMessage} className="w-full flex justify-center">
      <div className="relative w-full min-w-2xl">
        <input
          type="text"
          placeholder="Ask Something..."
          className="w-full p-2 sm:p-2 lg:p-3 pr-12 rounded-3xl bg-[#171717] border border-fieldBorder focus:outline-none focus:border-gray-800 transition-colors"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-400"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-primaryBackground text-white">
        {/* Sidebar */}
        <Sidebar
          threads={threads}
          selectedThread={selectedThread}
          setSelectedThread={setSelectedThread}
          setChat={setChat}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          setSelectedThreadReset={setMessage}
          user={user}
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Loader overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <Loader />
            </div>
          )}

          {/* Chat Display Area */}
          <div
            className={`flex-1 overflow-y-auto p-6 w-full ${
              !selectedThread && chat.length === 0
                ? "flex flex-col items-center justify-center"
                : ""
            }`}
          >
            {/* No Chat Selected */}
            {chat.length === 0 ? (
              <>
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative w-32 h-32">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p className="text-gray-400 text-lg text-center">
                    Start a new chat or select a thread
                  </p>
                </div>

                {/* Input box centered under logo */}
                <div className="mt-8 sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[700px] max-w-full">
                  {ChatInput}
                </div>
              </>
            ) : (
              <>
                {/* Chat Messages */}
                <div className="w-full max-w-3xl mx-auto mb-24 space-y-4">
                  {chat.map((msg, i) => {
                    const isUser = msg.role === "user";
                    return (
                      <div key={i} className="flex items-start gap-3">
                        {/* Avatar */}
                        {isUser ? (
                          <Avatar
                            icon={<UserOutlined />}
                            size={40}
                            className="flex-shrink-0 bg-[#2A2A2A]"
                          />
                        ) : (
                          <div className="relative ml-2 w-6 h-6 flex-shrink-0">
                            <Image
                              src="/logo.png"
                              alt="Bot"
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                        )}

                        {/* Message bubble */}
                        <div
                          className={`px-3 py-1 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                            isUser
                              ? "bg-[#2A2A2A] text-gray-200"
                              : "bg-transparent"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src="/logo.png"
                          alt="Bot"
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                      <TypingIndicator />
                    </div>
                  )}
                </div>

                {/* Input fixed at bottom when chat active */}
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[700px] max-w-[90%]">
                  {ChatInput}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
