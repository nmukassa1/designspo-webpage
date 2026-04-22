"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Chrome,
  Bookmark,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import { AnimatedDemo } from "@/components/animated-demo";
import { FeatureCards } from "@/components/feature-cards";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 right-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-chart-4/10 blur-3xl" />

        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-32 left-[15%] hidden lg:block"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-lg">
            <Bookmark className="h-7 w-7 text-primary" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-48 right-[15%] hidden lg:block"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card shadow-lg">
            <FolderOpen className="h-6 w-6 text-accent-foreground" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
          transition={{
            duration: 4.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-32 left-[20%] hidden lg:block"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card shadow-lg">
            <Sparkles className="h-5 w-5 text-chart-4" />
          </div>
        </motion.div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">
                Free Chrome Extension Available
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl leading-tight font-bold text-foreground md:text-5xl lg:text-6xl">
              Your Web Inspiration,{" "}
              <span className="text-primary">All in One Place.</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Capture, organize, and revisit web design ideas with ease. Avoid
              scattered bookmarks and endless accounts.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
              >
                Sign Up Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="https://chromewebstore.google.com/detail/curatemap-extension/cgfifloilikfidnhgdldmnmoooclefgi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:border-primary/30"
              >
                <Chrome className="h-5 w-5" />
                Download Extension
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-balance text-2xl font-bold text-foreground md:text-3xl">
              Inspiration everywhere, but never in one place.
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Bookmarks get messy. Screenshots get buried. This tool gives web
              designers a clean, central space to save and revisit design ideas
              straight from your browser with the Designspo Chrome extension.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              See how it works
            </h2>
            <p className="text-muted-foreground">
              Three simple steps to never lose inspiration again
            </p>
          </motion.div>
          <AnimatedDemo />
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              Everything you need
            </h2>
            <p className="text-muted-foreground">
              Powerful features to keep your design inspiration organized
            </p>
          </motion.div>
          <FeatureCards />
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Step 1
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground md:text-2xl">
                Your Dashboard: A Curated Gallery
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Access all your saved inspirations in one beautiful, organized
                dashboard. Categorize, tag, and search through your collection
                with ease, making it simple to find that perfect design when you
                need it.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="rounded-2xl border border-border bg-card p-4 shadow-lg">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, 
                          hsl(${15 + i * 20}, 65%, ${75 + (i % 2) * 8}%) 0%, 
                          hsl(${35 + i * 20}, 55%, ${65 + (i % 2) * 8}%) 100%)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 grid items-center gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl border border-border bg-card p-4 shadow-lg">
                <div className="mb-3 flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <div className="mx-2 flex-1 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    example.com
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                    <Sparkles className="h-3 w-3 text-primary-foreground" />
                  </div>
                </div>
                <div
                  className="aspect-video rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(200, 60%, 70%) 0%, hsl(220, 50%, 60%) 100%)",
                  }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent-foreground">
                Step 2
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground md:text-2xl">
                Capture Instantly with Our Chrome Extension
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                See something inspiring? Our intuitive Chrome extension lets you
                capture a screenshot and the URL of any webpage with a single
                click, directly adding it to your Designspo collection. No more
                manual saving or copy-pasting.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <CtaSection />
        </div>
      </section>

      <Footer />
    </div>
  );
}
