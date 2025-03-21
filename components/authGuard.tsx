import React from "react";
import useRequireAuth from "@/hooks/useRequireAuth";
import AuthModal from "@/components/authModal";
import { Loader } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isAuthChecked } = useRequireAuth();

  if (!isAuthChecked) {
    // Optionally, render a spinner or placeholder until authentication state is determined.
    return (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin h-6 w-6" aria-label="Loading" />
        </div>
      );
    }
  // If not authenticated, show the modal to block access
  if (!isAuthenticated) {
    return (
        <AuthModal isOpen={true} />
  )}

  return <>{children}</>;
};

export default AuthGuard;