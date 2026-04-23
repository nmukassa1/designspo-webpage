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
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-4 pt-32 pb-16 md:pt-20 md:pb-24">
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

      <section className="px-4 pb-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-5xl"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <div className="rounded-2xl border border-border bg-card p-2 shadow-lg">
                <Image
                  src="/dashboard-page.png"
                  alt="Dashboard Example"
                  className="h-auto w-full rounded-xl object-cover"
                  width={1200}
                  height={800}
                />
              </div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="absolute -bottom-4 right-3 z-20 w-[30%] sm:-bottom-5 sm:right-4 sm:w-[24%] md:-bottom-18 md:right-14 md:w-[22%]"
              >
                <div className="rounded-2xl border border-border bg-card p-1.5 shadow-xl sm:p-2">
                  <Image
                    src="/extension.png"
                    alt="Extension UI Example"
                    className="h-auto w-full rounded-xl object-cover"
                    width={750}
                    height={900}
                  />
                </div>
              </motion.div>
            </motion.div>
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
        <div className="mx-auto max-w-3xl">
          <CtaSection />
        </div>
      </section>

      <Footer />
    </div>
  );
}
