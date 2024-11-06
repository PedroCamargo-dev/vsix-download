import { useState } from "react";

export function useExtension() {
  const [extension, setExtension] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { name: string; id: string }[]
  >([]);
  const [versions, setVersions] = useState<
    { version: string; vsixUrl: string }[]
  >([]);
  const [selectedVsix, setSelectedVsix] = useState<{
    version: string;
    vsixUrl: string;
  }>({
    version: "",
    vsixUrl: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  }>({
    message: "",
    type: "success",
  });

  const fetchSuggestions = async (query: string) => {
    setSuggestions([]);
    setMessage({ message: "", type: "success" });
    setVersions([]);
    if (!query) return;

    try {
      const response = await fetch("/api/searchExtensions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuggestions(data.suggestions);
      } else {
        setMessage({ message: "Falha ao buscar sugestões", type: "error" });
      }
    } catch {
      setMessage({
        message: "Ocorreu um erro ao buscar sugestões",
        type: "error",
      });
    }
  };

  const onSubmitGenerateVersion = async () => {
    setLoading(true);
    setVersions([]);
    setMessage({ message: "", type: "success" });

    if (!extension) {
      setLoading(false);
      setMessage({ message: "Extensão é obrigatória", type: "error" });
      return;
    }

    try {
      const response = await fetch("/api/getVersions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extension }),
      });
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setVersions(data.versions);
      } else {
        setMessage({
          message: data.message || "Falha ao buscar versões",
          type: "error",
        });
      }
    } catch {
      setLoading(false);
      setMessage({
        message: "Ocorreu um erro ao buscar versões",
        type: "error",
      });
    }
  };

  const onDownloadVSIX = async () => {
    if (!selectedVsix) {
      setMessage({
        message: "Por favor, selecione uma versão para download.",
        type: "error",
      });
      return;
    }

    setDownloading(true);
    setMessage({ message: "", type: "success" });

    try {
      const response = await fetch("/api/downloadVsix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vsixUrl: selectedVsix.vsixUrl,
          extension: `${extension}.${selectedVsix.version}`,
        }),
      });

      if (!response.ok) {
        setMessage({
          message: "Falha ao baixar o arquivo VSIX",
          type: "error",
        });
      } else {
        const data = await response.json();
        setMessage({
          message: `Download bem-sucedido! Arquivo disponível em ${data.fileUrl}`,
          type: "success",
        });
      }
    } catch {
      setMessage({
        message: "Ocorreu um erro ao baixar o VSIX",
        type: "error",
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleSelectSuggestion = (id: string) => {
    setExtension(id);
    setSuggestions([]);
  };

  return {
    extension,
    suggestions,
    versions,
    loading,
    downloading,
    message,
    setExtension,
    setSelectedVsix,
    setSuggestions,
    fetchSuggestions,
    onSubmitGenerateVersion,
    onDownloadVSIX,
    handleSelectSuggestion,
  };
}
