"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
  const user = useCurrentUser();

  if (!user) {
    window.location.reload();
    return <p>Loading...</p>; // or a redirect to login page
  }

  const onClick = () => {
    signOut();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <p>{user?.name}</p>
      <button onClick={onClick} type="submit">
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
