import { Metadata } from "next";
import LoginPage from "./Login";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to the ChatGPT clone to find the solutions for your problems",
};

export default function Login() {
  return <LoginPage />;
}
