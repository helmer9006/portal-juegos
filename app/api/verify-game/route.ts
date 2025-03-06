import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ResponseData {
    exist?: boolean;
    error?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<ResponseData>> {
    debugger;
    const { searchParams } = new URL(request.url);
    const gameName = searchParams.get('gameName');
    console.warn("gameName", gameName)
    if (!gameName) {
        return NextResponse.json({ error: 'Se requiere el nombre del juego' }, { status: 400 });
    }

    // Sanear el nombre de juego para evitar recorrido de directorios
    const gameFolder = gameName.replace(/[^a-zA-Z0-9-_]/g, '');
    console.warn("gameFolder", gameFolder)

    // Verificar si la carpeta del juego existe en el directorio público
    const pathGame = path.join(process.cwd(), 'public', 'games-files', gameFolder);
    console.warn("pathGame", pathGame)

    try {
        const exist = fs.existsSync(pathGame) &&
            fs.existsSync(path.join(pathGame, 'index.html'));
        console.warn("exist", exist)

        return NextResponse.json({ exist });
    } catch (error) {
        console.error('Error al verificar juego:', error);
        return NextResponse.json({ error: 'Error al verificar el juego' }, { status: 500 });
    }
}
