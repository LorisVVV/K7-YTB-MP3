chrome.runtime.onMessage.addListener((message) => {

    if (message.head == "sendUrl") {
        chrome.runtime.sendNativeMessage('com.lolorisotto.messagek7', {...message}, (response) => {
                console.log("Received response:", response);
                if (chrome.runtime.lastError) {

                    // const css = `
                    //     .k7ErrorPanel {
                    //         display:block;
                    //     }
                    // `

                    // let queryOptions = { active: true, currentWindow: true };
                    // let tab = chrome.tabs.query(queryOptions);

                    // tab.then((tab) => {
                    //     chrome.scripting.insertCSS({
                    //         target : {tabId : tab[0]?.id},
                    //         css : css,
                    //     })
                    // })

                    
                    console.error(chrome.runtime.lastError.message);

                }
            })
    } else {




    }
});

