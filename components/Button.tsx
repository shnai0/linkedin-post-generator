import { Dispatch, PropsWithChildren, SetStateAction } from "react";

interface ButtonProps {
  onClick: () => void;
}

export const Button = ({
  children,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <>
      <button
        onClick={onClick}
        className="font-medium bg-blue-900 rounded-md text-white px-4 py-2 hover:bg-blue-900"
      >
        {children}
      </button>
    </>
  );
};
