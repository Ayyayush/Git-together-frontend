import React from "react";
import { useParams } from "react-router-dom";
import MyProfile from "./MyProfile";
import DeveloperProfile from "./DeveloperProfile";

const Profile = () => {
  const { userId } = useParams();

  if (userId) {
    return <DeveloperProfile userId={userId} />;
  }

  return <MyProfile />;
};

export default Profile;