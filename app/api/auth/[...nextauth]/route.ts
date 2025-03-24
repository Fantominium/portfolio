import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

declare module "next-auth" {
  interface Session {
    token?: any;
    user: DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID ?? "your-github-client-id",
      clientSecret: process.env.NEXTAUTH_SECRET_GITHUB_CLIENT_SECRET ?? "your-github-client-secret",
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID ?? "your-google-client-id",
      clientSecret: process.env.NEXTAUTH_SECRET_PUBLIC_GOOGLE_CLIENT_SECRET ?? "your-google-client-secret",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID ?? "your-linkedin-client-id",
      clientSecret: process.env.LINKEDIN_SECRET ?? "your-linkedin-client-secret",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 hours
  },
  jwt: {
    // Additional JWT options can be added here if needed
  },
  callbacks: {
    async session({ session, token }) {
      session.token = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };