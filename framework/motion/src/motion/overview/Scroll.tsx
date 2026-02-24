/*
+-----------------------------------------------------------------------+ SCROLL ANIMATION +-----------------------------------------------------------------------+
|                                                                                                                                                                  |
| 🟡 There are two main types of scroll animations:                                                                                                                |
|                                                                                                                                                                  |
|    1. Scroll Triggered Animations: In these animations, elements animate when they enter or exit from the viewport as the user scrolls.                          |
|                                                                                                                                                                  |
|       🔷 Common props used: `whileInView`, `viewport`, `initial`.                                                                                                |
|       🔷 Example: Often used to build fade-in effects, lazy loading content, or parallax scrolling effects.                                                      |
|                                                                                                                                                                  |
|    2. Scroll-Linked Animations: In these animations, we directly link any element scroll position to animate elements on the page.                               |
|                                                                                                                                                                  |
|       🔷 Common hooks used: `useScroll`, `useTransform`.                                                                                                         |
|       🔷 Example: Creating scroll progress bars, parallax effects, or animating elements based on scroll position.                                               |
|                                                                                                                                                                  |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                             SCROLL TRIGGERED ANIMATIONS PROPS                                                                    |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                  |
| 1. whileInView: Defines the animation state when the element is in the viewport.                                                                                 |
|                                                                                                                                                                  |
| 2. viewport: Configures how the element's visibility is determined.                                                                                              |
|              1. amount: Specifies how much of the element should be visible to trigger the animation (e.g., 0.5 for 50%).                                        |
|              2. root: By default whileInView triggers based on the viewport. But by passing a ref to root, you can set a different scrollable container.         |
|                                                                                                                                                                  |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                SCROLL LINKED ANIMATIONS PROPS                                                                    |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                  |
| - In scroll-linked animations, We use hooks (useScroll) to track scroll position an element (default is viewport) based on the position we animate things.       |
|   Motion provides different hooks to transform those values. Such as converting scroll position into CSS Style ("useTransform") or adding smooth transition      |
|   using ("useSpring").                                                                                                                                           |
|                                                                                                                                                                  |
| - Let's see the common hooks used to achieve scroll-linked animations:                                                                                           |
|                                                                                                                                                                  |
|   1. useScroll: A hook that provides motion values representing the scroll position. It can track scroll on the entire page or within a specific container.      |
|                                                                                                                                                                  |
|      ⭕ Return values:                                                                                                                                           |
|         1. scrollY / scrollX: Motion values representing the vertical/horizontal scroll position in pixels.                                                      |
|         2. scrollYProgress / scrollXProgress: Motion values representing the scroll progress as a value between 0 and 1.                                         |
|                                                                                                                                                                  |
|      ⭕ Arguments (in an object):                                                                                                                                |
|                                                                                                                                                                  |
|         1. container --> ref: By default motion tracks scroll progress based on browsers viewport scroll, But by passing ref of an element we can update this    |
|                               to track scroll based on passed ref element scroll progress.                                                                       |
|                                                                                                                                                                  |
|         2. target --> ref: Container is about scroll, But when actually start tracking the progress here "target" came by passing element ref it will start      |
|                            tracking when target element enters in the view port. By default tracks to containers.                                                |
|                                                                                                                                                                  |
|         3. axis  --> "x" | "y":                                                                                                                                  |
|                                                                                                                                                                  |
|         4. offset -> Array: "Offset": Tells the position where "target", "container" meet to start tracking the scroll progress.                                 |
|                                       It accepts two arguments within the array, "First" tell about when to start tracking the scroll progress, And second tells |
|                                       when progress should end.                                                                                                  |
|                                                                                                                                                                  |
|           🟨 ["start center", "end end"] --> Start the animation when "target" top meets to the center of the "container", and stop when "target" bottom         | 
|                                              meets to end of the "container".                                                                                    |
|                                                                                                                                                                  |
|           🔷 It accepts "number (0 -> start, 1 -> end, in between also)", "name -> [start, center, end]", "percentage (0%-100%)", "vh, vw", "pixels"             |
|                                                                                                                                                                  |
|   2. useTransform: A hook that transform motion value into "mapped value", "CSS style" by combining one or more than one motion values. Can can't directly do    |
|                    that because it doesn't trigger any re-rendering.                                                                                             |
|                                                                                                                                                                  |
|        ⭐ It can be used with two ways.                                                                                                                          |
|                                                                                                                                                                  |
|           1. Transform function: useTransform(() => motionValue.get() * 2) // Any Changes on Motion Value --> Every time transform value re-calculate and return | 
|                                                                                                                                                                  |
|           2. Value mapping: useTransform(motionValue, [start_range, end_range], ["0%", "100%"]) // Means it will transform value with range and mapped with      |
|                                                                                                 // 0%-100%                                                       |
|              🟡 Single motion value can be transformed into multiple one, It can transform into "CSS Style", "number", "color", or other string.                 |
|                                                                                                                                                                  |
|                 const { opacity, scale, filter } = useTransform(                                                                                                 |
|                                                           offset,                                                                                                |
|                                                           [100, 600],                                                                                            |
|                                                           {                                                                                                      |
|                                                             opacity: [1, 0.4],                                                                                   |
|                                                             scale: [1, 0.6],                                                                                     |
|                                                              filter: ["blur(0px)", "blur(10px)"],                                                                |
|                                                           }                                                                                                      |
|                                                     )                                                                                                            |
|                                                                                                                                                                  |
|             ⭐ By passing "clamp: false" --> It can map (calculate) also after reaching then input range.                                                        |
|             ⭐ "ease: ["ease_str", "ease function"] --> Doing easing for smoothness                                                                              |
|                                                                                                                                                                  |
|                                                                                                                                                                  |
|  3. useMotionValueEvent: By default changes on motion value don't trigger any react re-rendering to update any state based on motion value we have to two        | 
|                          approach:                                                                                                                               |
|                                                                                                                                                                  |
|            1. "motionValue.on(["change", "animationStart", "animationCancel", "animationComplete"], handlerFunction)"                                            |
|            2. "useMotionValueEvent(motionValue ,["change", "animationStart", "animationCancel", "animationComplete"], handlerFunction)"                          |
|                                                                                                                                                                  |
|            const { scrollY } = useScroll()                                                                                                                       | 
|            const [scrollDirection, setScrollDirection] = useState("down")                                                                                        | 
|                                                                                                                                                                  | 
|            useMotionValueEvent(scrollY, "change", (current) => {                                                                                                 | 
|               const diff = current - scrollY.getPrevious()                                                                                                       | 
|               setScrollDirection(diff > 0 ? "down" : "up")                                                                                                       | 
|            })                                                                                                                                                    |
|                                                                                                                                                                  |
+------------------------------------------------------------------------------+ END +-----------------------------------------------------------------------------+
*/

