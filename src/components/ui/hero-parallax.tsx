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
  const row = products.slice(0, 3);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 200, damping: 30, bounce: 100 };
  const [vw, setVw] = React.useState(0);
  const [vh, setVh] = React.useState(0);

  React.useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);

    const handleResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const translateX1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.1 * vw, 0]),
    springConfig,
  );
  const translateX2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 0]),
    springConfig,
  );
  const translateX3 = useSpring(
    useTransform(scrollYProgress, [0, 1], [-0.1 * vw, 0]),
    springConfig,
  );

  const translateY1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [-0.3 * vh, 0]),
    springConfig,
  );
  const translateY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [-0.5 * vh, 0]),
    springConfig,
  );
  const translateY3 = useSpring(
    useTransform(scrollYProgress, [0, 1], [-0.2 * vh, 0]),
    springConfig,
  );

  const scale1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.7, 1]),
    springConfig,
  );
  const scale2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.7, 1]),
    springConfig,
  );
  const scale3 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.7, 1]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-hidden bg-[radial-gradient(ellipse_50%_20%_at_50%_55%,rgba(62,138,255,0.2),transparent)] antialiased dark:bg-[radial-gradient(ellipse_60%_35%_at_50%_50%,rgba(62,138,255,0.25),transparent)]"
    >
      <Header />
      <motion.div className="bg-primary-foreground relative flex h-screen w-full items-center justify-center space-x-4 border-t-2 p-4">
        {loading ? (
          <>
            {Array.from({ length: 10 }).map(() => (
              <Skeleton
                key={crypto.getRandomValues(new Uint32Array(1))[0].toString()}
                className="group/product relative h-96 w-72 shrink-0"
              />
            ))}
          </>
        ) : (
          <>
            <ProductCard
              product={row[0]}
              translateX={translateX1}
              translateY={translateY1}
              scale={scale1}
              key={crypto.getRandomValues(new Uint32Array(1))[0].toString()}
            />
            <ProductCard
              product={row[1]}
              translateX={translateX2}
              translateY={translateY2}
              scale={scale2}
              key={crypto.getRandomValues(new Uint32Array(1))[0].toString()}
            />
            <ProductCard
              product={row[2]}
              translateX={translateX3}
              translateY={translateY3}
              scale={scale3}
              key={crypto.getRandomValues(new Uint32Array(1))[0].toString()}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}

export function Header() {
  return (
    <header className="mx-auto w-full space-y-8 px-4 pt-16 pb-32 opacity-90 md:max-w-3xl md:pt-36 md:pb-54 xl:max-w-6xl">
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
  translateX,
  translateY,
  scale,
}: {
  product: {
    title: string;
    thumbnail: string;
  };
  translateX: MotionValue<number>;
  translateY: MotionValue<number>;
  scale: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{
        x: translateX,
        y: translateY,
        scale,
      }}
      key={product.title}
      className="group/product relative aspect-square w-1/3 overflow-hidden rounded-2xl border shadow-md dark:shadow-white/2"
    >
      <Image
        src={product.thumbnail}
        height="600"
        width="600"
        className="absolute inset-0 h-full w-full object-cover object-center"
        alt=""
      />
      <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-t from-black to-transparent opacity-0 group-hover/product:opacity-80"></div>
      <h2 className="absolute bottom-4 left-4 text-sm font-semibold text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
}
