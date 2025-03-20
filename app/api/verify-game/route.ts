import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const gameName = searchParams.get('gameName');
    if (!gameName) {
        return NextResponse.json({ error: 'Se requiere el nombre del juego' }, { status: 400 });
    }

    const sanitizedGameName = gameName.replace(/[^a-zA-Z0-9-_]/g, '');

    const blobUrl = `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}$web/${sanitizedGameName}/html/index.html?sp=racwdli&st=2025-03-18T22:01:06Z&se=2025-04-30T06:01:06Z&spr=https&sv=2024-11-04&sr=c&sig=8ahos6KXXYfLSAa7Ks7LD4%2BqkLfT84DXNmHQ72uCm3k%3D`;

    try {
        const blobResponse = await fetch(blobUrl, { method: 'HEAD' });
        return NextResponse.json({ exist: blobResponse.ok });
    } catch (error) {
        console.error('Error verificando juego:', error);
        return NextResponse.json({ error: 'Error al verificar el juego' }, { status: 500 });
    }
}