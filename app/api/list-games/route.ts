import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

interface ResponseData {
    games?: IGames[];
    error?: string;
}
interface IGames {
    game: string;
    description: string;
}
interface IBlob {
    Name: string;
}
export async function GET(): Promise<NextResponse<ResponseData>> {
    try {
        const storageUrl = `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}$web`;
        const sasToken = process.env.NEXT_PUBLIC_STORAGE_SAS_TOKEN;
        const url = `${storageUrl}?restype=container&comp=list&${sasToken}`;
        const response = await fetch(url);
        const xml = await response.text();
        if (!response.ok) {
            console.error('Error al acceder al blob:', JSON.stringify(xml));
            return NextResponse.json({ error: 'Error al listar los juegos disponibles' }, { status: 500 });
        }

        // Parsear el XML
        const parser = new XMLParser();
        const parsed = parser.parse(xml);

        // Sacar todos los blobs
        const blobs = parsed?.EnumerationResults?.Blobs?.Blob || [];

        const gameSet = new Set<string>();

        // Soporta si viene un solo blob o varios
        const blobArray = Array.isArray(blobs) ? blobs : [blobs];

        blobArray.forEach((blob: IBlob) => {
            const blobName: string = blob?.Name;
            // Buscar los index.html de cada juego
            const match = blobName.match(/^([^/]+)\/html\/index\.html$/);
            if (match) {
                gameSet.add(match[1]);
            }
        });

        const gamesString = Array.from(gameSet);
        const games = gamesString.map((game) => {
            return {
                game: game,
                description: game.replace(/_/g, ' ')
            };
        });
        return NextResponse.json({ games });
    } catch (error) {
        console.error('Error al listar juegos:', error);
        return NextResponse.json({ error: 'Error al listar los juegos disponibles' }, { status: 500 });
    }
}
