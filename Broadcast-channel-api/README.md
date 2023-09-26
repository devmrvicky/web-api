# BroadcastChannel API Demo

This repository contains a simple demonstration of the BroadcastChannel API, showcasing how to create a sender page and two receiver pages (receiver1.html and receiver2.html), as well as an iframe receiver (receiverIframe.html). The included script.js file contains the code for creating a channel and sending messages to the receiver files.

## Overview

The BroadcastChannel API allows for real-time communication and data sharing between different browser tabs, windows, or iframes that are open on the same origin. In this demo, we have set up a sender page and multiple receiver pages to illustrate this communication. 

**note** : It is not working between two different browser.

### Files in the Repository

- **sender.html:** The sender page where messages are sent from.
- **receiver1.html:** The first receiver page that listens for and displays messages from the sender.
- **receiver2.html:** The second receiver page that also listens for and displays messages from the sender.
- **receiverIframe.html:** An iframe receiver embedded in the sender page, demonstrating communication between the parent window and an iframe.

## Getting Started

To run this demo locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/broadcast-channel-demo.git
   ```

2. Open the `sender.html` and `receiver1.html` files in one browser window (e.g., Chrome).

3. Open the `receiver2.html` file in another browser window (e.g., Firefox).

4. Open the `sender.html` file in a third browser window or tab.

5. You can also open the `receiverIframe.html` file in a separate tab of the sender page.

## Usage

- In the `sender.html` page, type a message in the input field and click the "Send" button.
- Observe how the messages are received and displayed in both `receiver1.html` and `receiver2.html`.
- Messages sent from the sender are also displayed in the iframe located in `receiverIframe.html`.

**Screenshot**

![Uses](/Broadcast-channel-api/img/broadcast-channel-api.png)
**[Go to page](https://devmrvicky.github.io/web-api-repo/Broadcast-channel-api/sender.html)**

## Resources

- [MDN Web Docs - BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)
- [Web Platform API - BroadcastChannel](https://webplatform.github.io/docs/apis/broadcastchannel/)

Feel free to explore the code in this repository to learn more about how to implement the BroadcastChannel API for real-time communication in your web applications.

Happy coding!
