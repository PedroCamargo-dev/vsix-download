"use client";

import {
  DownloadButton,
  SearchInput,
  SuggestionsList,
  VersionsDropdown,
} from "./components";
import { useExtension } from "./hooks/useExtension";

export default function Home() {
  const {
    extension,
    suggestions,
    versions,
    loading,
    downloading,
    message,
    setExtension,
    setSelectedVsix,
    onSubmitGenerateVersion,
    onDownloadVSIX,
    handleSelectSuggestion,
    fetchSuggestions,
  } = useExtension();

  return (
    <div className="flex justify-center h-screen w-full py-10 items-center px-10 lg:px-2">
      <div className="w-full md:w-3/4 lg:w-2/5 xl:w-2/6 h-auto border flex justify-center p-4 rounded-xl flex-col items-center gap-6 border-blue-200 drop-shadow-sm">
        <div className="flex flex-col text-center">
          <h1 className="text-3xl">VSIX Download</h1>
          <p className="text-sm text-gray-500">Baixar arquivo VSIX</p>
        </div>
        {message && (
          <p
            className={
              message.type === "error"
                ? "text-red-500 font-semibold"
                : "text-green-500"
            }
          >
            {message.message}
          </p>
        )}
        <div className="w-full gap-3 flex flex-col items-center">
          <SearchInput
            value={extension}
            onChange={(value) => {
              setExtension(value);
              setSelectedVsix({
                version: "",
                vsixUrl: "",
              });
              fetchSuggestions(value);
            }}
          />
          {suggestions.length > 0 && (
            <SuggestionsList
              suggestions={suggestions}
              onSelect={handleSelectSuggestion}
            />
          )}
          {extension.includes(".") && (
            <button
              type="button"
              id="searchVersions"
              onClick={onSubmitGenerateVersion}
              className="w-full h-12 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300"
            >
              Buscar versões
            </button>
          )}
        </div>
        {loading && (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
        )}
        {versions.length > 0 && extension.includes(".") && (
          <>
            <VersionsDropdown
              versions={versions}
              onSelect={(vsixUrl: string, version: string) =>
                setSelectedVsix({ vsixUrl, version })
              }
            />
            <DownloadButton
              onDownload={onDownloadVSIX}
              downloading={downloading}
            />
          </>
        )}
      </div>
    </div>
  );
}
