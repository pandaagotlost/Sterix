import type { NextAuthConfig } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const authConfig: NextAuthConfig = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
}