import React, { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Container from "../../components/Container";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import image6 from "../../assets/image6.jpg";

// SCROLL TRIGGER EAMPLE - 1
const ScrollTriggerExample = () => {
  const food: [string, number, number][] = [
    ["🍅", 340, 10],
    ["🍊", 20, 40],
    ["🍋", 60, 90],
    ["🍐", 80, 120],
    ["🍏", 100, 140],
    ["🍆", 260, 290],
    ["🍇", 290, 320],
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="w-96 h-96 bg-green-700 shadow-2xl shadow-black/80 rounded-md flex flex-col gap-y-14 items-center justify-start overflow-y-auto scroll-smooth pb-3 pt-3"
    >
      {food.map(([emoji, hueA, hueB], index) => (
        <motion.div
          key={index}
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ amount: 0.5, root: containerRef }}
          className="w-58 h-52 rounded-lg shrink-0 relative overflow-y-hidden"
        >
          <div
            className="absolute right-0 left-0 top-0 bottom-0 bg-yellow-500"
            style={{
              background: `linear-gradient(135deg, hsl(${hueA} 90% 60%), hsl(${hueB} 90% 60%))`,
              clipPath:
                "path('M 0 140.2 C 0 135.1 5.5 131.7 12.3 131 L 282.4 101.4 C 288.7 100.8 294.8 105.5 294.8 110.6 L 307 198.7 C 307 203.4 301.5 208 294.8 208 L 12.3 208 C 5.5 208 0 203.4 0 198.7 Z')",
            }}
          />
          <motion.div
            variants={{
              offscreen: {
                rotate: 0,
                top: 100,
              },
              onscreen: {
                rotate: -20,
                top: 30,
              },
            }}
            className="absolute bg-white h-56 w-3/5 origin-bottom-left rounded-xl right-1/2 shadow shadow-black/30 translate-x-1/2"
          >
            <motion.div
              variants={{ offscreen: { opacity: 0 }, onscreen: { opacity: 1 } }}
              transition={{ duration: 0.5 }}
              className="size-full flex items-center justify-center"
            >
              <span className="text-6xl">{emoji}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// SCROLL LINKED ANIMATION EXAMPLE
const NavBar = () => {
  const [isHidden, setIsHidden] = React.useState(false);

  // useScroll hook to track scroll position within the container
  const { scrollY } = useScroll();

  // By default react scrollY does'nt trigger re-renders, so we use useMotionValueEvent to listen to changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 30) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.nav
      className="sticky top-0 z-100 px-3 w-full py-6 shadow-2xl bg-red-500 rounded-full"
      animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
    />
  );
};

const ScrollLinkedExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // useScroll hook to track scroll progress within the container
  const { scrollYProgress } = useScroll({
    axis: "y",
    container: containerRef,
  });

  // Converts scroll progress to a spring value for smooth animation
  const springValue = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  return (
    <div
      ref={containerRef}
      className="w-4/5 mx-auto h-96 relative overflow-y-scroll rounded-xl bg-yellow-500 shadow-lg shadow-black/30"
    >
      {/* PROGRESS BAR */}
      <motion.div
        style={{ scaleX: springValue }}
        className="w-full h-2 bg-red-500 sticky top-0 left-0 origin-left z-10"
      />

      <div className="px-4 py-2" style={{ minHeight: "1200px" }}>
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="h-20 w-full rounded-md bg-blue-500 not-first:mt-3"
          ></div>
        ))}
      </div>
    </div>
  );
};

