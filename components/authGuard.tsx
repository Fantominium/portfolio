"use client";

import React from "react";
import useRequireAuth from "@/hooks/useRequireAuth";
import AuthModal from "@/components/authModal";
import { SessionProvider } from "next-auth/react"


interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isAuthChecked } = useRequireAuth();

  if (!isAuthChecked) {
    // Optionally, render a spinner or placeholder until authentication state is determined.
    return (
    <SessionProvider>
        <div>Loading...</div>
    </SessionProvider>);
  }

  // If not authenticated, show the modal to block access
  if (!isAuthenticated) {
    return (
    <SessionProvider>
        <AuthModal isOpen={true} />
    </SessionProvider>
  )}

  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthGuard;