/*
+-------------------------------------------------------------------------+ LAYOUT IN MOTION +--------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 🟡 Motion provides to kind of Layout animations:                                                                                                                      | 
|                                                                                                                                                                       |
|    1. "layout" props: It allows to animate between two different (position, size) states of the same element.                                                         |
|    2. "layoutId" props: It allows to animate between two different elements sharing the same "layoutId" value such as creating smooth transitions between pages or    |
|                          components.                                                                                                                                  j|
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
+-------------------------------------------------------------------------------+ END +---------------------------------------------------------------------------------+
*/

import { motion } from "motion/react";
import Container from "../layout/Container";
import { useEffect, useState } from "react";

const initial = ["#ff0088", "#dd00ee", "#9911ff", "#0d63f8"];

/**
 * ==============   Utils   ================
 */
function shuffle([...array]: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

function Layout() {
  const [x, setX] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [order, setOrder] = useState(initial);

  const toggleBtn = () => setIsOn((prev) => !prev);

  // Suffling the card.
  useEffect(() => {
    const cnt = setInterval(() => setOrder((prev) => shuffle(prev)), 1000);

    return () => {
      clearInterval(cnt);
    };
  }, []);

  return (
    <Container title="Layout Animation Overview">
      {/* AUTOMATICALLY ADD SMOOTH TRANSITION BETWEEN TWO POSITIONS BY USING "layout" props */}
      <button
        className="toggle-container"
        onClick={toggleBtn}
        style={{
          ...container,
          justifyContent: "flex-" + (isOn ? "end" : "start"),
        }}
      >
        <motion.div
          style={handle}
          layout
          transition={{
            type: "spring",
            visualDuration: 0.2,
            bounce: 0.2,
          }}
        ></motion.div>
      </button>

      {/* SMOOTH POSITION CHANGES USING TRANSITION */}
      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-52 w-52">
        {order.map((c) => (
          <motion.div
            key={c}
            layout
            style={{ backgroundColor: c }}
            className="rounded-md"
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
            }}
          />
        ))}
      </div>

      {/* BY USING "layoutId" props WE CAN ANIMATE BETWEEN TWO DIFFERENT ELEMENTS */}
      <div className="h-64 w-96 bg-white rounded-lg border border-gray-500/50">
        <ul className="flex flex-1">
          <motion.li>😀 Happy</motion.li>
          <motion.li>😢 Sad</motion.li>
          <motion.li>😡 Angry</motion.li>
        </ul>
      </div>

      {/*  */}
      <div>
        <motion.div
          layoutId="1"
          className="h-20 w-20 bg-red-500 rounded-lg"
          onClick={() => setX((prev) => !prev)}
        />
        {x && (
          <motion.div
            layoutId="1"
            className="h-56 w-56 bg-blue-500 rounded-lg absolute right-1/2 translate-x-1/2 top-1/2"
          />
        )}
      </div>
    </Container>
  );
}

/**
 * ==============   Styles   ================
 */

const container = {
  width: 100,
  height: 50,
  backgroundColor: "red",
  borderRadius: 50,
  alignItems: "center",
  cursor: "pointer",
  display: "flex",
  padding: 10,
};

const handle = {
  width: 50,
  height: 50,
  backgroundColor: "#9911ff",
  borderRadius: "50%",
};

export default Layout;
