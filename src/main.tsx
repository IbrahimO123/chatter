import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import { Hourglass } from "react-loader-spinner";

export const Loader = () => {
  const loaderStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "10px",
  };
  return (
    <Hourglass
      visible={true}
      height="30"
      width="30"
      ariaLabel="hourglass-loading"
      wrapperStyle={loaderStyle}
      colors={["#4caf50", "#C2B280"]}
    />
  );
};


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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
          <Suspense fallback={<Loader />}>
            <Router>
              <App />
            </Router>
          </Suspense>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
