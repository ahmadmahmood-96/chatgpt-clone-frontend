"use client";

import { Spin } from "antd";

interface LoaderProps {
  tip?: string; // optional tip text
  size?: "small" | "default" | "large"; // optional size
  fullScreen?: boolean; // if true, centers in full screen
}

const Loader = ({
  tip = "Loading...",
  size = "large",
  fullScreen = true,
}: LoaderProps) => {
  const wrapperClasses = fullScreen
    ? "flex text-[#bf2432] items-center justify-center h-screen w-screen bg-primaryBackground"
    : "";

  return (
    <div className={wrapperClasses}>
      <Spin size={size} tip={tip} />
    </div>
  );
};

export default Loader;
