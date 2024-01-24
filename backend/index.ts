// Native
import { join } from "path";
import { format } from "url";
import { exec } from "child_process";

// Packages
import prepareNext from "electron-next";

// Modules
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
// import { getWinSettings, setWinSettings } from "./store";

const isDev = process.argv.some((str) => str == "--dev");
const isStart = process.argv.some((str) => str == "--start");

const UTILS_PATH =
  isStart || isDev
    ? join(__dirname, "..", "utils")
    : join(__dirname, "..", "..", "utils");

const URL =
  isStart || isDev
    ? `http://localhost:8000/`
    : format({
        pathname: join(__dirname, "../frontend/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

const createWindow = () => {
  // const winSize = getWinSettings();

  const mainWindow = new BrowserWindow({
    // height: winSize.h,
    // width: winSize.w,
    // minHeight: 500,
    // minWidth: 400,

    height: 500,
    width: 400,
    resizable: false,

    webPreferences: {
      spellcheck: false,
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
    },
  });

  // mainWindow.on("resize", () => {
  //   setWinSettings(mainWindow.getSize());
  // });

  mainWindow.setMenu(null);

  // open devtools
  // abre o devtools se estiver em modo de desenvolvimento
  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.loadURL(URL);
};

// Prepare the frontend once the app is ready
// Prepare o frontend quando o aplicativo estiver pronto
app.on("ready", async () => {
  await prepareNext("./frontend");
  createWindow();
});

// Quit the app once all windows are closed
// Saia do aplicativo quando todas as janelas estiverem fechadas
app.on("window-all-closed", app.quit);

/* ++++++++++ code ++++++++++ */
ipcMain.on("runCommand", (event: IpcMainEvent, command: string) => {
  exec(command, { cwd: UTILS_PATH }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o comando: ${error}`);
      event.returnValue = { error: true, message: error.message, stderr };
    }
    event.returnValue = {
      error: false,
      stdout,
    };
  });
});
