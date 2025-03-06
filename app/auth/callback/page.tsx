"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Obtener la ruta guardada antes de la redirección
    const redirectPath = sessionStorage.getItem("redirectPath") || "/";

    // Redirigir al usuario a la página que intentaba acceder
    router.push(redirectPath);
  }, [router]);

  return <div>Procesando autenticación...</div>;
}
