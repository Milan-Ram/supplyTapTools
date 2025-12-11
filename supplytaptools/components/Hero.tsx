"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative h-[100vh] w-full overflow-hidden">
      {/* Background Image using Next.js Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero2.jpeg" // <-- your image from /public
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-4xl md:text-6xl font-bold leading drop-shadow-lg"
        >
          Tools That Work
          <br />
          <span className="font-bold">As Hard As You Do</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-3 max-w-xl text-md md:text-lg text-gray-200 drop-shadow"
        >
          Premium, durable tools trusted by thousands of professionals across
          India.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-9 flex gap-4"
        >
          <button
            onClick={() => {
              router.push("/store");
            }}
            className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Explore Products
          </button>

          <button
            onClick={() => {
              router.push("/contact");
            }}
            className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            Contact Us
          </button>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-white font-semibold text-sm bg-yellow-500/50 backdrop-blur-sm px-3 py-1 rounded-md w-fit border border-white/20"
        >
          Trusted by 500+ Contractors
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-1.5 h-8 bg-white/40 rounded-full mx-auto animate-pulse"></div>
      </div>
    </section>
  );
}
