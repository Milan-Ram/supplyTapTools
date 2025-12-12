"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Moon,
  Sun,
  Mail,
  Lock,
  Chrome,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { loginEmailPassword, loginWithGoogle } from "@/Firebase/auth";

const colors = {
  primary: "#ebdb00ff",
  secondary: "#ebdb00ff",
  black: "#0a0a0a",
  slate: "#1a1a1a",
  dark: "#0f0f0f",
  gray: "#404040",
  lightGray: "#a0a0a0",
  white: "#ffffff",
  light: "#d4d4d4",
  success: "#10b981",
  accent: "#06b6d4",
  darker: "#020617",
  danger: "#DC3545",
  warning: "#FFC107",
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await loginEmailPassword(email, password);
      router.push("/cart");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      await loginWithGoogle();
      router.push("/cart");
    } catch (err: any) {
      setError(err.message || "Google login failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) handleLogin();
  };

  const bgColor = isDarkMode ? colors.black : colors.white;
  const cardBg = isDarkMode ? colors.slate : colors.white;
  const textColor = isDarkMode ? colors.white : colors.black;
  const borderColor = isDarkMode ? colors.gray : "#e5e7eb";
  const inputBg = isDarkMode ? colors.dark : "#f9fafb";
  const secondaryText = isDarkMode ? colors.lightGray : "#6b7280";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="w-full max-w-md p-8 border transition-all duration-300"
        style={{
          backgroundColor: cardBg,
          borderColor: borderColor,
          boxShadow: isDarkMode ? "none" : "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold tracking-tight mb-2"
            style={{ color: textColor }}
          >
            Welcome Back
          </h1>
          <p className="text-sm" style={{ color: secondaryText }}>
            Login to continue shopping
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="mb-6 p-4 border flex items-start gap-3"
            style={{
              backgroundColor: isDarkMode ? colors.darker : "#fef2f2",
              borderColor: colors.danger,
            }}
          >
            <AlertCircle
              size={18}
              className="mt-0.5"
              style={{ color: colors.danger }}
            />
            <p className="text-sm" style={{ color: colors.danger }}>
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label
              className="text-xs font-bold tracking-wider uppercase mb-2 block"
              style={{ color: secondaryText }}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: secondaryText }}
              />

              <input
                className="w-full pl-10 pr-4 py-3 border focus:outline-none transition-all duration-300"
                style={{
                  backgroundColor: inputBg,
                  borderColor: borderColor,
                  color: textColor,
                }}
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading || isGoogleLoading}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    colors.primary)
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    borderColor)
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: secondaryText }}
              >
                Password
              </label>
              <a
                href="/auth/forgotpassword"
                className="text-xs font-bold uppercase"
                style={{ color: colors.primary }}
              >
                Forgot?
              </a>
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: secondaryText }}
              />

              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border focus:outline-none transition-all duration-300"
                style={{
                  backgroundColor: inputBg,
                  borderColor: borderColor,
                  color: textColor,
                }}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading || isGoogleLoading}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    colors.primary)
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    borderColor)
                }
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading || isGoogleLoading}
            className="w-full py-4 font-bold text-sm uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 disabled:opacity-50"
            style={{
              backgroundColor: colors.primary,
              color: colors.black,
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: borderColor }}
            />
            <span
              className="text-xs uppercase font-bold"
              style={{ color: secondaryText }}
            >
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: borderColor }}
            />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={isLoading || isGoogleLoading}
            className="w-full py-4 border font-bold text-sm uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-80 disabled:opacity-50"
            style={{
              borderColor: borderColor,
              backgroundColor: inputBg,
              color: textColor,
            }}
          >
            {isGoogleLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Chrome size={18} />
                Continue with Google
              </>
            )}
          </button>

          {/* Signup Link */}
          <p
            className="text-center mt-6 text-sm"
            style={{ color: secondaryText }}
          >
            Don’t have an account?{" "}
            <a
              href="/auth/signup"
              className="font-bold"
              style={{ color: colors.primary }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
