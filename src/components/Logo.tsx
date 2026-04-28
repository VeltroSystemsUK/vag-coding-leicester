import vagLogoRed from '../assets/VAGRed.jpg';
import vagLogoDark from '../assets/VAGDarkLogo.JPG';
import vagLogoWhite from '../assets/VAGWhiteLogo.png';

interface LogoProps {
  className?: string;
  variant?: 'header' | 'footer';
  theme?: 'dark' | 'light';
}

export default function Logo({ className = 'h-24 md:h-32', variant = 'header', theme = 'dark' }: LogoProps) {
  const getLogo = () => {
    if (variant === 'footer') {
      return vagLogoDark;
    }
    return theme === 'dark' ? vagLogoDark : vagLogoWhite;
  };

  const logoSrc = getLogo();

  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-full rounded-xl overflow-hidden flex items-center">
        <img
          src={logoSrc}
          alt="VAG Leicester"
          className="h-full w-full object-contain"
          style={{ backgroundColor: 'transparent' }}
        />
      </div>
    </div>
  );
}
