import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-[var(--text)]/5 transition-colors relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === 'dark' ? 0 : 40,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        className="text-brand"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          y: theme === 'light' ? -20 : 20,
          opacity: theme === 'light' ? 1 : 0,
        }}
        className="absolute inset-0 flex items-center justify-center text-vw-blue"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
    </button>
  );
}
