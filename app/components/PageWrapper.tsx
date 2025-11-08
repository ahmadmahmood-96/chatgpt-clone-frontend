import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";

export default function LoginPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/chat"); // redirect logged-in users to chat
    }
  }, [user, loading, router]);

  if (loading || user) return <Loader />;

  return <>{children}</>;
}
