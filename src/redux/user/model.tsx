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
};

export type AppUser = {
  allUsers: User[];
  aUser: User;
};
