import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

// In-memory registered users store (replace with a real DB in production)
// This mirrors what useRegistrationStore does on the client, but server-side
const registeredUsers = new Map<string, { name: string; password: string }>();

export function serverRegisterUser(email: string, name: string, password: string) {
  registeredUsers.set(email.toLowerCase(), { name, password });
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        // Pass action: "register" when registering, "login" when signing in
        action: { label: "Action", type: "text" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.toLowerCase();
        const action = credentials.action ?? "login";

        if (action === "register") {
          // Registration: save user, then sign them in
          if (credentials.password.length < 6) return null;
          registeredUsers.set(email, {
            name: credentials.name ?? email.split("@")[0],
            password: credentials.password,
          });
          return {
            id: "user-" + email,
            email: credentials.email,
            name: credentials.name ?? email.split("@")[0],
            image: null,
          };
        }

        // Login: check user is registered
        const user = registeredUsers.get(email);
        if (!user) {
          // User has not registered — reject login
          throw new Error("NOT_REGISTERED");
        }

        if (user.password !== credentials.password) {
          throw new Error("INVALID_PASSWORD");
        }

        return {
          id: "user-" + email,
          email: credentials.email,
          name: user.name,
          image: null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret:
    process.env.NEXTAUTH_SECRET ?? "voltix-secret-key-change-in-production",
};
