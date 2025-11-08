import { Metadata } from "next";
import RegisterPage from "./Register";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register to the ChatGPT clone to find the solutions for your problems",
};

export default function Login() {
  return <RegisterPage />;
}
