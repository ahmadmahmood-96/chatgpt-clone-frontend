"use client";
import { useAuth } from "@/context/AuthContext";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="text-center mt-10">
        <Spin />
      </div>
    );
  return user ? <>{children}</> : null;
}
