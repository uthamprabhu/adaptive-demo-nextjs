"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/HomeRounded";
import CategoryIcon from "@mui/icons-material/CategoryRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartRounded";
import PersonIcon from "@mui/icons-material/PersonRounded";
import { Button, Chip } from "@mui/material";
import { gsap } from "gsap";

const picks = [
  {
    title: "Starter Living Room",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
    price: "₹799/mo"
  },
  {
    title: "Work From Home",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    price: "₹699/mo"
  },
  {
    title: "Minimal Bedroom",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    price: "₹999/mo"
  }
];

export default function MobileHome() {
  useEffect(() => {
    gsap.from(".m-fade", { y: 16, opacity: 0, duration: 0.6, stagger: 0.06 });
  }, []);

  return (
    <main className="min-h-screen pb-20">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="font-bold">FurniFlow</div>
          <Button variant="outlined" size="small">Sign in</Button>
        </div>
      </header>

      {/* Simple hero - lighter than desktop parallax */}
      <section className="px-4 pt-4">
        <div className="relative h-44 rounded-2xl overflow-hidden m-fade">
          <Image
            src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1600&auto=format&fit=crop"
            alt="Living set"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="text-lg font-semibold">Rent or buy furniture with ease</div>
            <div className="text-xs text-white/90 mt-1">Fast delivery. Easy swaps.</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 m-fade">
          <h2 className="text-base font-semibold">Popular picks</h2>
          <Chip label="New" size="small" color="primary" variant="outlined" />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3 px-0">
          {picks.map((p, idx) => (
            <motion.a
              whileTap={{ scale: 0.98 }}
              href="#"
              key={idx}
              className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-soft m-fade"
            >
              <div className="relative h-28">
                <Image src={p.img} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-2">
                <div className="text-sm font-semibold line-clamp-1">{p.title}</div>
                <div className="text-xs text-gray-600">{p.price}</div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-4 mb-6 m-fade">
          <Button fullWidth variant="contained" className="rounded-xl">Browse all</Button>
        </div>
      </section>

      {/* Bottom Nav like Swiggy */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="h-16 grid grid-cols-4">
          {[
            { icon: <HomeIcon />, label: "Home" },
            { icon: <CategoryIcon />, label: "Shop" },
            { icon: <ShoppingCartIcon />, label: "Cart" },
            { icon: <PersonIcon />, label: "Account" }
          ].map((it, i) => (
            <button
              key={i}
              className="flex flex-col items-center justify-center text-gray-700 hover:text-brand-700"
            >
              {it.icon}
              <span className="text-[11px] mt-0.5">{it.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}
