"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/auth-provider";
import LoadingScreen from "./loading-screen"; // 🆕 Importa el componente

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitialized, isLoading, login } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && isInitialized) {
      login();
    }
  }, [isAuthenticated, isLoading, isInitialized, login]);

  // 🟢 Mostrar el loader mientras se carga la app o si no está inicializado
  if (isLoading || !isInitialized) {
    return <LoadingScreen />; // 🆕 Usa el loader
  }

  if (!isAuthenticated) {
    return <LoadingScreen />; // 🆕 Usa el loader
  }

  return <>{children}</>;
}
