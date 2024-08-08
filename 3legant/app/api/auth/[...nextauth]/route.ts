import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import User from "@/databases/user.model";
import { connectToDatabase } from "@/lib/mongoose";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        await connectToDatabase();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return {
                ...user.toObject(),
                remember: req?.body?.remember,
              }; // Returning user object if credentials are correct
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
        return null; // Returning null if credentials are incorrect
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "credentials") {
        return "true";
      }
      if (account.provider === "google") {
        await connectToDatabase();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });
            await newUser.save();
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.remember = user.remember;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        email: token.email,
      };

      if (token.remember) {
        session.expires = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(); // 30 วัน
      } else {
        session.expires = new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(); // 1 วัน
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
