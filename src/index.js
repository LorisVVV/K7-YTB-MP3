const { app, BrowserWindow, ipcMain, screen, dialog } = require('electron');
const path = require('node:path');

const { execFile } = require("child_process");
const os = require('os');
const fs = require('fs');

let mainWindow;
let lastPositionBeforeMinimize = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 450,
    height: 260,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    resizable: false,
    fullscreen : false,
    fullscreenable : false,
    maximizable : false,
    hasShadow : false,
    frame : false,
    transparent : true,
    backgroundColor : "#00000000",
    enableLargerThanScreen : false,
    icon :  app.isPackaged
              ? path.join(process.resourcesPath, '/asset/logo', 'logo-256-hori.ico')
              :  path.join(__dirname, '/asset/logo/logo-256-hori.ico')
  });

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, 'index.html'));

  win.on('maximize', () => {
    win.setBounds(win.getBounds()); // force la fenêtre à garder sa config
  });

  win.on('restore', () => {
    if (lastPositionBeforeMinimize) {
      // Replace la fenêtre exactement à la position précédente
      win.setPosition(lastPositionBeforeMinimize.x, lastPositionBeforeMinimize.y)
    }
  });

  return win
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


function animateTo(xTarget, yTarget, win, duration = 300) {

  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  }

  const { x: xStart, y: yStart } = win.getBounds();
  const startTime = Date.now();

  const deltaX = xTarget - xStart;
  const deltaY = yTarget - yStart;

  return new Promise((resolve) => {
    function step() {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);

      const x = Math.round(xStart + deltaX * eased);
      const y = Math.round(yStart + deltaY * eased);

      win.setPosition(x, y);

      if (progress < 1) {
        currentAnimation.timer = setTimeout(step, 1000 / 60);
      } else {
        currentAnimation = null;
        resolve(); // animation terminée
      }
    }

    currentAnimation = { timer: null };
    step();
  });
}

ipcMain.handle('downloadAudio', async (event, url) => {

  const binPath = app.isPackaged
  ? path.join(process.resourcesPath, 'bin')
  : path.join(__dirname, 'bin');

  const ytDlpPath = path.join(binPath, 'yt-dlp.exe');
  const ffmpegPath = path.join(binPath, 'ffmpeg.exe');

  // Choix du dossier ou le fichier va être stocker
  const dataPath = path.join(app.getPath('userData'), 'config.json')
  let data = {} 
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath))
  }
  const outputPath = data['directory'] ? data['directory'] : path.join(os.homedir(), 'Downloads');

  const args = [
      url,
      '-f', 'bestaudio',
      '-x',
      '--audio-format', 'mp3',
      '--audio-quality', '0',   
      '--ffmpeg-location', ffmpegPath,
      '--paths', `temp:${app.isPackaged ? path.join(process.resourcesPath, 'tmp') : path.join(__dirname,'tmp')}`,
      '--paths', `${outputPath}`,
      '--output', '%(title)s.%(ext)s',
      '--no-mtime',
      '--no-playlist',
      '--windows-filenames'
  ];

  return new Promise((res, rej) => {
    execFile(ytDlpPath, args,  (err) => {
      if (err) return rej(err);
      res("Terminé !");
    });
  })

})

ipcMain.handle('quit', (event) => {
  app.quit()
})

ipcMain.handle('minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    const screenBounds = screen.getPrimaryDisplay()
    lastPositionBeforeMinimize = win.getBounds();

    ;(async () => {
      await animateTo(screenBounds.bounds.width - 450,screenBounds.bounds.height - 260 - 100, win, 500)
      await animateTo(screenBounds.bounds.width - 450,screenBounds.bounds.height - 260, win, 250)
      await animateTo(screenBounds.bounds.width-450, screenBounds.bounds.height, win, 2000)
      win.minimize();
    })();

  }
})

ipcMain.handle('chooseDirectory', async (event) => {
  const directory = await dialog.showOpenDialog({properties : ['openDirectory']}) 
  const userDataPath = app.getPath('userData')
  const dataPath = path.join(userDataPath, 'config.json')

  if (directory.canceled) {
    return false
  }

  let data = {} 
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath))
  }

  data['directory'] = directory.filePaths[0];
 
  
  fs.writeFileSync(dataPath, JSON.stringify(data), (err) => console.log(err))

  return directory
})

ipcMain.handle('getDirectory', async (event) => {
  const userDataPath = app.getPath('userData')
  const dataPath = path.join(userDataPath, 'config.json')
  
  let data = {} 
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath))
  }

  if (data['directory']) {
    return data['directory']
  } else {
    return null
  }
})

ipcMain.handle('isErrorShown', (event) => {
  const userDataPath = app.getPath('userData')
  const dataPath = path.join(userDataPath, 'config.json')

  let data = {} 
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath))
  }

  if (data['showError']) {
    return data['showError']
  } else {
    return false
  }
})

ipcMain.handle('setIsErrorShown', (event, value) => {
  const userDataPath = app.getPath('userData')
  const dataPath = path.join(userDataPath, 'config.json')

  let data = {} 
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath))
  }

  data['showError'] = value;
  fs.writeFileSync(dataPath, JSON.stringify(data), (err) => console.log(err))

})





