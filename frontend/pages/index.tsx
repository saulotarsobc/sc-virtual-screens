import { useState } from "react";

export default function Index() {
  const [data, setData] = useState("");

  return (
    <main className="flex flex-col p-1">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={async () => {
          const data = await global.api.runCommand(
            "deviceinstaller64 install usbmmidd.inf usbmmidd"
          );
          setData(data);
        }}
      >
        Instalar app
      </button>

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={async () => {
          const data = await global.api.runCommand(
            "deviceinstaller64 stop usbmmidd; deviceinstaller64 remove usbmmidd"
          );
          setData(data);
        }}
      >
        Remover app
      </button>

      <button
        className="bg-green-500 hover:bg-gre-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={async () => {
          const data = await global.api.runCommand(
            "deviceinstaller64 enableidd 1"
          );
          setData(data);
        }}
      >
        Adicionar tela
      </button>

      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={async () => {
          const data = await global.api.runCommand(
            "deviceinstaller64 enableidd 0"
          );
          setData(data);
        }}
      >
        Remover tela
      </button>

      <pre className="p-5 border border-red-100 rounded-md">
        {JSON.stringify(data, null, 4)}
      </pre>
    </main>
  );
}
