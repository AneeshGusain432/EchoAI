import { useGoogleLogin } from "@react-oauth/google";
import { Sparkles } from "lucide-react";
import { useGoogleAuthMutation } from "../api/auth/auth";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { BackgroundGrid } from "../utils/BackgroundGrid";

export default function AuthPage() {
  const googleAuthMutation = useGoogleAuthMutation();

  const googleSignin = useGoogleLogin({
    onSuccess: (authResponse) => {
      googleAuthMutation.mutate(authResponse.code);
    },
    onError: (error) => {
      throw error;
    },
    flow: "auth-code",
    scope: [
      "openid",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/calendar",
    ].join(" "),
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <BackgroundGrid />
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#2563eb15,transparent_60%)]" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-[32px] border border-blue-500/15 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-2xl shadow-black/50">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">
                Welcome to Echo AI
              </h1>

              <p className="mt-3 text-zinc-400">
                Your AI executive assistant for Gmail and Google Calendar.
              </p>
            </div>

            {/* Google Button */}
            <button
              onClick={() => googleSignin()}
              className="
              mt-8
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white
              px-5
              py-4
              text-sm
              font-medium
              text-black
              transition-all
              hover:scale-[1.02]
            "
            >
              {!googleAuthMutation.isPending && (
                <svg className="h-5 w-5" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.7 15.2 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.2 0 10-2 13.4-5.2l-6.2-5.2C29.2 35.6 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.3 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.7-6.2 7.4l6.2 5.2C39.6 36.8 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
                  />
                </svg>
              )}
              {googleAuthMutation.isPending ? (
                <span className="flex items-center gap-2 text-gray-950">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </span>
              ) : (
                <span>Continue with Google</span>
              )}
            </button>

            {/* Trust */}
            <div className="mt-6 text-center">
              <p className="text-xs text-zinc-500">
                Secure Google OAuth • No Passwords • End-to-End Encryption
              </p>
            </div>

            {/* Terms */}
            <p className="mt-8 text-center text-xs text-zinc-600">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
