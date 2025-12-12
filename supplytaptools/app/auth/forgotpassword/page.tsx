"use client";
import { useState } from "react";
import {
  Moon,
  Sun,
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleResetPassword = async () => {
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
      setIsLoading(false);
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email. Please try again.");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && !success) {
      handleResetPassword();
    }
  };

  const bgColor = isDarkMode ? colors.black : colors.white;
  const cardBg = isDarkMode ? colors.slate : colors.white;
  const textColor = isDarkMode ? colors.white : colors.black;
  const borderColor = isDarkMode ? colors.gray : "#e5e7eb";
  const inputBg = isDarkMode ? colors.dark : "#f9fafb";
  const secondaryText = isDarkMode ? colors.lightGray : "#6b7280";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300 py-20"
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
        {/* Success Message */}
        {success ? (
          <div className="text-center space-y-6">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
              style={{ backgroundColor: colors.success + "20" }}
            >
              <CheckCircle size={32} style={{ color: colors.success }} />
            </div>

            <div>
              <h1
                className="text-2xl font-bold tracking-tight mb-2"
                style={{ color: textColor }}
              >
                Check Your Email
              </h1>
              <p style={{ color: secondaryText }} className="text-sm">
                We've sent password reset instructions to
              </p>
              <p
                className="text-sm font-bold mt-2"
                style={{ color: colors.primary }}
              >
                {email}
              </p>
            </div>

            <div
              className="p-4 border text-left space-y-2"
              style={{
                backgroundColor: inputBg,
                borderColor: borderColor,
              }}
            >
              <p className="text-sm font-bold" style={{ color: textColor }}>
                What's next?
              </p>
              <ul
                className="text-sm space-y-1"
                style={{ color: secondaryText }}
              >
                <li>1. Check your email inbox</li>
                <li>2. Click the reset link</li>
                <li>3. Create a new password</li>
                <li>4. Login with your new password</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
                className="w-full py-4 border font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-80"
                style={{
                  borderColor: borderColor,
                  backgroundColor: inputBg,
                  color: textColor,
                }}
              >
                Send Another Email
              </button>

              <a
                href="/login"
                className="block w-full py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 text-center hover:opacity-90"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                Back to Login
              </a>
            </div>

            <p className="text-xs" style={{ color: secondaryText }}>
              Didn’t receive the email? Check your spam folder or try again.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <a
                href="/login"
                className="inline-flex items-center gap-2 mb-6 text-sm font-bold tracking-wider uppercase transition-colors duration-300"
                style={{ color: secondaryText }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.primary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = secondaryText)
                }
              >
                <ArrowLeft size={16} />
                Back to Login
              </a>

              <h1
                className="text-3xl font-bold tracking-tight mb-2"
                style={{ color: textColor }}
              >
                Forgot Password?
              </h1>
              <p style={{ color: secondaryText }} className="text-sm">
                No worries! Enter your email and we'll send you reset
                instructions.
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
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: colors.danger }}
                />
                <p className="text-sm" style={{ color: colors.danger }}>
                  {error}
                </p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-6">
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
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{ color: secondaryText }}
                  />
                  <input
                    className="w-full pl-10 pr-4 py-3 border transition-all duration-300 focus:outline-none"
                    style={{
                      backgroundColor: inputBg,
                      borderColor: borderColor,
                      color: textColor,
                    }}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = colors.primary)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = borderColor)
                    }
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              {/* Help Box */}
              <div
                className="p-4 border"
                style={{
                  backgroundColor: inputBg,
                  borderColor: borderColor,
                }}
              >
                <p
                  className="text-xs font-bold tracking-wider uppercase mb-2"
                  style={{ color: textColor }}
                >
                  Remember your password?
                </p>
                <p className="text-xs" style={{ color: secondaryText }}>
                  Try logging in again or create a new account if you're new
                  here.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-3 text-center text-sm">
                <a
                  href="/auth/signin"
                  className="flex-1 py-3 border font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:opacity-80"
                  style={{
                    borderColor: borderColor,
                    color: textColor,
                  }}
                >
                  Login
                </a>
                <a
                  href="/auth/signup"
                  className="flex-1 py-3 border font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:opacity-80"
                  style={{
                    borderColor: borderColor,
                    color: textColor,
                  }}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
