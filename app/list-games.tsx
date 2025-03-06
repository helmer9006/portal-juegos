"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "./context/auth-provider";
import Link from "next/link";
import LoadingScreen from "./components/loading-screen";

export default function ListGames() {
  const [games, setGames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { logout } = useAuth();

  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const res = await fetch("/api/list-games");
        const data = await res.json();
        setGames(data.games);
      } catch (error) {
        console.error("Error al cargar juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarJuegos();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-1">
      {/* <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Portal de Juegos
        </h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {games.length > 0 ? (
          games.map((game) => (
            <Link href={`/games/${game}`} key={game}>
              <div className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {game.charAt(0).toUpperCase() + game.slice(1)}
                </h2>
                <p className="text-gray-600">Haz clic para jugar</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">
            No hay juegos disponibles en este momento.
          </p>
        )}
      </div>
    </div>
  );
}
