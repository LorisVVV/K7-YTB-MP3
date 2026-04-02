chrome.runtime.onMessage.addListener((message) => {

    if (message.head == "sendUrl") {
        console.log("sendUrl message recieved");
        console.dir(message)
        
        chrome.runtime.sendNativeMessage('com.lolorisotto.messagek7', {...message})
    } else {
        console.log("Message recieved but not sendUrl");
        
    }
});