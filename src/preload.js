// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ytDownloader', {
  downloadAudio: (url) => ipcRenderer.invoke('downloadAudio', url)
});

contextBridge.exposeInMainWorld('quitApp', {
  quit: () => ipcRenderer.invoke('quit')
});

contextBridge.exposeInMainWorld('minimizeWindow', {
    minimize : () => ipcRenderer.invoke('minimize')
})

contextBridge.exposeInMainWorld('chooseDirectoryDialog', {
    chooseDirectory : () => ipcRenderer.invoke('chooseDirectory')
})

contextBridge.exposeInMainWorld('getDirectoryChosen', {
    getDirectory : () => ipcRenderer.invoke('getDirectory')
})

contextBridge.exposeInMainWorld('isErrorShownFct', {
  isErrorShown : () => ipcRenderer.invoke('isErrorShown')
})

contextBridge.exposeInMainWorld('setIsErrorShownFct', {
  setIsErrorShown : (value) => ipcRenderer.invoke('setIsErrorShown', value)
})