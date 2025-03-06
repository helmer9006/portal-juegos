import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ResponseData {
    games?: string[];
    error?: string;
}

export async function GET(): Promise<NextResponse<ResponseData>> {
    try {
        const routeGames = path.join(process.cwd(), 'public', 'games-files');

        // Verificar si el directorio existe
        if (!fs.existsSync(routeGames)) {
            return NextResponse.json({ games: [] });
        }

        // Leer directorios dentro de la carpeta de juegos
        const directories = fs.readdirSync(routeGames, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .filter(dirent => {
                // Verificar que cada directorio tenga un archivo index.html
                const indexPath = path.join(routeGames, dirent.name, 'index.html');
                return fs.existsSync(indexPath);
            })
            .map(dirent => dirent.name);

        return NextResponse.json({ games: directories });
    } catch (error) {
        console.error('Error al listar juegos:', error);
        return NextResponse.json({ error: 'Error al listar los juegos disponibles' }, { status: 500 });
    }
}