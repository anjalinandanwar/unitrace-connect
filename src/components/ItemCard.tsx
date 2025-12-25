import { MapPin, Calendar } from 'lucide-react';
import type { Item } from '../data/mockData';

interface ItemCardProps {
  item: Item;
  matchScore?: number;
  onClick?: () => void;
}

const ItemCard = ({ item, matchScore, onClick }: ItemCardProps) => {
  const getMatchClass = (score: number) => {
    if (score >= 75) return 'match-high';
    if (score >= 50) return 'match-medium';
    return 'match-low';
  };

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl border border-border overflow-hidden card-hover cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {matchScore !== undefined && (
          <div className="absolute top-3 right-3">
            <span className={getMatchClass(matchScore)}>
              {matchScore}% Match
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`match-badge ${item.type === 'lost' ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
            {item.type === 'lost' ? 'Lost' : 'Found'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(item.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
