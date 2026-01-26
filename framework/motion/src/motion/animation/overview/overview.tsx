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
|    ⭐ Key is really important for exit animation, because it help motion to identify which element is removed from the dom.                                         |
|                                                                                                                                                                     |
|                                                                                                                                                                     |
|                                                                                                                                                                     |
+-------------------------------------------------------------------------------+ END +-------------------------------------------------------------------------------+
*/
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function Overview() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col gap-y-3">
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
    </div>
  );
}

export default Overview;
