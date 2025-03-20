"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoadingScreen from "./components/loading-screen";

interface IGames {
  game: string;
  description: string;
}

export default function ListGames() {
  const [games, setGames] = useState<IGames[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadGames = async () => {
      try {
        const res = await fetch("/api/list-games");
        const data = await res.json();
        setGames(data.games || []);
      } catch (error) {
        console.error("Error al cargar juegos:", error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col items-start min-h-screen bg-gray-100 p-6">
      {/* Google Material Icons */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      {/* Buscador */}
      <div className="w-full max-w-7xl mb-6">
        <input
          type="text"
          placeholder="Buscar juego..."
          className="w-full p-3 border rounded-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="relative overflow-x-auto w-full max-w-7xl bg-white rounded-lg shadow-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-cyan-600 text-white">
            <tr>
              <th className="px-6 py-4 font-bold text-left">
                Nombre del Juego
              </th>
              <th className="px-6 py-4 font-bold text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <tr
                  key={game.game}
                  className="hover:bg-gray-100 transition border-b border-gray-300"
                >
                  <td className="px-6 py-4 text-left">
                    {game.description.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-left">
                    <Link href={`/games/${game.game}`}>
                      <button
                        className="p-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition cursor-pointer"
                        title="Ver juego"
                      >
                        <span className="material-icons align-middle">
                          visibility
                        </span>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No hay juegos disponibles o no hay coincidencias.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
