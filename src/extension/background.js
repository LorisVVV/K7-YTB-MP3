chrome.runtime.onMessage.addListener((message, sender) => {

    if (message.head == "sendUrl") {

        // onResponse handler
        function onResponse(response) {
            console.log("Received response from promise returned by sendNativeMessage:" + response);
            return "RESPONSE"
        }

        // onError handler
        function onError(error) {
            console.log("Error response from promise returned by sendNativeMessage:" + error);
            return "ERROR"
        }

        // Sending message with handlers
        return chrome.runtime.sendNativeMessage('com.lolorisotto.messagek7', {...message}).then(onResponse, onError)
    }
});

