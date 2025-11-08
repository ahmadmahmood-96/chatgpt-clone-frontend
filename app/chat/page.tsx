import { Metadata } from "next";
import ChatPage from "./Chat";

export const metadata: Metadata = {
  title: "Chat",
  description:
    "Talk to the ChatGPT clone to find the solutions for your problems",
};

export default function Login() {
  return <ChatPage />;
}
