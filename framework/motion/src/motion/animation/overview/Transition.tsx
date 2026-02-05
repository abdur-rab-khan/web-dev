/*
+--------------------------------------------------------------------------+ TRANSITION +--------------------------------------------------------------------------+
|                                                                                                                                                                  |
| 🟡 Setting transition can be done using following ways:                                                                                                          | 
|                                                                                                                                                                  |
|    1. Adding transition specifically for any type of animation:                                                                                                  | 
|                                                                                                                                                                  |
|       => whileHover={{scale: 1, transition: {duration: 0.5}}}                                                                                                    |
|                                                                                                                                                                  |
|    2. Value specific transition, means "default" will apply to add, and like "opacity" only apply on opacity property.                                           |
|                                                                                                                                                                  |
|       => transition={{ default: { type: "spring" }, opacity: { ease: "linear" }}}                                                                                |
|                                                                                                                                                                  |
|       => animate("li", { x: 0, opacity: 1 }, {default: { type: "spring" },opacity: { ease: "linear" }) // Directly using animate function from "useAnimate".     | 
|                                                                                                                                                                  |
|    3. Default Transition: => For default transition we could use "<MotionConfig>" component or directly pass transition to "transition={...props}"               |
|                                                                                                                                                                  |
|                                                                                                                                                                  |
| 🟡 In Motion we can make transition based on "time" or "physics".                                                                                                |
|                                                                                                                                                                  |
|    "type: 'tween'" -> For time based animation using duration and  ease.                                                                                         |
|                                                                                                                                                                  |
|    "type: 'spring'" -> It's used to make physics based animation or duration based.                                                                              |
|                                                                                                                                                                  |
|        => For physics based animation we will have following props:                                                                                              |
|                                                                                                                                                                  |
|          => "bounce [0-1]": Defines the bounce of an animation.                                                                                                  | 
|          => "damping": Used to define opposing force.                                                                                                            | 
|          => "mass": Mass of the moving object.                                                                                                                   |
|          => "stiffness": Stiffness of the spring, High value create more sudden movement.                                                                        |
|                                                                                                                                                                  |
| 🟡 Orchestration                                                                                                                                                 |
|                                                                                                                                                                  |
|    => delay (in sec)                                                                                                                                             |
|    => repeat (num)                                                                                                                                               |
|    => repeatType ["loop -> default", "reverse", "mirror"]                                                                                                        |
|    => repeatDelay                                                                                                                                                |
|    => when ["beforeChildren", "afterChildren"]                                                                                                                   |
|    => delayChildren                                                                                                                                              |
|                                                                                                                                                                  |
|                                                                                                                                                                  |
|                                                                                                                                                                  |
+------------------------------------------------------------------------------+ END +-----------------------------------------------------------------------------+
*/
import React, { useState } from "react";
import { AnimatePresence, motion, stagger } from "motion/react";
import Container from "../../../components/layout/Container";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

function Transition() {
  const [isOpen1, setIsOpen1] = useState<boolean>(true);
  const [isOpen2, setIsOpen2] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Container title="Transition animation">
      <div className="flex gap-3 flex-wrap">
        {/* TIME BASED ANIMATION -> (type: "tween") (FOR SIMPLE ANIMATION USING DURATION AND EASE OR BY USING TIME) */}
        <div className="shrink-0 h-48 w-48 flex justify-center items-center flex-col gap-y-3 p-2">
          <div className="flex-1 size-full">
            <AnimatePresence>
              {isOpen1 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: "tween",
                    ease: "easeIn",
                    duration: 0.3,
                  }}
                  className="size-full bg-blue-500 rounded-xl"
                />
              )}
            </AnimatePresence>
          </div>
          <button
            className="w-full bg-slate-500 py-2 rounded-md font-semibold"
            onClick={() => setIsOpen1((prev) => !prev)}
          >
            {isOpen1 ? "Show" : "Hide"}
          </button>
        </div>

        {/* PHYSICS BASED ANIMATION --> (type: "spring") */}
        <div className="shrink-0 h-48 w-48 flex justify-center items-center flex-col gap-y-3 p-2">
          <div className="flex-1 size-full">
            <AnimatePresence>
              {isOpen2 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    bounce: 0,
                  }}
                  className="size-full bg-blue-500 rounded-xl"
                />
              )}
            </AnimatePresence>
          </div>
          <button
            className="w-full bg-slate-500 py-2 rounded-md font-semibold"
            onClick={() => setIsOpen2((prev) => !prev)}
          >
            {isOpen2 ? "Show" : "Hide"}
          </button>
        </div>

        <div className="shrink-0 h-48 w-48 flex justify-center items-center flex-col gap-y-3 p-2">
          <motion.button className="w-full rounded-md py-2.5 bg-blue-500">
            Pay
          </motion.button>
        </div>
      </div>

      {/* SEQUENCE ANIMATION */}
      <div className="w-full min-h-80 flex justify-center items-center">
        <motion.p
          initial="initial"
          animate="animate"
          transition={{ delayChildren: stagger(0.035) }}
          className="text-center text-2xl"
        >
          {text.split(" ").map((t, idx) => (
            <motion.span custom={idx} variants={textVarient}>
              {t} &nbsp;
            </motion.span>
          ))}
        </motion.p>
      </div>
    </Container>
  );
}

const textVarient = {
  initial: {
    opacity: 0,
    filter: "blur(12px)",
  },
  animate: (idx: number) => ({
    opacity: 1,
    filter: "blur(0px)",
  }),
};

export default Transition;
