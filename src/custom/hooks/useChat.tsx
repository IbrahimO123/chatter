import { privateKey } from "../../config/chat-engine/index";
import axios from "axios";
import { useGeneral } from "./useGeneral";
type ChatUser = {
  username: string;
  secret: string;
  firstName: string;
  lastName: string;
  email: string;
};
export const useChat = () => {
  const { user } = useGeneral();
  const handleAddUser = async (contact: ChatUser) => {
    const config = {
      method: "post",
      url: "https://api.chatengine.io/users/",
      headers: {
        "PRIVATE-KEY": privateKey,
      },
      data: contact,
    };
    try {
      if (user?.uid) {
        const res = await axios(config);
        const data = res.data;
        console.log(data);
      } else {
        console.error("Login or Signup");
      }
    } catch (e: any) {
      console.error(e.message);
    }
  };
  return {
    handleAddUser,
  };
};
