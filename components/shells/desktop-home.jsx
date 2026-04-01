"use client";

import { useEffect } from "react";
import ParallaxHero from "../sections/parallax-hero";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button, Card, CardContent, CardActions, Chip } from "@mui/material";
import { gsap } from "gsap";
import ThemeToggle from "@/components/theme-toggle";
import StoryShare from "@/components/story-share";

const products = [
  {
    title: "Scandinavian Sofa",
    img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1600&auto=format&fit=crop",
    price: "₹999/mo - or - ₹24,999"
  },
  {
    title: "Minimal Work Desk",
    img: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1600&auto=format&fit=crop",
    price: "₹599/mo - or - ₹14,499"
  },
  {
    title: "Ergo Task Chair",
    img: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=2400&auto=format&fit=crop",
    price: "₹399/mo - or - ₹8,999"
  },
  {
    title: "Queen Bed Frame",
    img: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=2400&auto=format&fit=crop",
    price: "₹1,199/mo - or - ₹29,999"
  }
];

export default function DesktopHome() {
  useEffect(() => {
    // small GSAP flourish on mount
    gsap.from(".fade-in", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" });
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 bg-[color:color-mix(in_oklab,var(--surface)_82%,transparent)] backdrop-blur border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="font-extrabold text-xl tracking-tight">FurniFlow</div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#collections" className="hover:text-brand-700">Collections</a>
            <a href="#how-it-works" className="hover:text-brand-700">How it works</a>
            <a href="#about" className="hover:text-brand-700">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outlined" size="small">Sign in</Button>
            <Button variant="contained" size="small">Get started</Button>
          </div>
        </div>
      </header>

      <ParallaxHero />

      {/* Featured collections */}
      <section id="collections" className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold fade-in">Curated Collections</h2>
          <Chip label="Rent -or- Buy" color="primary" variant="outlined" className="fade-in" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <Card key={i} className="overflow-hidden shadow-soft fade-in">
              <div className="relative h-48">
                <Image src={p.img} alt={p.title} fill className="object-cover" />
              </div>
              <CardContent>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-[var(--text-muted)] mt-1">{p.price}</div>
              </CardContent>
              <CardActions className="px-4 pb-4">
                <Button size="small" variant="contained">View</Button>
                <Button size="small" variant="text">Add to cart</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[var(--surface-muted)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 fade-in">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Pick your style", d: "Choose from award-winning designs." },
              { t: "Flex your plan", d: "Rent monthly or buy outright." },
              { t: "We deliver", d: "White-glove delivery and setup." }
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-soft fade-in">
                <div className="text-lg font-semibold">{s.t}</div>
                <p className="text-[var(--text-muted)] mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-16">
        <StoryShare className="fade-in" />
      </section>

      <footer id="about" className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} FurniFlow. Flexible living. Smarter choices.
        </div>
      </footer>
    </main>
  );
}
