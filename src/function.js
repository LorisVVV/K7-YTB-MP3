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

// Listerner of keyboard input to launch the convert function on enter key pressed
function onKeyPressListener(event) {

    console.dir(event)

    if (event.code == "Enter") {
        convert()
    }    

}

// Called on focus of the combobox shox outline if focus by a keyboard
function onFocusHandler(event) {
    const selectElt = document.getElementById('format-selector')
    console.log("wtf");
    
    if (event.relatedTarget != null ) {
        selectElt.classList.replace('non-focusable', 'focusable')

    } else {
        selectElt.classList.replace('focusable', 'non-focusable')
    }
}

// Handler changing the format selected
async function selectFormatOnChangeHandler() {
    
    const selectElt = document.getElementById("format-selector")
    const selectedOpt = selectElt.selectedOptions[0]

    await window.setFormatFct.setFormat(selectedOpt.value)
    changeBackgroundColors(selectedOpt.value)
}

// Change backgrounds format with right colors
function changeBackgroundColors(format, bypass) {
    const currentCircle = document.getElementsByClassName('circle show')[0]

    if (format != currentCircle.id) {

        const newCurrentCircle = document.getElementById(format)
        const parent = newCurrentCircle.parentElement
        const cloneNode = newCurrentCircle.cloneNode()
        newCurrentCircle.remove()

        parent.appendChild(cloneNode)
        setTimeout(() => {
            cloneNode.classList.add('show')
        }, bypass ? 0 : 10)
        currentCircle.classList.remove('show')

    }
}

// Get the default format in the data
async function getFormat() {
    return await window.getFormatFct.getFormat()
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

        if (isErrorShownValue == true) {
            alert(e.message)
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

    const format = await window.getFormatFct.getFormat()
    const formatOptions = document.getElementById("format-selector").options
    
    Array.from(formatOptions).forEach(elt => {
        if (elt.value == format) {
            elt.selected = true
        } else {
            elt.selected = false
        }
    });
    changeBackgroundColors(format, true)
}

window.onload = async () => {
    await init()

    window.setUrlFct.onSetUrl( (value) => {
        // alert("Message reçu ! " + JSON.stringify(value))
        const urlInput = document.getElementById('url')
        if (value.url) {
            urlInput.value = value.url
        }
    })
}