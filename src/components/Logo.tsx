import vagLogoDark from '../assets/VAGLOGO.jpg';
import vagLogoLight from '../assets/VAGLOGO_white_bg.jpg';
import { useTheme } from '../lib/ThemeContext';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'h-12' }: LogoProps) {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-full rounded-xl overflow-hidden flex items-center">
        <img
          src={theme === 'dark' ? vagLogoDark : vagLogoLight}
          alt="VAG Leicester"
          className="h-full w-auto object-contain"
        />
      </div>
    </div>
  );
}
