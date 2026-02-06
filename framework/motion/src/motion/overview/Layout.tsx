/*
+-------------------------------------------------------------------------+ LAYOUT IN MOTION +--------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 🟡 Motion provides to kind of Layout animations:                                                                                                                      | 
|                                                                                                                                                                       |
|    1. "layout" props: It allows to animate between two different (position, size) states of the same element.                                                         |
|    2. "layoutId" props: It allows to animate between two different elements sharing the same "layoutId" value such as creating smooth transitions between pages or    |
|                          components.                                                                                                                                  |
|                                                                                                                                                                       |
| 🔴 Layout props:                                                                                                                                                      |
|                                                                                                                                                                       |
|   - To make animation between two different layout states we need to add "layout" props to the element we want to animate.                                            | 
|   - We can customize the animation using "transition" props.                                                                                                          |
|   - Layout changes can be triggred by changing following properties of the element:                                                                                   |
|        1. size (width, height)                                                                                                                                        |
|        2. position (x, y)                                                                                                                                             |
|        3. number of grid columns/rows (if using grid layout)                                                                                                          |
|        4. adding/removing elements from the DOM                                                                                                                       |
|   - To make layout animation work properly, animation should be done using "className" or "style" props. Not by "animate", "initial" or "whileXXX" props.             |
|                                                                                                                                                                       |
| 🔴 LayoutId props:                                                                                                                                                    |
|                                                                                                                                                                       |
|  - By using same "layoutId" value on two different elements, Motion will automatically animate new element out from the old element's position and when the new       |
|    element is removed from the DOM, it will animate back to the old element's position.                                                                               |
|  - We can use "AnimatePresence" component to animate the entry and exit of the element with "layoutId".                                                               |
|  - To customize the default transition animation we can use "transition" props.                                                                                       |
|  - If two element has already same "layoutId" and try to animate with "initial", "animate" or "whileXXX" props, then animation won't works.                           |    
|                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                         IMPORTANT PROPERTIES                                                                          |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 1. "layoutScroll" props: By default layout animation doesn't consider scroll position of the element. By enabling this prop, layout animation will consider scroll    | 
|                        position as well. So if the element is inside a scrollable container, layout animation will be calculated based on the visible position of the |
|                         element.                                                                                                                                      |
|                                                                                                                                                                       |
| 2. "layoutRoot" props: By default layout animation looks for the nearest "scrollable" parent to calculate the position of the element. By using this prop we can      |
|                       specify a different parent element to calculate the position. So layout animation will be calculated based on the position of this element.     |
|                                                                                                                                                                       |
+-------------------------------------------------------------------------------+ END +---------------------------------------------------------------------------------+
*/

import { motion, AnimatePresence } from "motion/react";
import Container from "../../components/Container";
import { useEffect, useState } from "react";

const initial = ["#ff0088", "#dd00ee", "#9911ff", "#0d63f8"];

/**
 * ==============   Utils   ================
 */
function shuffle([...array]: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

function Layout() {
  const [isOn, setIsOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(initial);
  const [hovered, setHovered] = useState<number | null>(null);

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
      {/* LAYOUT ANIMATION */}
      <div id="layout-animation" className="flex gap-10 items-center">
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
      </div>

      {/* LAYOUT-ID ANIMATION */}
      <div id="layoutId-animation" className="flex gap-10 items-center mt-20">
        {/* BY USING "layoutId" props WE CAN ANIMATE BETWEEN TWO DIFFERENT ELEMENTS */}
        <div className="h-fit w-96 bg-white rounded-lg border border-gray-500/50">
          <nav className="flex p-2.5">
            {navContent.map(({ id, emoji, label }) => (
              <div
                key={id}
                className="flex-1 relative select-none block group text-center py-2 rounded-md font-medium"
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
              >
                {hovered === id && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 bg-blue-500 rounded-md"
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
                <span className="relative z-20 text-black group-hover:text-white">
                  {emoji} {label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* LAYOUT BETWEEN TWO ELEMENTS */}
        {!isOpen && (
          <motion.button
            layoutId="model"
            onClick={() => setIsOpen(true)}
            className="px-6 py-1.5 bg-red-500 rounded-lg"
            transition={{ type: "spring" }} // Animate when model got closed.
          >
            {isOpen ? "Close" : "Open"}
          </motion.button>
        )}
        <AnimatePresence>
          {isOpen && (
            <motion.dialog
              layoutId="model"
              className="h-56 w-56 bg-red-500 overflow-hidden rounded-lg fixed right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 backdrop:bg-black/50 flex items-end"
              open
              onClick={() => setIsOpen(false)}
              transition={{ type: "spring" }}
            >
              <AnimatePresence>
                <motion.div
                  initial={{
                    y: 50,
                    filter: "blur(10px)",
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    filter: "blur(0px)",
                    opacity: 1,
                  }}
                  exit={{
                    y: 50,
                    filter: "blur(10px)",
                    opacity: 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col gap-4 w-full px-4 py-2 bg-blue-800"
                >
                  <h2>Dialog Content</h2>
                  <button onClick={() => setIsOpen(false)}>Close</button>
                </motion.div>
              </AnimatePresence>
            </motion.dialog>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
}

const navContent = [
  {
    id: 1,
    emoji: "😀",
    label: "Happy",
  },
  {
    id: 2,
    emoji: "😢",
    label: "Sad",
  },
  {
    id: 3,
    emoji: "😡",
    label: "Angry",
  },
];

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
