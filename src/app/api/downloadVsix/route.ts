import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const { vsixUrl, extension } = await request.json();

  if (!vsixUrl || !extension) {
    return NextResponse.json(
      { message: "URL do VSIX e extensão são obrigatórios" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(vsixUrl);
    if (!response.ok) throw new Error("Falha ao baixar o arquivo VSIX");

    const buffer = Buffer.from(await response.arrayBuffer());

    const filePath = path.join(
      process.cwd(),
      process.env.DOWNLOAD_PATH ?? "public/downloads",
      `${extension}.vsix`
    );
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      fileUrl: `/${process.env.DOWNLOAD_PATH}/${extension}.vsix`,
    });
  } catch (error) {
    console.error("Falha ao baixar e salvar o arquivo VSIX", error);

    return NextResponse.json(
      { message: "Falha ao baixar e salvar o arquivo VSIX" },
      { status: 500 }
    );
  }
}
