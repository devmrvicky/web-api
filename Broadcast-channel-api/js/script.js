const textarea = document.querySelector("textarea");

const sendMsg = new BroadcastChannel("Send-message");

textarea.addEventListener("input", () => {
  sendMsg.postMessage(textarea.value);
});

// you can write the channel variable name 'sendMsg' ro anything you want in the receiver page but channel name should remain same
