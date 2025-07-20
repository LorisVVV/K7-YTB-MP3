
function quit() {
    window.quitApp.quit()
}

function minimize() {
    resetIcon()
    window.minimizeWindow.minimize()
}

function resetIcon() {
    document.getElementsByClassName('bobine')[0].classList.remove('success')
    document.getElementsByClassName('bobine')[0].classList.remove('error')
}

async function chooseDirectory() {
    const directory = await window.chooseDirectoryDialog.chooseDirectory()
    if (directory != false) {
       changeDirectoryTitle(directory.filePaths[0]) 
    }
    
}

async function getDirectory() {
    return await window.getDirectoryChosen.getDirectory()
}

function changeDirectoryTitle(newTitle) {
    const button = document.getElementById('btn-choose-file')
    button.title = newTitle
}

async function isErrorShown() {
    return await window.isErrorShownFct.isErrorShown()
}

async function setIsErrorShown() {
    const value = document.getElementById('switch-show-error').checked
    await window.setIsErrorShownFct.setIsErrorShown(value)
}

async function convert() {
    const url = document.getElementById('url').value
    // const urlTest = 'https://www.youtube.com/watch?v=zasMBtPiMqE'

    document.getElementsByClassName('bobine')[0].classList.add('spin');
    try {
        await window.ytDownloader.downloadAudio(url);
        document.getElementsByClassName('bobine')[0].classList.add('success')
    } catch (e) {
        const isErrorShownValue = await isErrorShown();
        console.log(isErrorShownValue)
        if (isErrorShownValue == true) {
            alert(e)
        }
        document.getElementsByClassName('bobine')[0].classList.add('error')
    }
    document.getElementsByClassName('bobine')[0].classList.remove('spin');
}

async function init() {
    const switchError = document.getElementById('switch-show-error')
    const value = await isErrorShown()
    switchError.checked = value

    const title = await getDirectory()
    if (title) {
        changeDirectoryTitle(title)
    }
}

window.onload = async () => {
    await init()
}