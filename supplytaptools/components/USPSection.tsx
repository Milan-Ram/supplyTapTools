"use client";

import { colors } from "@/styles/colors";
import React from "react";

const reasons = [
  {
    id: 1,
    title: "Trusted Expertise",
    description:
      "With years of experience in supply chain technology, SupplyTap Tools delivers reliable and cutting-edge solutions tailored to your business needs.",
    icon: (
      <svg
        className="w-10 h-10 text-indigo-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m1 4a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Comprehensive Solutions",
    description:
      "From hardware to software and services, we provide a complete suite of products to streamline your supply chain management effortlessly.",
    icon: (
      <svg
        className="w-10 h-10 text-purple-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7h18M3 12h18M3 17h18"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "User-Friendly Design",
    description:
      "We prioritize simplicity and usability — our tools are designed with your team in mind, ensuring smooth adoption and minimal learning curve.",
    icon: (
      <svg
        className="w-10 h-10 text-pink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Outstanding Support",
    description:
      "Our dedicated support team is always ready to help you with setup, troubleshooting, and advice to maximize your investment.",
    icon: (
      <svg
        className="w-10 h-10 text-green-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9l-6 6-3-3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
];

export default function WhyChoose() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className=" py-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Why Choose <span className={`text-yellow-400`}>SupplyTap Tools</span>
        </h1>
        <p className="text-lg md:text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the advantages that set us apart in supply chain technology,
          delivering quality, reliability, and user-friendly solutions for your
          business success.
        </p>
      </section>

      {/* Reasons Grid */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {reasons.map(({ id, title, description, icon }) => (
          <div
            key={id}
            className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-6">{icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
