"use client";

import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { Skeleton } from "./skeleton";

export const HeroParallax = ({
  products,
  loading,
}: {
  products: {
    title: string;
    thumbnail: string;
  }[];
  loading: boolean;
}) => {
  const firstRow = [...products.slice(0, 7), ...products.slice(0, 7)];
  const secondRow = [...products.slice(7, 14), ...products.slice(7, 14)];
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

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
      className="relative flex flex-col self-auto overflow-hidden px-5 antialiased"
    >
      <Header />
      <motion.div className="w-full">
        <motion.div className="mb-5 flex flex-row space-x-5">
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="group/product relative h-96 w-72 shrink-0"
                />
              ))}
            </>
          ) : (
            firstRow.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={index}
              />
            ))
          )}
        </motion.div>
        <motion.div className="mb-5 flex flex-row-reverse space-x-5 space-x-reverse">
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="group/product relative h-96 w-72 shrink-0"
                />
              ))}
            </>
          ) : (
            secondRow.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={index}
              />
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <header className="mx-auto w-full space-y-8 px-4 py-16 opacity-90 md:max-w-3xl md:py-36 xl:max-w-6xl">
      <h1 className="text-4xl font-bold whitespace-nowrap md:text-7xl dark:text-white">
        Solvro cocktails
      </h1>
      <p className="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
        Discover a variety of delicious cocktails crafted to perfection. Whether
        you're looking for a classic drink or something new, our collection has
        something for everyone. Explore our recipes and find your next favorite
        cocktail.
      </p>
      <InteractiveHoverButton>
        <Link href="/cocktails">Browse cocktails</Link>
      </InteractiveHoverButton>
    </header>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -10,
      }}
      key={product.title}
      className="group/product relative aspect-[3/4] h-64 shrink-0 overflow-hidden rounded-2xl shadow-md md:h-96"
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
};
