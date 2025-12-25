import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureButtonProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: string;
}

const FeatureButton = ({ to, icon: Icon, title, description, delay = '' }: FeatureButtonProps) => {
  return (
    <Link
      to={to}
      className={`feature-card flex flex-col items-center text-center group opacity-0 animate-slide-up ${delay}`}
    >
      <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
};

export default FeatureButton;
