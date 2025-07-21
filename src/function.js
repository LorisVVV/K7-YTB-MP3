
// Stop the app
function quit() {
    window.quitApp.quit()
}

// Minimize the app with cool effect
function minimize() {
    resetIcon()
    window.minimizeWindow.minimize()
}

// Reset the icon in the middle to show again the button to download
function resetIcon() {
    document.getElementsByClassName('bobine')[0].classList.remove('success')
    document.getElementsByClassName('bobine')[0].classList.remove('error')
}

// Ask the user to choose a directory where the file will be download
async function chooseDirectory() {
    const directory = await window.chooseDirectoryDialog.chooseDirectory()
    // If the user have chose a directory and didn't cancel
    if (directory != false) {
       changeDirectoryTitle(directory.filePaths[0]) 
    }
}

// Return the actual directory where the file are download
async function getDirectory() {
    return await window.getDirectoryChosen.getDirectory()
}

// Change the tooltip on the button "change directory"
function changeDirectoryTitle(newTitle) {
    const button = document.getElementById('btn-choose-file')
    button.title = newTitle
}

// Return a boolean depending if the params 'showError' in the config is true or false
async function isErrorShown() {
    return await window.isErrorShownFct.isErrorShown()
}

// Change the value of the params 'showError' in the config
async function setIsErrorShown() {
    const value = document.getElementById('switch-show-error').checked
    await window.setIsErrorShownFct.setIsErrorShown(value)
}

// Main function converting the url enter in the input into a high quality mp3 audio
async function convert() {
    const url = document.getElementById('url').value

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

// Initialisation of the app
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