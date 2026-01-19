import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export const ScrollReveal = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      {children}
    </motion.div>
  );
};