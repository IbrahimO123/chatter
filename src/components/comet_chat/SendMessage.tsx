import { CometChat } from "@cometchat/chat-sdk-javascript";

// let metadata: Object = {
//   latitude: "50.6192171633316",
//   longitude: "-72.68182268750002",
// };

let receiverID = "mboxdnoq007dwnzns98u";
let messageText = "Hello world!";
let receiverType = CometChat.RECEIVER_TYPE.USER;
let textMessage = new CometChat.TextMessage(
  receiverID,
  messageText,
  receiverType
);

export const SendMessage = () => {
  return CometChat.sendMessage(textMessage).then(
    (message) => {
      console.log("Message sent successfully:", message);
    },
    (error) => {
      console.log("Message sending failed with error:", error);
    }
  );
};
