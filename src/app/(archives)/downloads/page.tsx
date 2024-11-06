export default function Downloads() {
  return (
    <div className="flex justify-center w-full py-10 items-center px-10 lg:px-2">
      <div className="w-full md:w-3/4 h-auto border flex justify-center rounded-2xl flex-col items-center gap-6 border-blue-200 drop-shadow-sm overflow-hidden">
        <table className="min-w-full bg-white shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">
                Extensão
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={file}
                className={`even:bg-gray-50 odd:bg-white hover:bg-zinc-100 transition-all duration-300 ${
                  index === files.length - 1 ? "" : "border-b"
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">{file}</td>
                <td className="px-6 py-4 text-sm">
                  <a
                    href={`/downloads/vsix/${file}`}
                    className="text-blue-500 hover:text-blue-700 font-medium underline transition-all duration-300"
                  >
                    Download
                  </a>
                  <button className="text-blue-500 hover:text-blue-700 font-medium underline transition-all duration-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
