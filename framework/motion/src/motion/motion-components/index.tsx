import Motion from "./Motion";
import MotionConfig from "./MotionConfig";
import AnimatePresence from "./AnimatePresence";

function MotionComponents() {
  return (
    <section className="w-screen min-h-screen px-4 py-8">
      <Motion />
      <MotionConfig />
      <AnimatePresence />
    </section>
  );
}

export default MotionComponents;
