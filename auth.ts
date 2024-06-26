import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "@/auth.config";

import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // Allow OAuth without email verification
    async signIn({ user, account }) {
      //console.log({ user, account});

      if (account?.provider !== "credentials") return true;

      // prevent sign in without email verification
      //
      if (user.id) {

        const existingUser = await getUserById(user.id);

        if (!existingUser?.emailVerified) return false;
        
        if(existingUser.isTowFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

          if (!twoFactorConfirmation) return false;

          // Delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id
            }
          })

        }
      }

      return true;
    },
    async session({ token, session }) {

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      //console.log(token.sub);

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if(session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTowFactorEnabled;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
