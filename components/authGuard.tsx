import React from "react";
import useRequireAuth from "@/hooks/useRequireAuth";
import AuthModal from "@/components/authModal";
import { Loader } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isAuthChecked, linkedInUsed } = useRequireAuth();

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
        return <p>Please sign in for a complete user experience</p>;
  }

  if (!linkedInUsed && isAuthenticated) {
    return <>{children}</>;
  }
  return (        
  <div className="flex items-center justify-center flex-col">
      <h2 className="text-lg font-thin tracking-wide mb-4">Alternate Authentication Required</h2>
      <p className="font-thin tracking-wide mb-4">Please authenticate using another provider to access this content.</p>
  </div>
)
 
};

export default AuthGuard;