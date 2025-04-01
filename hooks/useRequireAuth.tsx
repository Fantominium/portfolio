"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useRequireAuth() {
  const { data: session, status } = useSession();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      setIsAuthChecked(true);
    }
  }, [status]);

  const isAuthenticated = Boolean(session?.token);
  return { 
    linkedInUsed: session?.token?.linkedInUsed,
    isAuthenticated, 
    status, 
    isAuthChecked,
    userName: session?.user?.name, 
    userImage: session?.user?.image, 
  }; 
}