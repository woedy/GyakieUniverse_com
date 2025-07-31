import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  fromUniverse?: boolean;
}

export default function PageTransition({ children, fromUniverse = false }: PageTransitionProps) {
  const variants = {
    initial: fromUniverse 
      ? { scale: 0, opacity: 0, rotateY: 90 }
      : { opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Smooth ease-out
        scale: { type: "spring", stiffness: 200, damping: 25 },
      }
    },
    exit: fromUniverse
      ? { scale: 0, opacity: 0, rotateY: -90 }
      : { opacity: 0 }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
      style={{
        transformOrigin: "center center",
        perspective: "1000px"
      }}
    >
      {children}
    </motion.div>
  );
}