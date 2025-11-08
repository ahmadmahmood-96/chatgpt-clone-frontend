import LandingPage from "./components/LandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatGPT - Clone",
  description: "ChatGPT clone developed for full-stack development test",
};

export default function Home() {
  return (
    <main>
      <LandingPage />
    </main>
  );
}
