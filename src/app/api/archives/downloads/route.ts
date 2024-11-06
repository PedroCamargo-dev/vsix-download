import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const downloadPath = process.env.DOWNLOAD_PATH;
  let files: string[] = [];

  if (downloadPath && fs.existsSync(downloadPath)) {
    files = fs.readdirSync(downloadPath);
  } else {
    throw new Error("Diretório não encontrado");
  }

  try {
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
