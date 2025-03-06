"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "../../components/protected-route";
import { useAuth } from "../../context/auth-provider";
import LoadingScreen from "@/app/components/loading-screen";

// Componente para mostrar el juego a través de un iframe
function GameFrame() {
  const params = useParams();
  const gameName = params.gameName as string;
  const [playExist, setPlayExist] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { logout } = useAuth();

  // Verificar si el juego existe
  useEffect(() => {
    const verifyGame = async () => {
      if (!gameName) return;

      try {
        const res = await fetch(`/api/verify-game?gameName=${gameName}`);
        const data = await res.json();
        setPlayExist(data.exist);
      } catch (error) {
        console.error("Error al verificar juego:", error);
        setPlayExist(false);
      } finally {
        setLoading(false);
      }
    };

    verifyGame();
  }, [gameName]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!playExist) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl mb-4">Juego no encontrado</h1>
        <p className="mb-4">El juego que estás buscando no existe.</p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <iframe
          src={`/games-files/${gameName}/index.html`}
          title={`Juego ${gameName}`}
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}

// Componente principal que envuelve el juego con la protección
export default function GamePage() {
  return (
    <ProtectedRoute>
      <GameFrame />
    </ProtectedRoute>
  );
}
