import vagLogoRed from '../assets/VAGRed.jpg';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'h-20 md:h-24' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-full rounded-xl overflow-hidden flex items-center">
        <img
          src={vagLogoRed}
          alt="VAG Leicester"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
