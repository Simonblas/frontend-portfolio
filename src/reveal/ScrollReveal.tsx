import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
}

export const ScrollRevealY = ({ children, delay = 0, once = true }: { children: React.ReactNode; delay?: number; once?: boolean }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
};
export const ScrollRevealXLeft = ({ children, delay = 0.3, once = true }: Props) => {
  return (
    <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
};
export const ScrollRevealXRight = ({ children, delay = 0.3, once = true }: Props) => {
  return (
    <motion.div initial={{ opacity: 0, x: 200 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
};
