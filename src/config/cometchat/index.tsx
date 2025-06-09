import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(import.meta.env.VITE_COMETCHAT_APP_ID)
  .setRegion(import.meta.env.VITE_COMETCHAT_REGION)
  .setAuthKey(import.meta.env.VITE_COMETCHAT_AUTH_KEYS)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(UIKitSettings)!
  .then(() => {
    console.log("CometChat UI Kit initialized successfully.");
  })
  .catch((error) => {
    console.error("CometChat UI Kit initialization failed:", error);
  });
