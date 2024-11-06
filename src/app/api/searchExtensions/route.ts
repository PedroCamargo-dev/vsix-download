import { IExtensionQueryResponse, ISuggestion } from "@/interfaces/api";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const requestBody = await request.json();

    const { query, pageSize }: { query: string; pageSize: number } =
      requestBody;

    if (!query) {
      return NextResponse.json({ suggestions: [] });
    }

    const url = `https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json;api-version=7.2-preview.1;excludeUrls=true",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        "X-TFS-Session": "7f99aa1b-b0f2-401f-9d7b-67bf9abb2513",
        DNT: "1",
        Origin: "https://marketplace.visualstudio.com",
        Referer: "https://marketplace.visualstudio.com",
      },
      body: JSON.stringify({
        assetTypes: [
          "Microsoft.VisualStudio.Services.Icons.Default",
          "Microsoft.VisualStudio.Services.Icons.Branding",
          "Microsoft.VisualStudio.Services.Icons.Small",
        ],
        filters: [
          {
            criteria: [
              { filterType: 8, value: "Microsoft.VisualStudio.Code" },
              { filterType: 10, value: query },
            ],
            pageSize: pageSize || 10,
            pageNumber: 1,
            sortBy: 0,
            sortOrder: 0,
          },
        ],
        flags: 870,
      }),
    });

    if (!response.ok) {
      throw new Error("Falha ao buscar extensões");
    }

    const data: IExtensionQueryResponse = await response.json();

    const suggestions: ISuggestion[] =
      data.results[0]?.extensions?.map((ext) => ({
        name: ext.displayName,
        id: `${ext.publisher.publisherName}.${ext.extensionName}`,
        iconUrl: ext.versions[0].files.find(
          (file) =>
            file.assetType === "Microsoft.VisualStudio.Services.Icons.Default"
        )?.source,
      })) || [];

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Erro ao buscar extensões:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao buscar extensões" },
      { status: 500 }
    );
  }
}
