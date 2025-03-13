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

import { Button } from "./button";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 7);
  const secondRow = products.slice(7, 14);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-hidden antialiased"
    >
      <Header />
      <motion.div>
        <motion.div className="mb-5 flex flex-row-reverse space-x-5 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="mb-5 flex flex-row-reverse space-x-5 space-x-reverse">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-16 opacity-90 md:py-36">
      <h1 className="text-2xl font-bold md:text-7xl dark:text-white">
        Solvro cocktails
      </h1>
      <p className="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
        Discover a variety of delicious cocktails crafted to perfection. Whether
        you're looking for a classic drink or something new, our collection has
        something for everyone. Explore our recipes and find your next favorite
        cocktail.
      </p>
      <Button variant="outline" className="">
        <Link href="/cocktails">Browse cocktails</Link>
      </Button>
    </div>
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
      className="group/product relative h-96 w-72 shrink-0"
    >
      <Image
        src={product.thumbnail}
        height="600"
        width="600"
        className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center"
        alt={product.title}
      />
      <div className="absolute inset-0 h-full w-full rounded-2xl bg-black opacity-0 group-hover/product:opacity-80"></div>
      <h2 className="absolute bottom-4 left-4 text-sm text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
};
