// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('fcts',{
  downloadAudio: (url) => ipcRenderer.invoke('downloadAudio', url),
  quit: () => ipcRenderer.invoke('quit'),
  minimize : () => ipcRenderer.invoke('minimize'),
  chooseDirectory : () => ipcRenderer.invoke('chooseDirectory'),
  getDirectory : () => ipcRenderer.invoke('getDirectory'),
  isErrorShown : () => ipcRenderer.invoke('isErrorShown'),
  setIsErrorShown : (value) => ipcRenderer.invoke('setIsErrorShown', value),
  onSetUrl: (callback) => ipcRenderer.on('setUrl', (_event, value) => callback(value)),
  setFormat : (value) => ipcRenderer.invoke('setFormat', value),
  getFormat : () => ipcRenderer.invoke('getFormat')
})