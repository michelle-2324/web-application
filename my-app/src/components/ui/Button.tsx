import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
}

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <motion.button 
      whileHover={{ scale: 1.1, color: 'white' }}
      whileTap={{ scale: 0.9 }}
      className={`bg-transparent text-xl font-semibold text-center py-2 px-4 border rounded ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};

export {
  Button
};