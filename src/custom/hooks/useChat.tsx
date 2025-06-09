import { CometChat } from "@cometchat/chat-sdk-javascript";
import { getCometChatUsers } from "../../Utilities/RetrieveAuthToken";

type AddUser = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
};
export const useChat = () => {
  
  //function for logging in user to comet chat
  const loggedInUserToCometChat = async (email: string) => {
    try {
      const value = await getCometChatUsers();
      const person = value.data.filter((p) => p.email === email);
      CometChat.getLoggedinUser().then(
        (user: CometChat.User | null) => {
          if (!user) {
            CometChat.login(person[0].authToken).then(
              (user: CometChat.User) => {
                console.log("Login Successful:", { user });
              },
              (error: CometChat.CometChatException) => {
                console.log("Login failed with exception:", { error });
              }
            );
          }
        },
        (error: CometChat.CometChatException) => {
          console.log("Some Error Occured", { error });
        }
      );
    } catch (e: any) {
      console.log(e.message);
    }
  };

  //function for adding new user to comet chat
  const handleAddUserToCometChat = async ({
    firstname,
    lastname,
    phoneNumber,
    email,
  }: AddUser) => {
    try {
      const value = await getCometChatUsers();
      const verify = value.data.some((item) => item.email === email);
      const url = `https://${import.meta.env.VITE_COMETCHAT_APP_ID}.api-${
        import.meta.env.VITE_COMETCHAT_REGION
      }.cometchat.io/v3/users`;
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          apiKey: import.meta.env.VITE_COMETCHAT_API_KEY,
        },
        body: JSON.stringify({
          metadata: {
            "@private": {
              email: email,
              contactNumber: phoneNumber,
            },
          },
          uid:
            Date.now().toString(36) +
            Math.random().toString(36).substring(2, 12).padStart(12, "0"),
          name: `${lastname} ${firstname}`,
        }),
      };
      if (!verify) {
        const res = await fetch(url, options);
        const data = await res.json();
        return data.data;
      }
    } catch (e: any) {
      console.log(e.message);
      return "error";
    }
  };

  // function for creating auth token
  const createAuthTokenToCometChat = async (uid: string) => {
    const url = `https://${import.meta.env.VITE_COMETCHAT_APP_ID}.api-${
      import.meta.env.VITE_COMETCHAT_REGION
    }.cometchat.io/v3/users/${uid}/auth_tokens`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        apiKey: import.meta.env.VITE_COMETCHAT_API_KEY,
      },
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      return data.data;
    } catch (e: any) {
      console.log(e.message);
      return "Error";
    }
  };

  return {
    handleAddUserToCometChat,
    createAuthTokenToCometChat,
    loggedInUserToCometChat,
  };
};
