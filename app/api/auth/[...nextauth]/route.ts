import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider, {LinkedInProfile} from "next-auth/providers/linkedin";

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
      clientSecret: process.env.NEXTAUTH_SECRET_GOOGLE_CLIENT_SECRET ?? "your-google-client-secret",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID_DEVELOPMENT ?? "your-linkedin-client-id",
      clientSecret: process.env.NEXTAUTH_LINKEDIN_SECRET_DEVELOPMENT ?? "your-linkedin-client-secret",
      client: { token_endpoint_auth_method: "client_secret_post" },
      issuer: "https://www.linkedin.com",
      profile: (profile: LinkedInProfile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
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
    async jwt({ token, account }) {
      if (account) {
        token.linkedInUsed = account.provider === "linkedin";
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };