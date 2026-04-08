chrome.runtime.onMessage.addListener((message) => {

    if (message.head == "sendUrl") {
        chrome.runtime.sendNativeMessage('com.lolorisotto.messagek7', {...message}, (response) => {
                console.log("Received response:", response);
                if (chrome.runtime.lastError) {
                    chrome.tabs.create({ url: "https://github.com/LorisVVV/K7-YTB-MP3/releases/" }, (tab) => {
                        // Listen for the specific tab to finish loading
                        const listener = (tabId, changeInfo) => {
                            if (tabId === tab.id && changeInfo.status === 'complete') {
                            chrome.tabs.onUpdated.removeListener(listener);

                            // Inject HTML directly into the target tab
                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                files: ['github-handler.js']
                                // func: () => {
                                //     const div = document.createElement('div');
                                //     div.innerHTML = '<h1>Injected from Background</h1>';
                                //     document.body.prepend(div);
                                // },
                                // files: ['github-handler.js','content.css']
                            });
                            }
                        };
                        chrome.tabs.onUpdated.addListener(listener);
                    });   

                    console.error(chrome.runtime.lastError.message);
                    
                }
            })
    }
});

