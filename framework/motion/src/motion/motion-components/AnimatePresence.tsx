import { useState } from "react";
import Container from "../../components/Container";
import { AnimatePresence, motion } from "motion/react";

function AnimatePresenceT() {
  // eslint-disable-next-line react-hooks/purity
  const [key, setKey] = useState(Math.floor(Math.random() * 1000));
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Container title="AnimatePresence">
      <div className="h-64 w-64">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.7,
              }}
              transition={{ duration: 0.5 }}
              className="w-64 h-64 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-bold"
            >
              Hello, AnimatePresence!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={() => {
          setKey(Math.floor(Math.random() * 1000));
          setIsOpen((prev) => !prev);
        }}
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
      >
        Toggle
      </button>
    </Container>
  );
}

export default AnimatePresenceT;
