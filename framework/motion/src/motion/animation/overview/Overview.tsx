/* 
+-----------------------------------------------------------------------------+ MOTION +------------------------------------------------------------------------------+
|                                                                                                                                                                     |
| 🟡 Animation in motion is created by "motion" components, almost every "html & svg" elements can defined with "motion" component. it's similar to normal elem but   |
|     with bunch of special animation props                                                                                                                           |
|                                                                                                                                                                     |
| 🟡 As element enter into the dom, we can animate it with "initial" and "animate" props, So when the element is added to the dom, it will animate from "initial"     |
|    to "animate" state.                                                                                                                                              |
|                                                                                                                                                                     |
| 🟡 Motion components can animate almost every css properties, some are not supported by css but motion can handle them internally, such as (opacity, filter, x, y   |
|    height, width, css variable, top, left ...).                                                                                                                     |
|                                                                                                                                                                     |
| 🟡 Motion supports following type of values.                                                                                                                        |
|                                                                                                                                                                     |
|   1️⃣. Number: 0 to 100 etc                                                                                                                                          |
|   2️⃣. Strings containing numbers: "0vh", "10px" etc.                                                                                                                |   
|   3️⃣. Colors: Hex, RGBA, HSLA.                                                                                                                                      |   
|   4️⃣. Complex strings containing multiple numbers and/or colors (like box-shadow).                                                                                  | 
|   5️⃣. display: "none"/"block" and visibility: "hidden"/"visible".                                                                                                   |
|                                                                                                                                                                     |
+---------------------------------------------------------------------------+ TRANSITION +----------------------------------------------------------------------------+
|                                                                                                                                                                     |
| 🔵 By default, motion create transition based on type of value begin animated, for physical like x or scale, it will use "spring transition", for opacity or color..|
|  animated with duration based easing transition.                                                                                                                    |
|                                                                                                                                                                     |
| 🔵 "transition" props is use for creating custom transition, where we could customize (delay, duration, ease etc), or "<MotionConfig />" components can used for    |
|     creating Many component with the same transition config, or we can directly pass on the "animation props (whileHover)".                                         |
|                                                                                                                                                                     |
|                                                                                                                                                                     |
+---------------------------------------------------------------------------+ ANIMATIONS +----------------------------------------------------------------------------+
|                                                                                                                                                                     |
| ♦️ Enter animation:                                                                                                                                                 |
|                                                                                                                                                                     |
|    🔸 When element added to the dom, it render with "initial" props and animate to "animate" props, based on the transition defined.                                |
|    🔸 We can pass "false" to initial to disable the enter animation.                                                                                                |
|                                                                                                                                                                     |
| ♦️ Exit animation: ️                                                                                                                                                 |
|                                                                                                                                                                     |
|    🔸 When an element removed from the dom, it instantly removed, So we can use "AnimatePresence" this make element say "until exit animation complete" before      |
|      removed from the dom.                                                                                                                                          |
|                                                                                                                                                                     |
|    ⭐ Important: Element with exit animation must have a unique "key" props, and it must be direct child of "AnimatePresence" component.                            | 
|                                                                                                                                                                     |
+-----------------------------------------------------------------------------+ KEYFRAME +----------------------------------------------------------------------------+
|                                                                                                                                                                     |
| 🟡 In motion, we can create animation with series of values in an array, this is called "keyframe animation", where each value in the array represent a keyframe.   | 
|                                                                                                                                                                     |
| 🟡 Motion will automatically distribute the timing of each keyframe evenly across the duration of the animation, but we can customize it with "times" array in      |
|    transition props.                                                                                                                                                |
|                                                                                                                                                                     |
| 🟡 Instead of defining "initial" for initial state, we can directly define using keyframe by setting first value in the array as initial state.                     |
|                                                                                                                                                                     |
| 🔵 Wildcard frames                                                                                                                                                  | 
|                                                                                                                                                                     |
|         🔵 Wildcard frames is used for holding the animation value at current state, without defining repeating values.                                             |
|         🔵 Example: animate={{ scale: [0, 1.2, null, 0] }} // It's equivelent to animate={{ scale: [0, 1.2, 1.2, 0] }}
|                                                                                                                                                                     |
| 🔵 Keyframe timing                                                                                                                                                  |
|                                                                                                                                                                     |
|        🔵 By default, keyframes are evenly distributed across the animation duration.                                                                               |
|        🔵 We can customize the timing of each keyframe using the "times" array in the transition prop, where each value ranges from 0 to 1, representing the        |
|          progress of the animation.                                                                                                                                 |
|                                                                                                                                                                     |
| ♦️️ animate={{ scale: [0, 1.2, 0, 1]}, transition: { duration: 3, times: [0, 0.2, 0.5, 1] }}                                                                         |
|                                                                                                                                                                     |
+-----------------------------------------------------------------------------+ VARIANTS +----------------------------------------------------------------------------+
|                                                                                                                                                                     |
| 🟡 In motion, As we know that for animating single element we can use "animate" props, but in motion it's possible to orchestrate animation (multiple elements)     |
|    together by propagating through DOM tree or reusing same animation. This is done by using "variants", where we can define multiple animation states              |
|                                                                                                                                                                     |
| 🟡 Variants is simply an object that contains named sets of animations states, each state is also an object defining the target properties for that state, So we    |
|     when animation applied to parent, it will automatically propagate to children elements that also defined with "same variant names".                               |
|                                                                                                                                                                     |
| 🟡 This is useful for reusability, where we can define variants once and use it across multiple components.                                                         |
|                                                                                                                                                                     |
| 🟡 This is also useful for orchestrating complex animations involving multiple elements, where we can control the animation flow from a single parent component.    |
|                                                                                                                                                                     |
| 🟡 Variants provides much more control over the animation flow like "delayChildren", "staggerChildren", "when" etc. to define how and when the children's animation | 
|  should occur relative to the parent's animation, using transition, By default, children's animation start simultaneously with parent's animation.                  |
|                                                                                                                                                                     |
| ⭐ The key point is that both parent and child must defined the same variant names to enable propagation.                                                           |
|                                                                                                                                                                     |
| ➡️ Dynamic Variants                                                                                                                                                 |
|                                                                                                                                                                     |
| 🔵 Variants can also be defined as function that return an object and passing single argument through "custom" props, this is useful for creating dynamic variants  |
|     based on different conditions.                                                                                                                                  |
|                                                                                                                                                                     |
| 🔶 Example:                                                                                                                                                         |
|                                                                                                                                                                     |
|  const boxVariant = {                                                                                                                                               |
|    visible: (customValue) => ({                                                                                                                                     |
|      opacity: 1,                                                                                                                                                    |
|      scale: customValue,                                                                                                                                            |
|      transition: { duration: 0.5 },                                                                                                                                 |
|    }),                                                                                                                                                              |
|    hidden: {                                                                                                                                                        |
|      opacity: 0,                                                                                                                                                    |
|      scale: 0,                                                                                                                                                      |
|      transition: { duration: 0.5 },                                                                                                                                 |
|    },                                                                                                                                                               |
|  };                                                                                                                                                                 |
|                                                                                                                                                                     |
|  <motion.div                                                                                                                                                        |
|    variants={boxVariant}                                                                                                                                            |
|    custom={1.5} // Pass custom value to variant function                                                                                                            |
|    initial="hidden"                                                                                                                                                 |
|    animate="visible"                                                                                                                                                |
|    className="box"                                                                                                                                                  |
|  />                                                                                                                                                                 |
|                                                                                                                                                                     |
+------------------------------------------------------------------------+ ANIMATION CONTROLS +-----------------------------------------------------------------------+
|                                                                                                                                                                     |
| 🟡 90% of the time, using "animate" props is sufficient for animating elements in motion, but in some cases we may need more control over the animation flow, such  |
|    as starting, stopping, or sequencing animations based on user interactions or other events. In such cases, we can use "animation controls" provided by motion.   |
|                                                                                                                                                                     |
| 🟡 Animation controls allow us to programmatically start, stop, and sequence animations on motion components, giving us more flexibility and control over the       |
|    animation behavior.                                                                                                                                              |
|                                                                                                                                                                     |
| 🟡 We can create animation controls using the "useAnimation" hook, which returns an animation controls object that we can use to start and stop animations.         |
|                                                                                                                                                                     |
| 🟡 We can also use the "animate" function from "motion" library to create more complex animations outside of React components, this is useful for animating         |
|    elements based on non-React events or conditions.                                                                                                                |
|                                                                                                                                                                     |
|                                                                                                                                                                     |
+-------------------------------------------------------------------------------+ END +-------------------------------------------------------------------------------+
*/
import {
  animate as motionAnimate,
  AnimatePresence,
  motion,
  stagger,
  useAnimate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import Container from "../../../components/layout/Container";

const variant = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hidden: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.5 },
  },
};

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: stagger(0.3), // Stagger children by .3 seconds
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      delayChildren: stagger(0.1),
    },
  },
};

