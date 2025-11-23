import React from "react";
import { signIn, useSession } from "@/lib/auth-client";

const LoginButton = () => {
  const session = useSession();

  if (session.data) {
    return null;
  }

  function handleLogin() {
    signIn.social({
      provider: "spotify",
      callbackURL: "/",
    });
  }
  return (
    <button
      onClick={handleLogin}
      className="fixed top-8 right-8 bg-green-500 hover:bg-green-600 text-white font-medium rounded-2xl flex items-center gap-2 shadow-lg transition-colors"
    >
      Login with Spotify
    </button>
  );
};

export default LoginButton;
