"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "../Loader";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/chat"); // logged-in user goes to chat
      } else {
        router.replace("/login"); // not logged-in user goes to login
      }
    }
  }, [user, loading, router]);

  return <Loader fullScreen tip="Checking Session..." />;
}
