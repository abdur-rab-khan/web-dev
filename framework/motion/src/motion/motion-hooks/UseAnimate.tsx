/*
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                         USE-ANIMATE                                                                         |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
|                                                                                                                                                             |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/

import { useState } from "react";
import { motion, useAnimate, animate } from "motion/react";
import type { Variants } from "motion/react";

// PAY BUTTON
const PayButtonV1 = () => {
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const handleClickBtn = () => {
    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
    }, 1500);
  };

  return (
    <motion.button
      onClick={handleClickBtn}
      variants={buttonVariants}
      initial="initial"
      animate={isPaying ? "animate" : "initial"}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8,
      }}
      className="w-36 h-10 rounded-md bg-blue-500 relative"
    >
      <motion.p
        variants={textVariants}
        className="text-white font-semibold absolute inset-0 flex items-center justify-center"
      >
        Pay Now
      </motion.p>
      <motion.span
        variants={checkmarkVariants}
        className="absolute inset-0 m-auto w-6 h-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white absolute inset-0 m-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
            variants={{
              initial: { pathLength: 0 },
              animate: {
                pathLength: 1,
                transition: { delay: 0.35, duration: 0.3, ease: "easeOut" },
              },
            }}
          />
        </svg>
      </motion.span>
    </motion.button>
  );
};

const buttonVariants: Variants = {
  initial: {
    width: "144px",
    height: "40px",
    borderRadius: "6px",
    backgroundColor: "#3b82f6",
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
      mass: 0.8,
      borderRadius: { type: "tween" as const, ease: "easeInOut" },
      backgroundColor: { duration: 0.3 },
    },
  },
  animate: {
    height: "3rem",
    width: "3rem",
    borderRadius: "24px",
    backgroundColor: "#22c55e",
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      mass: 0.8,
      borderRadius: { type: "tween" as const, ease: "easeOut" },
      backgroundColor: { delay: 0.15, duration: 0.3 },
    },
  },
};

const textVariants = {
  initial: { opacity: 1, scale: 1 },
  animate: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const checkmarkVariants = {
  initial: { opacity: 0, scale: 0.5, pathLength: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    pathLength: 1,
    transition: { delay: 0.3, duration: 0.2, ease: "easeOut" },
  },
};

const PayButtonV2 = () => {
  const [scope, animate] = useAnimate();

  const handleClickBtn = () => {
    const startAnimation = () => {
      animate(
        "button",
        {
          width: "40px",
          height: "40px",
          borderRadius: "24px",
          backgroundColor: "#22c55e",
        },
        {
          type: "spring",
          stiffness: 150,
          damping: 14,
          bounce: 0.4,
        },
      );
      animate(
        "p",
        { opacity: 0, scale: 0.8 },
        { duration: 0.15, ease: "easeIn" },
      );
      animate(
        "span",
        { opacity: 1, scale: 1 },
        { delay: 0.3, duration: 0.2, ease: "easeOut" },
      );
    };

    startAnimation();
  };

  return (
    <div ref={scope}>
      <motion.button
        onClick={handleClickBtn}
        className="relative h-10 w-36 bg-red-500 rounded-md"
      >
        <motion.p className="text-white font-semibold absolute inset-0 flex items-center justify-center">
          Pay Now
        </motion.p>
      </motion.button>
    </div>
  );
};

function UseAnimate() {
  return (
    <div className="flex items-center flex-col gap-y-6 justify-center h-screen">
      <PayButtonV1 />
      <PayButtonV2 />
    </div>
  );
}

export default UseAnimate;
