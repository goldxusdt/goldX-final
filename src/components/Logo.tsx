import { useSettings } from '@/contexts/SettingsContext';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'header' | 'footer';
}

export function Logo({ className = '', size = 40, variant = 'header' }: LogoProps) {
  const { settings: platformSettings } = useSettings();
  const logoUrl = variant === 'header' ? platformSettings?.logo_header_url : platformSettings?.logo_footer_url;

  if (logoUrl) {
    return (
      <img loading="lazy" decoding="async" 
        src={logoUrl} 
        alt="Logo" 
        style={{ width: size, height: 'auto' }} 
        className={className}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="gold-luxury" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="20%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFFACD" />
          <stop offset="80%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        
        <filter id="gold-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient id="bg-luxury" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A0A0A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>

      {/* Main Diamond Shape Container */}
      <path
        d="M50 5 L95 50 L50 95 L5 50 Z"
        fill="url(#bg-luxury)"
        stroke="url(#gold-luxury)"
        strokeWidth="1.5"
      />
      
      {/* Inner Decorative Stroke */}
      <path
        d="M50 15 L85 50 L50 85 L15 50 Z"
        stroke="url(#gold-luxury)"
        strokeWidth="0.5"
        strokeDasharray="2 4"
        opacity="0.4"
      />

      {/* Modernized G X Integration */}
      {/* Letter G */}
      <path
        d="M48 35 Q40 35 40 50 Q40 65 48 65 Q55 65 55 58 H48 V54 H60 V58 Q60 72 48 72 Q33 72 33 50 Q33 28 48 28 Q55 28 62 35 L58 40 Q53 35 48 35 Z"
        fill="url(#gold-luxury)"
        filter="url(#gold-glow-filter)"
      />

      {/* Diamond Accent */}
      <rect
        x="62" y="45" width="10" height="10"
        transform="rotate(45 67 50)"
        fill="url(#gold-luxury)"
      />

      {/* Shimmer Effect */}
      <path
        d="M20 20 L80 80"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.1"
      />
    </svg>
  );
}

export function LogoWithText({ className = '', size = 40, variant = 'header' }: LogoProps) {
  const { settings: platformSettings } = useSettings();
  const siteTitle = platformSettings?.site_title || 'GOLD X USDT';
  const siteTagline = platformSettings?.site_tagline || 'Elite Platforms';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Logo size={size} className="" variant={variant} />
      <div className="flex flex-col">
        <span className="font-black text-2xl tracking-tighter leading-none v56-gradient-text uppercase">{siteTitle}</span>
        <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-muted-foreground opacity-60">{siteTagline}</span>
      </div>
    </div>
  );
}
