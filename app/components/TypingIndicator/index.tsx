interface TypingIndicatorProps {
  color?: string; // optional
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = () => {
  return (
    <div className="flex space-x-1 px-2">
      <span
        className={`w-2 h-2 bg-[#bf2432] rounded-full animate-bounce`}
        style={{ animationDelay: "0ms" }}
      ></span>
      <span
        className={`w-2 h-2 bg-[#bf2432] rounded-full animate-bounce`}
        style={{ animationDelay: "150ms" }}
      ></span>
      <span
        className={`w-2 h-2 bg-[#bf2432] rounded-full animate-bounce`}
        style={{ animationDelay: "300ms" }}
      ></span>
    </div>
  );
};
