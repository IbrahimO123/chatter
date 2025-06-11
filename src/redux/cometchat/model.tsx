export type CometUser = {
  name: string;
  uid: string;
  avatar: string;
  link: string;
  role: string;
  metadata: {
    "@private": {
      email: string;
      contactNumber: string;
    };
  };
  tags: string[];
  withAuthToken: boolean;
};

export type CometChatUser = {
  allCometUsers: CometUser[];
  aCometUser: CometUser;
  cometModal: OpenModal,
};

export type OpenModal = {
  open: boolean;
  error: string;
};
