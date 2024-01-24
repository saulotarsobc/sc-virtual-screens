/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer } from "electron";

declare global {
  namespace NodeJS {
    interface Global {
      API: any;
    }
  }
}

process.once("loaded", () => {
  (global as any).api = {
    ipcRenderer,
    runCommand: (command: {}) => ipcRenderer.sendSync("runCommand", command),
  };
});
