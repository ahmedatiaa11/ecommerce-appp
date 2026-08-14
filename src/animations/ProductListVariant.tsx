import { type Variants } from "motion/react";

export const productListVariants: Variants = {
  hidden: {
    // opacity: 0,
    // y: 40,
  },

  show: {
    // opacity: 1,
    // y: 0,
    transition: {
      staggerChildren: 0.1, // دي "قاعدة" التأخير: كل طفل هيستنى 0.2 ثانية
    },

  },
};