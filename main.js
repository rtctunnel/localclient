const { app, BrowserWindow } = require("electron");

const child_process = require("child_process");

const path = require("path");
const url = require("url");

let child = child_process.spawn("rtctunnel", ["-addr", "127.0.0.1:8761"], {
	stdio: "inherit"
});

let mainWindow;

app.on("ready", () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		title: "RTCTunnel",
		autoHideMenuBar: true
	});

	// and load the index.html of the app.
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file:",
			slashes: true
		})
	);

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});

app.on("quit", () => {
	child.kill();
});
