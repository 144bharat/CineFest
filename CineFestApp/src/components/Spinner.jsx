import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="absolute w-16 h-16 border-8 border-red-600 border-t-transparent rounded-full mx-[50%] mt-[20%]"
    />
  );
}

export default Spinner;
