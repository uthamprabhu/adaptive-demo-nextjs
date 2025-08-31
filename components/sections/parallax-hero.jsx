"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -200]);     // background drift
  const yChair = useTransform(scrollYProgress, [0, 1], [0, -120]);  // chair parallax
  const opacityTitle = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[90vh] overflow-hidden hide-scrollbar">
      {/* Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=2400&auto=format&fit=crop"
          alt="Warm living space"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </motion.div>

      {/* Floating product */}
      <motion.div style={{ y: yChair }} className="absolute right-8 bottom-10 hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=2400&auto=format&fit=crop"
          alt="Designer chair"
          width={520}
          height={520}
          className="rounded-2xl shadow-soft"
        />
      </motion.div>

      {/* Title & CTA */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 lg:px-16">
        <motion.h1
          style={{ opacity: opacityTitle }}
          className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 max-w-2xl"
        >
          Live beautifully. Shop smart. Rent or buy furniture that fits your life.
        </motion.h1>
        <p className="mt-4 text-lg lg:text-xl text-gray-700 max-w-xl">
          Award-winning designs. Flexible plans. Delivery and setup done right.
        </p>
        <div className="mt-8 flex gap-3">
          <a
            href="#collections"
            className="px-6 py-3 rounded-2xl bg-brand-600 text-white hover:bg-brand-700 transition shadow-soft"
          >
            Explore Collections
          </a>
          <a
            href="#how-it-works"
            className="px-6 py-3 rounded-2xl border border-gray-300 hover:border-gray-400 transition"
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}