import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const gameName = searchParams.get('gameName');
    let file = searchParams.get('file') || 'html/index.html';

    if (!gameName) {
        return NextResponse.json({ error: 'Se requiere el nombre del juego' }, { status: 400 });
    }

    const sanitizedGameName = gameName.replace(/[^a-zA-Z0-9-_]/g, '');
    // Si por alguna razón el file trae un ? adicional (cache buster), lo limpiamos
    const [sanitizedFilePath] = file.split('?');
    const sanitizedFile = sanitizedFilePath.replace(/[^a-zA-Z0-9-_/.\s]/g, '');

    const blobUrl = `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}$web/${sanitizedGameName}/${sanitizedFile}?${process.env.NEXT_PUBLIC_STORAGE_SAS_TOKEN}`;

    try {
        const blobResponse = await fetch(blobUrl);
        if (!blobResponse.ok) {
            return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
        }

        const contentType = blobResponse.headers.get('content-type') || 'application/octet-stream';
        const blobData = await blobResponse.arrayBuffer();

        if (contentType.includes('text/html')) {
            let textData = new TextDecoder().decode(blobData);

            // Reescribir las rutas dentro del HTML para apuntar a la API
            textData = textData.replace(/(src|href)=["'](?!https?:\/\/|\/\/|data:)([^"']+)["']/g,
                (match, attr, url) =>
                    `${attr}="/api/games-content?gameName=${sanitizedGameName}&file=html/${url}"`);

            return new NextResponse(textData, {
                status: 200,
                headers: { 'Content-Type': 'text/html' }
            });
        }

        return new NextResponse(blobData, {
            status: 200,
            headers: { 'Content-Type': contentType }
        });
    } catch (error) {
        console.error('Error accediendo al blob:', error);
        return NextResponse.json({ error: 'Error accediendo al juego' }, { status: 500 });
    }
}
