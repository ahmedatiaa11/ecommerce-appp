import { motion } from 'framer-motion';

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // أول ما الصفحة تفتح: تكون شفافة ومنزلوعة حاجة بسيطة تحت
      animate={{ opacity: 1, y: 0 }}  // وهي بتظهر: تطلع لمكانها وتبقا واضحة 100%
      exit={{ opacity: 0, y: -10 }}   // وهي ماشية (اختياري)
      transition={{ duration: 0.3 }}  // السرعة: 300 جزء من الثانية عشان تبقا سريعة وما تحسسش المستخدم ببطء
    >
      {children}
    </motion.div>
  );
}