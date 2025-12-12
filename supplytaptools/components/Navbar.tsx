"use client";
import React, { useState, useEffect } from "react";
import { HeartIcon, Menu, ShoppingBag, X } from "lucide-react";
import { colors } from "@/styles/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/store" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Support", href: "#footer" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isDark, setIsDark] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={isDark ? "white" : ""}>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? (isDark ? "shadow-lg" : "shadow-lg") : "bg-transparent"
        }`}
        style={{
          backgroundColor: "rgba(0,0,0,0.55)", // ★ Transparent Yellow on Scroll

          backdropFilter: scrolled ? "blur(6px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center md:gap-2"
              onClick={() => {
                router.push("/");
              }}
            >
              <img
                src="/logo1.png"
                alt="SupplyTap Logo"
                className=" h-9 md:h-10 w-auto"
              />

              <a
                href="#"
                className=" text-xl md:text-2xl ml-2 -mt-3 font-bold transition-all duration-300"
                style={{
                  color:
                    scrolled || isOpen
                      ? isDark
                        ? colors.white
                        : colors.white
                      : colors.white,
                }}
              >
                SupplyTap Tools
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <span
                  key={link.name}
                  onClick={() => {
                    setActiveLink(link.name);
                    router.push(link.href);
                  }}
                  className="relative py-2 text-sm font-medium transition-all duration-300 group cursor-pointer"
                  style={{
                    color:
                      scrolled || isOpen
                        ? isDark
                          ? colors.light
                          : colors.white
                        : colors.white,
                  }}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 ${
                      activeLink === link.name
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ backgroundColor: colors.primary }}
                  />
                </span>
              ))}

              <HeartIcon
                className={`${
                  activeLink === "wishlist" ? "text-red-500" : "text-slate-300"
                } cursor-pointer w-[20px]`}
                onClick={() => {
                  setActiveLink("wishlist");
                  router.push("/wishlist");
                }}
              />
              <ShoppingBag
                className={`${
                  activeLink === "cart" ? "text-yellow-500" : "text-slate-300"
                } cursor-pointer w-[20px]`}
                onClick={() => {
                  setActiveLink("cart");
                  router.push("/cart");
                }}
              />
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110 bg-transparent"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => {
                  router.push("/auth/signin");
                }}
                className=" transition-all duration-300 hover:scale-105 hover:bg-yellow-300 text-sm -ml-3 px-5 py-1.5 bg-white rounded-2xl"
              >
                {isAuth ? "Hi User" : "Login"}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden -mt-1 flex items-center space-x-4">
              <HeartIcon
                className={`${
                  activeLink === "wishlist" ? "text-red-500" : "text-white"
                } cursor-pointer w-[20px]`}
                onClick={() => {
                  setActiveLink("wishlist");
                  router.push("/wishlist");
                }}
              />
              <ShoppingBag
                className={`${
                  activeLink === "cart" ? "text-yellow-500" : "text-white"
                } cursor-pointer w-[20px]`}
                onClick={() => {
                  setActiveLink("cart");
                  router.push("/cart");
                }}
              />
              <button
                onClick={toggleTheme}
                className=" rounded-lg transition-all duration-300"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
              <button
                onClick={toggleMenu}
                className=" rounded-lg transition-all duration-300 hover:scale-110"
                style={{
                  color: scrolled
                    ? isDark
                      ? colors.white
                      : colors.white
                    : colors.white,
                }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            backgroundColor: isDark ? colors.white : "rgba(255,255,0,0.25)",
          }}
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setIsOpen(false);
                }}
                className="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:translate-x-2"
                style={{
                  color: isDark ? colors.light : colors.white,
                  backgroundColor:
                    activeLink === link.name
                      ? isDark
                        ? colors.secondary
                        : colors.primary
                      : "transparent",
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
