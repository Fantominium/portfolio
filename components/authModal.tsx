"use client";

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { signIn } from "next-auth/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      role="dialog"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-background shadow-lg rounded p-6 w-11/12 md:w-[20vw] max-w-md"
      >
        <h2 id="auth-modal-title" className="text-xl font-bold mb-4 text-center">
          Sign in
        </h2>
        <p className="mb-4 text-center">
          Please sign in to access this content.
        </p>
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => signIn("github")}
            className="flex items-center justify-center"
          >
            <Github className="mr-2" /> Sign in with GitHub
          </Button>
          {/* <Button
            onClick={() => signIn("linkedin")}
            className="flex items-center justify-center"
          >
            <Linkedin className="mr-2" /> Sign in with LinkedIn
          </Button> */}
         
          <Button
            onClick={() => signIn("google")}
            className="flex items-center justify-center"
          >
            <Mail className="mr-2" /> Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default AuthModal;