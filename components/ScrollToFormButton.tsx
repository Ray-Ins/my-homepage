"use client";

import { Button } from "@/components/ui/button";

interface ScrollToFormButtonProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  size?: "default" | "sm" | "lg" | "icon";
}

export default function ScrollToFormButton({
  targetId,
  children,
  className,
  style,
  size = "lg",
}: ScrollToFormButtonProps) {
  const scrollToForm = () => {
    const element = document.getElementById(targetId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button
      size={size}
      className={className}
      style={style}
      onClick={scrollToForm}
    >
      {children}
    </Button>
  );
}
