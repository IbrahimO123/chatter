import { CometChat } from "@cometchat/chat-sdk-javascript";

export const RecieveMessage = () => {
  let listenerID: string = "cwdgvfjfchbscaygvdbqjhdws";
  return CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: (textMessage: CometChat.TextMessage) => {
        console.log("Text message received successfully", textMessage);
      },
      onMediaMessageReceived: (mediaMessage: CometChat.MediaMessage) => {
        console.log("Media message received successfully", mediaMessage);
      },
      onCustomMessageReceived: (customMessage: CometChat.CustomMessage) => {
        console.log("Custom message received successfully", customMessage);
      },
    })
  );
};
