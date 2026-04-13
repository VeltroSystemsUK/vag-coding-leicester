import { cn } from '../lib/utils';
import { VAG_BRANDS } from './BrandIcons';

interface BrandLogosRowProps {
  className?: string;
  iconClassName?: string;
  showNames?: boolean;
}

/**
 * Brand logo strip — renders logos in their original corporate colors 
 * with 100% visibility as requested.
 */
export default function BrandLogosRow({
  className,
  iconClassName,
  showNames = false,
}: BrandLogosRowProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-8', className)}>
      {VAG_BRANDS.map(({ name, logo }) => (
        <div key={name} className="flex flex-col items-center gap-2 group/logo transition-all duration-300 hover:-translate-y-1">
          <img
            src={logo}
            alt={name}
            className={cn(
              'h-7 w-auto object-contain transition-all duration-500 group-hover/logo:scale-110',
              iconClassName
            )}
          />
          {showNames && (
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover/logo:opacity-40 transition-opacity duration-300">
              {name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
