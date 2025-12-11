"use client";
import React, { useState } from "react";
import {
  Award,
  Users,
  TrendingUp,
  Heart,
  CheckCircle,
  Target,
  Zap,
  Shield,
  Clock,
  Globe,
  Wrench,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";

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

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const bgColor = isDarkMode ? colors.black : colors.white;
  const cardBg = isDarkMode ? colors.slate : "#f5f5f5";
  const textColor = isDarkMode ? colors.white : colors.black;
  const subtextColor = isDarkMode ? colors.lightGray : "#666666";
  const borderColor = isDarkMode ? colors.gray : "#e0e0e0";

  const router = useRouter();

  const stats: Stat[] = [
    {
      icon: <Users size={32} />,
      value: "50,000+",
      label: "Happy Customers",
    },
    {
      icon: <Package size={32} />,
      value: "10,000+",
      label: "Products Available",
    },
    {
      icon: <Clock size={32} />,
      value: "15+",
      label: "Years in Business",
    },
    {
      icon: <Globe size={32} />,
      value: "200+",
      label: "Cities Served",
    },
  ];

  const values: Value[] = [
    {
      icon: <Shield size={28} />,
      title: "Quality First",
      description:
        "We source only authentic products from trusted manufacturers, ensuring reliability and durability.",
    },
    {
      icon: <Heart size={28} />,
      title: "Customer Focused",
      description:
        "Your satisfaction is our priority. We provide personalized support and guidance for every purchase.",
    },
    {
      icon: <Zap size={28} />,
      title: "Innovation",
      description:
        "We constantly update our inventory with the latest tools and technologies to meet evolving needs.",
    },
    {
      icon: <Target size={28} />,
      title: "Integrity",
      description:
        "Transparent pricing, honest advice, and ethical business practices define how we operate.",
    },
  ];

  const milestones: Milestone[] = [
    {
      year: "2010",
      title: "The Beginning",
      description:
        "Started as a small hardware shop in Mumbai with a vision to serve local contractors and DIY enthusiasts.",
    },
    {
      year: "2015",
      title: "Expansion",
      description:
        "Opened three additional stores across Maharashtra and launched our online presence.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description:
        "Fully integrated e-commerce platform with same-day delivery in major cities.",
    },
    {
      year: "2025",
      title: "Industry Leader",
      description:
        "Serving over 50,000 customers nationwide with 10,000+ products and dedicated bulk order services.",
    },
  ];

  const team: TeamMember[] = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      bio: "25 years of experience in the hardware industry, passionate about empowering customers with the right tools.",
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      bio: "Expert in supply chain management, ensuring efficient delivery and inventory management.",
    },
    {
      name: "Amit Patel",
      role: "Customer Relations",
      bio: "Dedicated to building lasting relationships with our customers and understanding their unique needs.",
    },
  ];

  return (
    <div className="" style={{ backgroundColor: bgColor, minHeight: "100vh" }}>
      {/* Theme Toggle */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-4 py-2 border transition-all duration-300"
          style={{
            backgroundColor: isDarkMode ? colors.primary : colors.black,
            borderColor: borderColor,
            color: isDarkMode ? colors.black : colors.white,
          }}
        >
          <span className="text-sm font-bold tracking-wider uppercase">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div> */}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-1 h-8"
              style={{ backgroundColor: colors.primary }}
            />
            <span
              className="text-sm font-bold tracking-wider uppercase"
              style={{ color: colors.primary }}
            >
              About Us
            </span>
          </div>
          <h1
            className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            style={{ color: textColor }}
          >
            Building Excellence
            <br />
            Since 2010
          </h1>
          <p className="text-lg max-w-3xl" style={{ color: subtextColor }}>
            We're more than just a hardware store. We're your partner in
            bringing projects to life, providing quality tools, expert advice,
            and exceptional service to professionals and DIY enthusiasts across
            India.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 border text-center transition-all duration-300"
              style={{
                backgroundColor: cardBg,
                borderColor: borderColor,
              }}
            >
              <div
                className="inline-flex items-center justify-center mb-4"
                style={{ color: colors.primary }}
              >
                {stat.icon}
              </div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: textColor }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm uppercase tracking-wider"
                style={{ color: subtextColor }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section
        className="py-20 border-y"
        style={{
          backgroundColor: cardBg,
          borderColor: borderColor,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-1 h-6"
                  style={{ backgroundColor: colors.primary }}
                />
                <span
                  className="text-sm font-bold tracking-wider uppercase"
                  style={{ color: colors.primary }}
                >
                  Our Mission
                </span>
              </div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: textColor }}
              >
                Empowering Your Projects
              </h2>
              <p className="text-lg mb-6" style={{ color: subtextColor }}>
                Our mission is to be India's most trusted hardware partner,
                providing access to premium tools and materials while delivering
                exceptional customer service that exceeds expectations.
              </p>
              <p className="text-lg" style={{ color: subtextColor }}>
                We believe that everyone deserves access to quality tools and
                expert guidance, whether you're a seasoned contractor or
                tackling your first home improvement project.
              </p>
            </div>
            <div
              className="p-12 border flex items-center justify-center"
              style={{
                backgroundColor: isDarkMode ? colors.black : colors.white,
                borderColor: borderColor,
                minHeight: "400px",
              }}
            >
              <Wrench
                size={120}
                style={{ color: colors.primary, opacity: 0.3 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-1 h-6"
              style={{ backgroundColor: colors.primary }}
            />
            <span
              className="text-sm font-bold tracking-wider uppercase"
              style={{ color: colors.primary }}
            >
              Our Values
            </span>
          </div>
          <h2 className="text-4xl font-bold" style={{ color: textColor }}>
            What Drives Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredValue(index)}
              onMouseLeave={() => setHoveredValue(null)}
              className="p-8 border transition-all duration-300"
              style={{
                backgroundColor:
                  hoveredValue === index ? cardBg : "transparent",
                borderColor:
                  hoveredValue === index ? colors.primary : borderColor,
              }}
            >
              <div
                className="mb-4 transition-all duration-300"
                style={{
                  color: hoveredValue === index ? colors.primary : subtextColor,
                }}
              >
                {value.icon}
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: textColor }}
              >
                {value.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: subtextColor }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section
        className="py-20 border-y"
        style={{
          backgroundColor: cardBg,
          borderColor: borderColor,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-1 h-6"
                style={{ backgroundColor: colors.primary }}
              />
              <span
                className="text-sm font-bold tracking-wider uppercase"
                style={{ color: colors.primary }}
              >
                Our Journey
              </span>
            </div>
            <h2 className="text-4xl font-bold" style={{ color: textColor }}>
              15 Years of Growth
            </h2>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div
                  className="flex-shrink-0 w-24 h-24 border flex items-center justify-center"
                  style={{
                    backgroundColor: isDarkMode ? colors.black : colors.white,
                    borderColor: colors.primary,
                  }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: textColor }}
                  >
                    {milestone.title}
                  </h3>
                  <p className="text-lg" style={{ color: subtextColor }}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-1 h-6"
              style={{ backgroundColor: colors.primary }}
            />
            <span
              className="text-sm font-bold tracking-wider uppercase"
              style={{ color: colors.primary }}
            >
              Our Team
            </span>
          </div>
          <h2 className="text-4xl font-bold" style={{ color: textColor }}>
            Meet the People Behind Our Success
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="p-8 border text-center transition-all duration-300"
              style={{
                backgroundColor: cardBg,
                borderColor: borderColor,
              }}
            >
              <div
                className="w-24 h-24 mx-auto mb-6 border flex items-center justify-center"
                style={{
                  backgroundColor: isDarkMode ? colors.black : colors.white,
                  borderColor: colors.primary,
                }}
              >
                <Users size={40} style={{ color: colors.primary }} />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: textColor }}
              >
                {member.name}
              </h3>
              <p
                className="text-sm font-bold mb-4 uppercase tracking-wider"
                style={{ color: colors.primary }}
              >
                {member.role}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: subtextColor }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 border-t"
        style={{
          backgroundColor: cardBg,
          borderColor: borderColor,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: textColor }}>
            Ready to Start Your Next Project?
          </h2>
          <p className="text-lg mb-8" style={{ color: subtextColor }}>
            Join thousands of satisfied customers who trust us for their
            hardware needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
              onClick={() => {
                router.push("/store");
              }}
            >
              Browse Products
            </button>
            <button
              className="px-8 py-4 border font-bold text-sm tracking-wider uppercase transition-all duration-300"
              style={{
                borderColor: borderColor,
                color: textColor,
                backgroundColor: "transparent",
              }}
              onClick={() => {
                router.push("/contact");
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
