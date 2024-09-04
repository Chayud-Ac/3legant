import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
              const userObject = user.toObject();
              userObject._id = user._id.toString();

              return JSON.parse(
                JSON.stringify({
                  ...userObject,
                  remember: req?.body?.remember,
                })
              );
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
        return true;
      }
      if (account.provider === "google") {
        await connectToDatabase();

        try {
          const existingUser = await User.findOne({ email: user.email });
          let userObject;
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              image: user.image,
              displayName: user.name,
            });
            await newUser.save();
            userObject = JSON.parse(JSON.stringify(newUser));
          } else {
            userObject = JSON.parse(JSON.stringify(existingUser));
          }

          user._id = userObject._id.toString();
          user.displayName = userObject.displayName;
          user.image = userObject.image;

          return true;
        } catch (err) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.remember = user.remember;
        token.displayName = user.displayName;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        email: token.email,
        displayName: token.displayName,
        image: token.image,
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
