/*
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                         USE-ANIMATE                                                                         |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                             |
| 🟡 useAnimate" is a powerful hook that allows us to manually trigger, control, selectors scoped, and sequence animations on any element within a            |
|     scoped container.                                                                                                                                       |
|                                                                                                                                                             |
| 🟡 It returns a tuple with a "scope" ref and an "animate" function (for triggering animations). The "scope" ref is attached to a container element, and the |
|   "animate" function can be used to target any child element within that container using CSS selectors.                                                     |
|                                                                                                                                                             |
| 🔵 "animate(target: Ref.current | "css selector", animation, option)" function:                                                                             |
|                                                                                                                                                             |
|     ⭐ animate function returns an promise object to control the animation (pause, stop, finish, etc.)                                                      |
|     ⭐ As we know to wait for promise to be done we can use "await", So animation with "await" will wait until "Promise resolve", Than below animations     |
|        will start working.                                                                                                                                  |
|                                                                                                                                                             |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                    ANIMATING USING ANIMATE                                                                  |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                             |
| 🟨 There are three main ways to use the "animate" function:                                                                                                 |
|                                                                                                                                                             |
|    1. "Direct Animation": We can directly call the "animate" function with as target element and animation properties. Or using "await" to sequence         |
|                             animation.                                                                                                                      |
|                                                                                                                                                             |
|          // Example of direct animation                                                                                                                     |
|          const handleClick = () => {                                                                                                                        |
|            animate("button", { x: 100 }, { duration: 0.5 });                                                                                                |
|            animate("button", { backgroundColor: "red" }, { duration: 0.5 }); // Immediately start without waiting for the first animation to finish.        |
|          } // To wait for the first animation to finish before starting the second one, we can use "await":                                                 |
|                                                                                                                                                             |
|    2. "Variants-Based Animation": We can define animation variants and then use the "animate" function to trigger those variants on specific elements.      |
|                                                                                                                                                             |
|          // Example of variants-based animation                                                                                                             |
|          const buttonVariants = {                                                                                                                           |
|            initial: { x: 0, backgroundColor: "blue" },                                                                                                      |
|            animate: { x: 100, backgroundColor: "red" },                                                                                                     |
|          };                                                                                                                                                 |
|          const handleClick = () => {                                                                                                                        |
|            animate("button", "animate"); // Trigger the "animate" variant on the button element.                                                            |
|          }                                                                                                                                                  |
|                                                                                                                                                             |
|    3. "Sequence Based": We can create complex animation sequences by passing an array of animation steps to the "animate" function.                         |
|                         Each animation starts once after the previous one finishes, allowing for precise control over the timing and order of animations.   |
|                                                                                                                                                             |
|        // Example of sequence-based animation                                                                                                               |
|        const handleClick = () => {                                                                                                                          |
|          animate([                                                                                                                                          |
|            ["button", { x: 100 }, { duration: 0.5 }],                                                                                                       |
|            ["button", { backgroundColor: "red" }, { duration: 0.5, delay: 0.5 }], // Start after a delay                                                    |
|            ["p", { opacity: 0 }, { duration: 0.5 }],                                                                                                        |
|          ]);                                                                                                                                                |
|        }                                                                                                                                                    |
|                                                                                                                                                             |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                       IMPORTANT PROPS                                                                       |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                             |
| 1. All transition options available in the "motion" component can be used in the "animate" function, such as "type", "duration", "delay", "ease", etc.      |
|                                                                                                                                                             |
| 2. "at": On Sequence-Based Animations, Where each animation start one after the previous one finishes, we can use the "at" option to specify when an        |
|          animation should start. It accepts values like "start", "end", or a specific time (e.g., "0.5s").                                                  | 
|                                                                                                                                                             |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/

import { useState } from "react";
import { motion, useAnimate } from "motion/react";
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
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const handleClickBtn = () => {
    if (isPaying) return;

    setIsPaying(true);

    // Using animate function
    const startAnimation = async () => {
      animate(
        "p",
        {
          opacity: 0,
        },
        { duration: 0.05 },
      );

      await animate(
        "button",
        {
          width: "40px",
          borderRadius: "9999px",
        },
        { duration: 0.25 },
      );

      await animate(
        "button",
        {
          scale: [1, 1.2, 0.8, 1],
          backgroundColor: "#22c55e",
        },
        { duration: 0.6 },
      );

      animate("svg", {
        opacity: 1,
      });

      animate("svg > path", {
        pathLength: 1,
      });
    };

    // Using sequence animation
    const startAnimationSeq = () => {
      const seq = [
        [
          "p",
          {
            opacity: [1, 0],
          },
          {
            duration: 0.2,
          },
        ],
        [
          "button",
          {
            width: "40px",
            borderRadius: "9999px",
          },
          {
            type: "tween",
            duration: 0.25,
            at: "<",
          },
        ],
        [
          "button",
          {
            scale: [1, 1.25, 0.75, 1],
          },
          {
            ease: "easeInOut",
            duration: 0.6,
          },
        ],
        [
          "svg",
          {
            opacity: [0, 1],
          },
          {
            duration: 0.1,
            at: "-0.3",
          },
        ],
        [
          "svg > path",
          {
            pathLength: 1,
          },
          {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
          },
        ],
        [
          "svg > path",
          {
            pathLength: 0,
          },
          {
            duration: 0.1,
            at: "+1",
          },
        ],
        [
          "svg",
          {
            opacity: 0,
          },
          {
            duration: 0.1,
            at: "-0.1",
          },
        ],
        [
          "button",
          {
            width: "140px",
            borderRadius: "8px",
          },
          {
            type: "spring",
            at: "-0.1",
            borderRadius: { duration: 0.15 },
          },
        ],
        [
          "p",
          {
            opacity: [0, 1],
          },
          {
            duration: 0.2,
            at: "-1",
          },
        ],
      ];

      // Animating using seq
      const ani = animate(seq);

      ani.finished.then(() => setIsPaying(false));
    };

    // startAnimation();
    startAnimationSeq();
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

        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white absolute inset-0 m-auto opacity-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
          />
        </motion.svg>
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
