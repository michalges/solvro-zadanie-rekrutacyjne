"use client";

import type { MotionValue } from "motion/react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { Skeleton } from "./skeleton";

export function HeroParallax({
  products,
  loading,
}: {
  products: {
    title: string;
    thumbnail: string;
  }[];
  loading: boolean;
}) {
  const firstRow = [...products.slice(0, 7), ...products.slice(0, 7)];
  const secondRow = [...products.slice(7, 14), ...products.slice(7, 14)];
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 200, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-350, 200]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [350, -200]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-hidden bg-[radial-gradient(ellipse_50%_20%_at_50%_55%,rgba(62,138,255,0.2),transparent)] antialiased dark:bg-[radial-gradient(ellipse_60%_35%_at_50%_50%,rgba(62,138,255,0.25),transparent)]"
    >
      <Header />
      <motion.div className="bg-primary-foreground relative w-full border-t-2 pt-5">
        <motion.div className="mb-5 flex flex-row space-x-5">
          {loading ? (
            <>
              {Array.from({ length: 10 }).map(() => (
                <Skeleton
                  key={crypto.randomUUID()}
                  className="group/product relative h-96 w-72 shrink-0"
                />
              ))}
            </>
          ) : (
            firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={crypto.randomUUID()}
              />
            ))
          )}
        </motion.div>
        <motion.div className="mb-5 flex flex-row-reverse space-x-5 space-x-reverse">
          {loading ? (
            <>
              {Array.from({ length: 10 }).map(() => (
                <Skeleton
                  key={crypto.randomUUID()}
                  className="group/product relative h-96 w-72 shrink-0"
                />
              ))}
            </>
          ) : (
            secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={crypto.randomUUID()}
              />
            ))
          )}
        </motion.div>
        {/* <div className="pointer-events-none absolute inset-0 z-10 bg-linear-[90deg,var(--primary-foreground),transparent_10%,transparent_90%,var(--primary-foreground)]" /> */}
      </motion.div>
    </div>
  );
}

export function Header() {
  return (
    <header className="mx-auto w-full space-y-8 px-4 py-16 opacity-90 md:max-w-3xl md:py-36 xl:max-w-6xl">
      <h1 className="text-4xl font-bold whitespace-nowrap md:text-7xl dark:text-white">
        Solvro cocktails
      </h1>
      <p className="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
        Discover a variety of delicious cocktails crafted to perfection. Whether
        you&apos;re looking for a classic drink or something new, our collection
        has something for everyone. Explore our recipes and find your next
        favorite cocktail.
      </p>
      <InteractiveHoverButton>
        <Link href="/cocktails">Browse cocktails</Link>
      </InteractiveHoverButton>
    </header>
  );
}

export function ProductCard({
  product,
  translate,
}: {
  product: {
    title: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -10,
      }}
      key={product.title}
      className="group/product relative aspect-[3/4] h-64 shrink-0 overflow-hidden rounded-2xl border shadow-md md:h-96 dark:shadow-white/2"
    >
      <Image
        src={product.thumbnail}
        height="600"
        width="600"
        className="absolute inset-0 h-full w-full object-cover object-center"
        alt={product.title}
      />
      <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-t from-black to-transparent opacity-0 group-hover/product:opacity-80"></div>
      <h2 className="absolute bottom-4 left-4 text-sm font-semibold text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
}