const ImagePreview = () => {
  const mainContainer = useRef<HTMLDivElement>(null);

  // useScroll hook to track scroll progress within the container
  const { scrollYProgress } = useScroll({
    axis: "y",
    container: mainContainer,
  });

  // Map scroll progress to image scale and blur values
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  // Addding transition to the transform values for smoothness
  const springScale = useSpring(imageScale, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const imageBlur = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(5px)"],
  );

  const textTranslate = useTransform(scrollYProgress, [0, 0.5], [0, -150]);

  // Bouncing transition to textTranslate for a more dynamic effect
  const springTextTranslate = useSpring(textTranslate, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  return (
    <div
      ref={mainContainer}
      className="w-[90%] mx-auto mt-8 h-150 rounded-lg relative bg-red-500 overflow-y-auto"
    >
      {/* PREVIEW IMAGE */}
      <motion.div
        style={{
          scale: springScale,
          filter: imageBlur,
        }}
        className="absolute size-full right-0 top-0 left-0 z-0 bottom-0"
      >
        <img
          src="https://examples.motion.dev/photos/prague/image-05.jpg"
          className="size-full object-cover object-center rounded-lg shadow-lg shadow-black/30"
        />
      </motion.div>

      <motion.div
        style={{
          translateY: springTextTranslate,
        }}
        className="w-full h-150 flex justify-center items-center relative z-20"
      >
        <h2 className="text-8xl text-white font-bold">Prague</h2>
      </motion.div>

      <div className="w-full bg-blue-500 h-150 flex justify-center relative z-20 items-center"></div>
    </div>
  );
};

const HorizontalScrollExample = () => {
  // Image data
  const data = [
    {
      title: "Image 1",
      src: image1,
    },
    {
      title: "Image 2",
      src: image2,
    },
    {
      title: "Image 3",
      src: image3,
    },
    {
      title: "Image 4",
      src: image4,
    },
    {
      title: "Image 5",
      src: image5,
    },
    {
      title: "Image 6",
      src: image6,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const scrollProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", `-${(data.length - 2) * 384}px`],
  );
  const smoothPrograss = useSpring(scrollProgress);

  return (
    <div ref={containerRef} style={{ height: "300vh" }}>
      <div
        style={{
          position: "sticky",
          top: 100,
          height: "100vh",
          backgroundColor: "yellow",
          overflow: "hidden",
        }}
      >
        <motion.div style={{ x: smoothPrograss, display: "flex", gap: 20 }}>
          {data.map((item) => (
            <div
              key={item.title}
              style={{ flexShrink: 0, width: 384, height: 461 }}
              className="relative rounded-lg overflow-hidden"
            >
              <img src={item.src} className="size-full object-fit" />
              <span className="absolute bottom-6 left-12 text-4xl font-semibold">
                {item.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

function Scroll() {
  return (
    <Container title="Scroll animations">
      {/* NAV BAR */}
      <NavBar />

      {/* SCROLL TRIGGER */}
      <ScrollTriggerExample />

      {/* SCROLL LINKED ANIMATON */}
      <ScrollLinkedExample />

      {/* HORIZONTAL SCROLL */}
      <HorizontalScrollExample />

      {/* IMAGE PREVIEW WITH LINKED ANIMATION */}
      <ImagePreview />
    </Container>
  );
}

export default Scroll;
