"use client";

import type { MotionValue } from "motion/react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

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
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const updateDimensions = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth <= 1024);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const translateX1 = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0.01 * vw, 0]),
    springConfig,
  );
  const translateX2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 0]),
    springConfig,
  );
  const translateX3 = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-0.01 * vw, 0]),
    springConfig,
  );

  const translateY1 = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-0.2 * vh, 0]),
    springConfig,
  );
  const translateY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-0.2 * vh, 0]),
    springConfig,
  );
  const translateY3 = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-0.2 * vh, 0]),
    springConfig,
  );

  const scale1 = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [0.9, 1]),
    springConfig,
  );
  const scale2 = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [0.9, 1]),
    springConfig,
  );
  const scale3 = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [0.9, 1]),
    springConfig,
  );

  const opacityH2 = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    isMobile ? [1, 1, 1] : [0, 0, 1],
  );
  const opacityH3 = useTransform(
    scrollYProgress,
    [0, 0.95, 1],
    isMobile ? [1, 1, 1] : [0, 0, 1],
  );

  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-hidden bg-[radial-gradient(ellipse_60%_35%_at_50%_60%,rgba(62,138,255,0.9),transparent)] antialiased dark:bg-[radial-gradient(ellipse_60%_35%_at_50%_50%,rgba(62,138,255,0.25),transparent)]"
    >
      <Header />
      <motion.div className="bg-primary-foreground flex w-full flex-col items-center justify-center space-y-4 border-t-2 p-4 lg:h-screen">
        <motion.h2
          style={{ opacity: opacityH2 }}
          className="text-md mt-4 w-full px-4 text-center font-semibold lg:mt-24 lg:text-2xl"
        >
          Featured Drinks from Our Collection
        </motion.h2>
        <div className="flex w-full flex-col items-center justify-center space-y-4 p-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          {loading ? (
            <>
              {Array.from({ length: 3 }).map(() => (
                <Skeleton
                  key={crypto.getRandomValues(new Uint32Array(1))[0].toString()}
                  className="group/product relative aspect-square w-full shrink-0 lg:w-1/3"
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
                opacity={opacityH3}
              />
              <ProductCard
                product={row[1]}
                translateX={translateX2}
                translateY={translateY2}
                scale={scale2}
                opacity={opacityH3}
              />
              <ProductCard
                product={row[2]}
                translateX={translateX3}
                translateY={translateY3}
                scale={scale3}
                opacity={opacityH3}
              />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function Header() {
  return (
    <header className="mx-auto w-full space-y-8 px-4 pt-12 pb-16 opacity-90 md:max-w-3xl md:pt-32 md:pb-54 xl:max-w-6xl">
      <h1 className="text-4xl font-bold whitespace-nowrap md:text-7xl dark:text-white">
        Solvro cocktails
      </h1>
      <p className="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
        Discover a variety of delicious cocktails crafted to perfection. Whether
        you&apos;re looking for a classic drink or something new, our collection
        has something for everyone. Explore our recipes and find your next
        favorite cocktail.
      </p>

      <Link href="/cocktails" passHref>
        <InteractiveHoverButton>Browse cocktails</InteractiveHoverButton>
      </Link>
    </header>
  );
}

export function ProductCard({
  product,
  translateX,
  translateY,
  scale,
  opacity,
}: {
  product: {
    title: string;
    thumbnail: string;
  };
  translateX: MotionValue<number>;
  translateY: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      style={{
        x: translateX,
        y: translateY,
        scale,
        opacity: isInView ? 1 : 0,
        transition: "opacity 0.6s ease-in-out",
      }}
      ref={ref}
      key={product.title}
      className="group/product relative w-full lg:w-1/3 dark:shadow-white/2"
    >
      <Image
        src={product.thumbnail}
        height="600"
        width="600"
        className="relative inset-0 aspect-square h-full w-full rounded-xl border object-cover object-center shadow-2xl"
        alt=""
      />
      <motion.h3
        style={{ opacity }}
        className="w-full pt-1 text-center text-xs"
      >
        {product.title}
      </motion.h3>
    </motion.div>
  );
}
