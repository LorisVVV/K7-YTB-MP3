// Find link of last release on https://github.com/LorisVVV/K7-YTB-MP3/releases/ and add border to it
function addHelpTimeout() {
  setTimeout(() => {

    const lastestReleaseSection = document.querySelector('div#release_page_title').nextElementSibling.firstElementChild
    const anchor = lastestReleaseSection.querySelector(".Box-footer a[href^='/LorisVVV/K7-YTB-MP3/releases/download/']")
    const styleNode = document.createElement('style')
    styleNode.textContent =
    `.click-github-k7 {
        border: 2px solid red;
        padding: 5px;
        border-radius: 8px;
        position: relative;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
    }`
    n++ // Increment the number of try
    if (anchor) {
        anchor.classList.add('click-github-k7')
        document.head.append(styleNode)
    } else if (n > 1000) { // If number of try too big we stop
        return false
    } else {
      addHelpTimeout()
    }
  }, 100);
}

n = 0 // Add a limit of number of try we gonna do
addHelpTimeout()
