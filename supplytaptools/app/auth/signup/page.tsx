"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun, Mail, Lock, User, Chrome, Loader } from "lucide-react";
import { loginWithGoogle, registerEmailPassword } from "@/Firebase/auth";

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

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      await registerEmailPassword(email, password, name);

      router.push("/cart");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();

      alert("Google login initiated!");

      // ⬇ Redirect after Google login
      router.push("/cart");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
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
        className="w-full max-w-md px-8 py-4 border transition-all duration-300"
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
            Create Account
          </h1>
          <p style={{ color: secondaryText }} className="text-sm">
            Join us and start your journey
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label
              className="text-xs font-bold tracking-wider uppercase mb-2 block"
              style={{ color: secondaryText }}
            >
              Full Name
            </label>
            <div className="relative">
              <User
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
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <label
              className="text-xs font-bold tracking-wider uppercase mb-2 block"
              style={{ color: secondaryText }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: secondaryText }}
              />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: inputBg,
                  borderColor: borderColor,
                  color: textColor,
                }}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full py-4 font-bold text-sm tracking-wider flex items-center justify-center uppercase transition-all duration-300 hover:opacity-90 mt-6"
            style={{
              backgroundColor: isLoading ? colors.dark : colors.primary,
              color: colors.black,
            }}
          >
            {isLoading ? (
              <Loader className="animate-spin text-white" />
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: borderColor }}
            />
            <span
              className="text-xs font-bold tracking-wider uppercase"
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
            className="w-full py-4 border font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-80 flex items-center justify-center gap-2"
            style={{
              borderColor: borderColor,
              backgroundColor: inputBg,
              color: textColor,
            }}
          >
            {isLoading ? (
              <Loader className="animate-spin text-white" />
            ) : (
              <>
                <Chrome size={18} />
                Continue with Google
              </>
            )}
          </button>

          {/* Login Link */}
          <p
            className="text-center mt-6 text-sm"
            style={{ color: secondaryText }}
          >
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="font-bold transition-colors duration-300"
              style={{ color: colors.primary }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
