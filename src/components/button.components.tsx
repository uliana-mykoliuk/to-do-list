import React from "react";

type ButtonProps = {
  variant?: "main" | "secondary";
  classes?: string;
  children: React.ReactNode;
  [key: string]: any;
};

const Button: React.FC<ButtonProps> = ({
  variant = "main",
  classes = "",
  children,
  ...props
}) => {
  const BUTTON_VARIANTS = {
    main: "text-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-[#6528F7] hover:bg-[#A076F9] focus:outline-none",
    secondary:
      "text-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-black bg-[#e4e4e4] hover:bg-[#d4d4d4] focus:outline-none",
  };

  return (
    <button className={`${BUTTON_VARIANTS[variant]} ${classes}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
