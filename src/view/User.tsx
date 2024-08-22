import { useEffect } from "react";
import { UserPage } from "../components/UserPage";
import { MetaTags } from "../components/MetaTag";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "../Utilities/GetUserData";

import { useGeneral } from "../custom/hooks/useGeneral";

const User = () => {
  const { user, dispatch, navigate } = useGeneral();

  const aUser = useSelector((state: RootState) => state.users.aUser);

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    } else {
      getLoggedInUser({ user, dispatch, aUser });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <MetaTags
        description="User profile page, user can view his or her details, update his or her profile and avatar image"
        title="Profile | Chatter"
        PageTitle="User profile page, edit  your profile and upadte it to the app"
        typeOfPlatform="website"
        url="/user/profile"
        href="/user/profile"
      ></MetaTags>
      <>
        <UserPage />
      </>
    </>
  );
};

export default User;
