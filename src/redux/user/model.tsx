export type User = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  isAuthorised: boolean;
  isLoggedIn: boolean;
  isRegistered: boolean;
  dateCreated: string;
  timeCreated: string;
  profileImageUrl: string;
  facebookHandle: string;
  twitterHandle: string;
  linkedInHandle: string;
};

export type AppUser = {
  allUsers: User[];
  aUser: User;
};

export type UserDataUpdateProps = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  facebookHandle: string;
  twitterHandle: string;
  linkedInHandle: string;
};
