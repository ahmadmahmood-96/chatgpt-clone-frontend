"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Divider, message, Spin } from "antd";
import { supabase } from "@/utils/supabaseClient";
import LoginPageWrapper from "../components/PageWrapper";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Signing in using the Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      message.error(error.message || "Please enter correct email or password");
    } else {
      message.success("Logged in successfully!");
      router.push("/chat");
    }
    setLoading(false); // hide loader
  };

  return (
    <LoginPageWrapper>
      <div className="flex min-h-screen bg-primaryBackground text-white">
        {/* Left side - Logo + text + Login form */}
        <div className="w-1/2 flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative w-20 h-20">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <h2 className="text-2xl font-bold">Turing Tech Test</h2>
          </div>

          <form
            onSubmit={handleLogin}
            className="p-8 bg-primaryBackground border border-gray-600 rounded-2xl w-[454px] flex flex-col justify-center space-y-4"
          >
            <h1 className="text-lg font-extrabold mb-4 text-center">
              Login to TuringTech Test
            </h1>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 pl-3 rounded bg-fieldBg border border-fieldBorder focus:outline-none focus:border-gray-800 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 pl-3 rounded bg-fieldBg border border-fieldBorder focus:outline-none focus:border-gray-800 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full p-2 text-primaryText bg-buttonColor rounded hover:bg-buttonHover transition-colors flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Spin size="small" /> : "Login"}
            </button>

            <Divider style={{ borderColor: "#525252" }}>
              <span className="text-white font-light">Or</span>
            </Divider>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
              >
                <div className="relative w-5 h-5 mr-2">
                  <Image
                    src="/google-logo.png"
                    alt="Google"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                Continue with Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
              >
                <div className="relative w-5 h-5 mr-2">
                  <Image
                    src="/apple-logo.png"
                    alt="Apple"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                Continue with Apple
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-2 text-center">
              Or{" "}
              <a href="/register" className="text-[#EDB527]">
                click here to sign up
              </a>{" "}
              and get started
            </p>
          </form>
        </div>

        {/* Right side - Large logo */}
        <div className="w-1/2 flex items-center justify-center bg-gray-800">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </LoginPageWrapper>
  );
}
