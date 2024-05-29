import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
    const session = await auth();

    session?.user.email

  return (
    <div>
      {JSON.stringify(session)} {session?.user?.id}
      <form action={async () => {
        "use server";
        await signOut();
      }}>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}

export default SettingsPage
