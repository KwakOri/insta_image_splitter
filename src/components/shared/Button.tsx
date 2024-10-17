import { PropsWithChildren } from "react";
interface GridButtonProps {
  onClick: () => void;
}

const Button = ({ children, onClick }: PropsWithChildren<GridButtonProps>) => {
  return (
    <button
      className="bg-white text-black rounded-lg px-4 py-2 hover:bg-white/80 mt-4"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
