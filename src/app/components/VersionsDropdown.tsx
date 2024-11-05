export function VersionsDropdown({
  versions,
  onSelect,
}: Readonly<{
  versions: { version: string; vsixUrl: string }[];
  onSelect: (vsixUrl: string, version: string) => void;
}>) {
  return (
    <select
      className="w-full px-2 h-12 border rounded-xl text-center outline-none focus:border-blue-200 transition-all duration-300"
      onChange={(e) =>
        onSelect(e.target.value, e.target.options[e.target.selectedIndex].text)
      }
      defaultValue=""
    >
      <option value="" disabled>
        Selecione uma versão
      </option>
      {versions.map((version) => (
        <option key={version.version} value={version.vsixUrl}>
          {version.version}
        </option>
      ))}
    </select>
  );
}
