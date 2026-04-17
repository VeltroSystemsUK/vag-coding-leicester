import { cn } from '../lib/utils';
import { VAG_BRANDS } from './BrandIcons';

interface BrandLogosRowProps {
  className?: string;
  iconClassName?: string;
  showNames?: boolean;
}

/**
 * Brand strip — renders brand names in their corporate colors.
 */
export default function BrandLogosRow({
  className,
  iconClassName,
  showNames = true,
}: BrandLogosRowProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-8', className)}>
      {VAG_BRANDS.map(({ name, color }) => (
        <div 
          key={name} 
          className="flex flex-col items-center gap-1 group/logo transition-all duration-300 hover:-translate-y-1"
        >
          <span
            className={cn(
              'text-xl md:text-2xl font-bold tracking-tight transition-all duration-500 group-hover/logo:scale-110',
              iconClassName
            )}
            style={{ color }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
