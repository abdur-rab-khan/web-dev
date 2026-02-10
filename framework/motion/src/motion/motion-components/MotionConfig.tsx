/*
+--------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                   MOTION-CONFIG                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                  |
| 🟡 MotionConfig component is a wrapper component, by setting configuration to this component, it will apply configuration to all it's children.  |
|                                                                                                                                                  |
| 🟡 It is commonly used to set default transition or other configuration that we want to apply to all motion components in the subtree.           |
|                                                                                                                                                  |
| 🔵 Props:                                                                                                                                        | 
|                                                                                                                                                  |
|    1. "transition" props: It's used to set default transition for all motion components in the subtree, it can be overridden by setting          |
|                           transition props in motion component.                                                                                  |
|                                                                                                                                                  |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
*/

import React from "react";
import { MotionConfig, motion } from "motion/react";
import Container from "../../components/Container";

function MotionConfigT() {
  return (
    <Container title="Motion Config">
      <MotionConfig
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="h-28 w-28 bg-blue-500 rounded-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          whileTap={{
            scale: [0.5, 1.2, 0.5, 1],
          }}
          className="h-28 w-28 bg-red-500 rounded-md mt-4"
        />
      </MotionConfig>
    </Container>
  );
}

export default MotionConfigT;
