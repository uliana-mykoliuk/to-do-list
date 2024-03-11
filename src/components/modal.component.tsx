import React, { ReactNode } from "react";
import Image from "next/image";
import CloseIcon from "../assets/close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute w-full h-full bg-black opacity-50"
        onClick={onClose}
      />
      <div className="relative w-[90%] max-w-md bg-white p-8 rounded-lg shadow-md z-50">
        <h2 className="text-center font-bold mb-4">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[20px] top-[15px]"
        >
          <Image src={CloseIcon} alt="Close" width={24} height={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
