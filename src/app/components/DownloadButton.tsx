export function DownloadButton({
  onDownload,
  downloading,
}: Readonly<{
  onDownload: () => void;
  downloading: boolean;
}>) {
  return (
    <button
      type="button"
      id="downloadVSIX"
      onClick={onDownload}
      className="w-full h-12 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center disabled:bg-transparent"
      disabled={downloading}
    >
      {downloading ? (
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
      ) : (
        "Download do VSIX"
      )}
    </button>
  );
}