const item = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function Overview() {
  const [isVisible, setIsVisible] = useState(true);

  const count = useMotionValue(0);
  const round = useTransform(() => Math.round(count.get()));
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const controls = motionAnimate(count, 100, {
      duration: 2,
    });

    controls.speed = 2; // Double the speed

    return () => controls.stop();
  }, [count]);

  return (
    <Container title="Overview">
      <motion.section
        initial={{
          filter: "blur(10px)",
          opacity: 0,
          y: -80,
          height: 0,
          originY: 0.5, // range is from 0 to 1 (0.5 means center)
        }}
        animate={{
          filter: "none",
          opacity: 1,
          height: "80px",
          y: "calc(100% - 80px)",
        }}
        transition={{ delay: 0.5 }}
        className="h-20 bg-blue-500"
      />

      {/* ANIMATION */}
      <div className="flex gap-x-4">
        {/* START ANIMATION */}
        <motion.div
          className="h-20 w-20 bg-red-500 rounded-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.7,
          }}
        />

        {/* EXIT ANIMATION */}
        <div className="w-20 h-32 relative">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                key={"exit"} // key is important for exit animation
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="h-20 w-full bg-orange-500 rounded-lg"
              />
            )}
            <button
              className="px-4 py-1 rounded-md mt-1.5 bg-blue-500 absolute bottom-0 right-1/2 translate-x-1/2"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              {isVisible ? "Remove" : "Add"}
            </button>
          </AnimatePresence>
        </div>
      </div>

      {/* KEY FRAME */}
      <div className="flex gap-x-4 mt-8">
        <motion.div
          animate={{
            scale: [0, 1.2, 0, 1],
            borderRadius: [0, 100, 0, 0],
            rotate: [0, 90, 0, 360],
          }}
          className="h-20 w-20 rounded-lg bg-blue-400"
        />
      </div>

      {/* VARIANTS */}
      <div className="mt-8 flex gap-x-2">
        {/*  VARIANTS ARE USEFUL FOR REUSABILITY  */}
        <motion.div
          variants={variant}
          initial="hidden"
          animate="visible"
          className="h-20 w-20 bg-green-500 rounded-lg"
        />
        <motion.div
          variants={variant}
          initial="hidden"
          animate="visible"
          className="h-20 w-20 bg-yellow-500 rounded-lg"
        />

        {/* VARIANTS ARE ALSO USEFUL FOR PROPAGATION FROM PARENT TO CHILDREN */}
        <AnimatePresence>
          {isVisible && (
            <motion.ul
              variants={list}
              initial="hidden"
              whileInView={"visible"}
              exit={"hidden"}
              className="ml-3 p-2"
            >
              {Array(4)
                .fill(0)
                .map((_, idx) => (
                  <motion.li
                    key={idx}
                    variants={item}
                    className="h-10 w-52 bg-red-500 not-first:mt-2 rounded-md"
                  />
                ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <ul ref={scope} className="mt-8 flex flex-col gap-y-2">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <li
              key={idx}
              className="h-10 w-52 bg-purple-500 rounded-md"
              onClick={() => {
                animate(
                  `li:nth-child(${idx + 1})`,
                  { scale: [1, 1.5, 1], rotate: [0, 360] },
                  { duration: 1 },
                );
              }}
            />
          ))}
      </ul>

      <motion.pre className="mt-8">{round}</motion.pre>
    </Container>
  );
}

export default Overview;
