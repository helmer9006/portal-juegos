"use client";

import React from "react";

interface LoadingScreenProps {
  message?: string; // Mensaje opcional, por defecto "Cargando..."
}

export default function LoadingScreen({
  message = "Cargando...",
}: LoadingScreenProps) {
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
      <div className="text-center">
        <img
          src="/colmena_loading.gif"
          width={120}
          height={120}
          alt="loading"
          className="animate-spin-slow" // Agrega animación si deseas
        />
        <p className="text-primary-colmena mt-5 font-sanchez">{message}</p>
      </div>
    </div>
  );
}
