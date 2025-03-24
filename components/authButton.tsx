import React, { useState } from "react";
import { signOut } from "next-auth/react";
import useRequireAuth from "@/hooks/useRequireAuth";
import AuthModal from "@/components/authModal";
import { Button } from "@/components/ui/button";
import { Loader, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const AuthButton: React.FC = () => {
  const { isAuthenticated, isAuthChecked, userName, userImage } = useRequireAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isAuthChecked) {
    // Loading indicator with spinner icon for accessibility.
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin h-6 w-6" aria-label="Loading" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Button onClick={() => setIsModalOpen(true)}>Sign In</Button>
        <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full border focus:outline-none focus:ring focus:ring-offset-2"
          aria-label="User menu"
        >
          {userImage ? (
            <img src={userImage} alt="User Avatar" className="object-cover w-full h-full" />
          ) : (
            <User className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[8rem]">
        <DropdownMenuLabel>{userName ?? "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} aria-label="Sign Out">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;