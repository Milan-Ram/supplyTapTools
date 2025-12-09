"use client";
import { ShieldCheck, Zap, BadgeCheck, Hammer } from "lucide-react";
import { colors } from "@/styles/colors";

export default function WhyChoose() {
  const features = [
    {
      icon: <ShieldCheck size={42} strokeWidth={1.5} />,
      title: "Authentic & Certified Tools",
      desc: "Genuine industrial-grade quality you can trust.",
    },
    {
      icon: <Zap size={42} strokeWidth={1.5} />,
      title: "Reliable Performance",
      desc: "Built for uninterrupted heavy-duty operations.",
    },
    {
      icon: <BadgeCheck size={42} strokeWidth={1.5} />,
      title: "Quality & Precision",
      desc: "Every product undergoes strict quality checks.",
    },
    {
      icon: <Hammer size={42} strokeWidth={1.5} />,
      title: "Durable Construction",
      desc: "Strong materials designed for long-term use.",
    },
  ];

  return (
    <section style={{ backgroundColor: colors.primary }} className="py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p
          className="text-sm tracking-wide mb-2 font-medium"
          style={{ color: colors.black }}
        >
          BUILT FOR CONSISTENT PERFORMANCE
        </p>

        <h2
          className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight"
          style={{ color: colors.black }}
        >
          WHY CHOOSE SUPPLYTAP TOOLS
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
              style={{ color: colors.black }}
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="text-lg font-bold mb-2">{item.title}</h3>

              <p className="text-sm leading-relaxed font-medium opacity-80">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
