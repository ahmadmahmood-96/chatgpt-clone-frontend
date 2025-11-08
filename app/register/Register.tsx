"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Divider, message, Checkbox, Spin } from "antd";
import { supabase } from "@/utils/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false); // checkbox state
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      message.error("You must accept the terms and conditions to continue.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      message.error(error.message);
    } else {
      message.success(
        "Account created successfully! Please check your email to verify."
      );
      router.push("/login"); // redirect to login page
    }
  };

  return (
    <div className="flex min-h-screen bg-primaryBackground text-white">
      {/* Left side - Logo + text + Register form */}
      <div className="w-1/2 flex flex-col items-center justify-center space-y-6">
        {/* Logo and text side by side */}
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

        {/* Register form */}
        <form
          onSubmit={handleSignup}
          className="p-8 bg-primaryBackground border border-gray-600 rounded-2xl w-[454px] flex flex-col justify-center space-y-4"
        >
          <h1 className="text-lg font-extrabold mb-4 text-center">
            Unlock your edge with TuringTech Test
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 pl-3 rounded bg-fieldBg border border-fieldBorder focus:outline-none focus:border-[#EDB527] transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 pl-3 rounded bg-fieldBg border border-fieldBorder focus:outline-none focus:border-[#EDB527] transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Terms & conditions checkbox */}
          <div className="flex items-center">
            <Checkbox
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span className="ml-2 text-gray-400 text-sm">
              I accept the{" "}
              <a href="/terms" className="text-[#EDB527]">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-[#EDB527]">
                Privacy Policy
              </a>
            </span>
          </div>

          <button
            type="submit"
            disabled={!acceptedTerms || loading || !email || !password}
            className={`w-full p-2 text-primaryText bg-buttonColor rounded transition-colors ${
              !acceptedTerms || loading || !email || !password
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-buttonHover"
            }`}
          >
            {loading ? <Spin size="small" /> : "Signup"}
          </button>

          {/* Divider with "Or" */}
          <Divider style={{ borderColor: "#525252" }}>
            <span className="text-white font-light">Or</span>
          </Divider>

          {/* Social signup buttons */}
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
              Signup with Google
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
              Signup with Apple
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-2 text-center">
            Or{" "}
            <a href="/login" className="text-[#EDB527]">
              already have an account
            </a>{" "}
            to get started
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
  );
}
