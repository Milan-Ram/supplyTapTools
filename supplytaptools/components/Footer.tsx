"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Send,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { colors } from "@/styles/colors";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    icon: <Facebook size={18} />,
    href: "https://facebook.com",
    gradient: "from-blue-600 to-blue-500",
  },
  {
    name: "Instagram",
    icon: <Instagram size={18} />,
    href: "https://instagram.com",
    gradient: "from-pink-600 via-purple-600 to-orange-500",
  },
  {
    name: "Twitter",
    icon: <Twitter size={18} />,
    href: "https://twitter.com",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    name: "YouTube",
    icon: <Youtube size={18} />,
    href: "https://youtube.com",
    gradient: "from-red-600 to-red-500",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={18} />,
    href: "https://linkedin.com",
    gradient: "from-blue-700 to-blue-600",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email && email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer
      className="relative w-full overflow-hidden bg-black rounded-t-3xl "
      // style={{ backgroundColor: colors.darker }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}40 0%, transparent 70%)`,
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -50px) scale(1.1); }
          50% { transform: translate(-30px, 30px) scale(0.9); }
          75% { transform: translate(40px, 20px) scale(1.05); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6 lg:pt-20 lg:pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left: Brand & Newsletter */}
          <div className="space-y-8">
            {/* Brand */}
            <div className="space-y-2">
              <div className=" flex items-center gap-2">
                <a href="#">
                  <img
                    src="/logo1.png" // ← your logo file in /public/logo.png
                    alt="SupplyTap Logo"
                    className="h-10 w-auto"
                  />
                </a>
                <h2 className="text-2xl lg:text-4xl ml-2 -mt-3 font-bold text-white">
                  SupplyTap Tools
                </h2>
              </div>
              <p
                className="text-base lg:text-md leading-relaxed max-w-md"
                style={{ color: colors.lightGray }}
              >
                Revolutionizing supply chain management with cutting-edge
                technology. Your trusted partner in operational excellence.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3
                className="text-xl font-semibold"
                style={{ color: colors.white }}
              >
                Stay Updated 📬
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm"
                  style={{
                    backgroundColor: `${colors.slate}80`,
                    color: colors.white,
                    border: `1px solid ${colors.gray}50`,
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
                  style={{
                    background: subscribed
                      ? colors.success
                      : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: colors.black,
                  }}
                >
                  {subscribed ? (
                    <>✓ Subscribed!</>
                  ) : (
                    <>
                      Subscribe <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3
                className="text-lg font-semibold"
                style={{ color: colors.white }}
              >
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className={`group relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                    style={{
                      backgroundColor:
                        hoveredSocial === social.name
                          ? colors.slate
                          : `${colors.slate}60`,
                      border: `1px solid ${
                        hoveredSocial === social.name
                          ? colors.primary
                          : colors.gray
                      }40`,
                    }}
                  >
                    <div style={{ color: colors.white }}>{social.icon}</div>
                    {hoveredSocial === social.name && (
                      <span
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap"
                        style={{
                          backgroundColor: colors.slate,
                          color: colors.white,
                        }}
                      >
                        {social.name}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact & Map */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <h3
                className="text-xl font-semibold mb-6"
                style={{ color: colors.white }}
              >
                Get In Touch
              </h3>

              {/* Email Card */}
              <a
                href="mailto:support@supplytaptools.com"
                className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{
                  backgroundColor: `${colors.slate}60`,
                  border: `1px solid ${colors.gray}40`,
                }}
              >
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Mail size={20} style={{ color: colors.dark }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: colors.lightGray }}>
                    Email Us
                  </p>
                  <p
                    className="font-medium group-hover:text-white transition-colors"
                    style={{ color: colors.white }}
                  >
                    support@supplytaptools.com
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: colors.primary }}
                />
              </a>

              {/* Phone Card */}
              <a
                href="tel:+919876543210"
                className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{
                  backgroundColor: `${colors.slate}60`,
                  border: `1px solid ${colors.gray}40`,
                }}
              >
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <Phone size={20} style={{ color: colors.dark }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: colors.lightGray }}>
                    Call Us
                  </p>
                  <p
                    className="font-medium group-hover:text-white transition-colors"
                    style={{ color: colors.white }}
                  >
                    +91 9876543210
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: colors.secondary }}
                />
              </a>

              {/* Location Card */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  backgroundColor: `${colors.slate}60`,
                  border: `1px solid ${colors.gray}40`,
                }}
              >
                <div
                  className="p-3 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: colors.primary }}
                >
                  <MapPin size={20} style={{ color: colors.dark }} />
                </div>
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: colors.lightGray }}
                  >
                    Visit Us
                  </p>
                  <p
                    className="font-medium text-sm"
                    style={{ color: colors.white }}
                  >
                    123 Business District, Mumbai, Maharashtra 400001, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div
          className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          style={{ border: `1px solid ${colors.gray}40` }}
        >
          <div className="relative h-64 md:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.082177513679726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SupplyTap Tools Location"
              className="grayscale-[0.3] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: `${colors.gray}30` }}
        >
          <p
            className="text-sm text-center md:text-left"
            style={{ color: colors.lightGray }}
          >
            © {new Date().getFullYear()}{" "}
            <span style={{ color: colors.white }}>SupplyTap Tools</span>.
            Crafted with 💜 in India
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy", "Terms", "Cookies", "Legal"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm transition-all duration-300 hover:translate-x-1 flex items-center gap-1"
                style={{ color: colors.lightGray }}
              >
                {item}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
