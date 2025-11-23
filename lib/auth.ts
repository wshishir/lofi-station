import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    type: "memory",
  },
  socialProviders: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,

      //what permissions we need from spotify
      scope: [
        "user-read-email", // Get user email
        "user-read-private", // Get user profile
        "user-modify-playback-state", // Control playback (play/pause)
        "user-read-playback-state", // See what's playing
        "streaming", // Play music in browser
      ],
    },
  },
  emailAndPassword: {
    enabled: false,
  },
});
