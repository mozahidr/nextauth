"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();
  if (!user) {
    window.location.reload();
    return null;
  }
  return (
    <UserInfo label="Client Component" user={user} />
  );
};

export default ClientPage;
