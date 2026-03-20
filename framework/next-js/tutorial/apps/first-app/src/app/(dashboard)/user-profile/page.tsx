import React, { Suspense } from "react";
import Profile from "../_components/Profile";
import User from "../_components/User";
import ProfileLoader from "../_components/ProfileLoader";
import UserLoader from "../_components/UserLoader";

function UserProfilePage() {
  return (
    <div className="size-full flex-1 flex gap-x-8 items-start">
      <Suspense fallback={<ProfileLoader />}>
        <Profile />
      </Suspense>
      <Suspense fallback={<UserLoader />}>
        <User />
      </Suspense>
    </div>
  );
}

export default UserProfilePage;
