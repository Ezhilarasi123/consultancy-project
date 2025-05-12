import { Cog } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <Cog className="w-8 h-8 text-primary-500" />
      <Cog className="w-5 h-5 text-accent-500 absolute right-0 top-0" />
    </div>
  );
};

export default Logo;