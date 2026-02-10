/*
+--------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                     MOTION                                                                       |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                  |
| 🟡 motion components are pre-built components comes with built-in animation api that makes animation easier and smoother 120fps. Almost every   |
|    html and svg element has a motion component counterpart.                                                                                      |
|                                                                                                                                                  |
| 🟡 By combining "motionValue" (useMotionValue) and "motion" components, we can create complex animation without re-rendering it. that custom     |
|     motion value can be used with animation or css style props                                                                                   |
|                                                                                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
*/

import { motion, useTime, useTransform } from "motion/react";
import Container from "../../components/Container";

function Motion() {
  const time = useTime();
  const transform = useTransform(time, [0, 4000], [0, 360], { clamp: false });
  const backgroundColor = useTransform(
    time,
    [0, 4000],
    ["#0D1A63", "#F68048"],
    { clamp: false },
  );

  return (
    <Container title="Motion Components">
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        style={{
          rotate: transform,
          backgroundColor: backgroundColor,
        }}
        whileHover={{
          backgroundColor: "#1A2CA3",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        whileTap={{
          scale: 1.15,
        }}
        className="h-28 w-28 bg-blue-500 rounded-md"
      />
    </Container>
  );
}

export default Motion;
