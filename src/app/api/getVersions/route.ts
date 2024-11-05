import { IApiResponse, IRequestBody } from "@/app/interfaces/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { extension }: IRequestBody = await request.json();

  if (!extension) {
    return NextResponse.json(
      { message: "Extensão é obrigatória" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;api-version=3.0-preview.1",
        },
        body: JSON.stringify({
          filters: [
            {
              criteria: [
                {
                  filterType: 7,
                  value: extension,
                },
              ],
            },
          ],
          flags: 1030,
        }),
      }
    );

    const data: IApiResponse = await response.json();

    const versions = data.results[0].extensions[0].versions.map((version) => {
      let vsixFile = version.files.find((file) =>
        file.assetType.includes(".vsix")
      );
      if (!vsixFile) {
        vsixFile = version.files.find(
          (file) =>
            file.assetType === "Microsoft.VisualStudio.Services.VSIXPackage"
        );
      }

      return {
        version: version.version,
        vsixUrl: vsixFile ? vsixFile.source : "",
      };
    });

    return NextResponse.json({ versions });
  } catch (error) {
    console.error("Falha ao buscar versões", error);

    return NextResponse.json(
      { message: "Falha ao buscar versões" },
      { status: 500 }
    );
  }
}
