import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import { mockFoundItems, mockLostItems, calculateMatchScore, Item } from '../data/mockData';

interface MatchedItem extends Item {
  matchScore: number;
}

const Matches = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'lost';
  const [matches, setMatches] = useState<MatchedItem[]>([]);
  const [reportedItem, setReportedItem] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('reportedItem');
    if (stored) {
      const item = JSON.parse(stored);
      setReportedItem(item);

      // Find matches from opposite type
      const itemsToSearch = type === 'lost' ? mockFoundItems : mockLostItems;
      
      const scored = itemsToSearch.map((i) => ({
        ...i,
        matchScore: calculateMatchScore(item, i),
      }));

      // Sort by match score and take top matches
      const topMatches = scored
        .filter((i) => i.matchScore > 30)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6);

      setMatches(topMatches);
    }
  }, [type]);

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        {/* Success Message */}
        <div className="bg-primary/10 rounded-xl p-6 mb-8 flex items-center gap-4 animate-scale-in">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {type === 'lost' ? 'Lost Item Reported!' : 'Found Item Reported!'}
            </h2>
            <p className="text-muted-foreground">
              {reportedItem?.name ? `"${reportedItem.name}" has been posted.` : 'Your item has been posted.'} 
              {' '}We found some potential matches below.
            </p>
          </div>
        </div>

        {/* Your Reported Item */}
        {reportedItem && reportedItem.image && (
          <div className="mb-8 animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">Your Reported Item</h3>
            <div className="bg-card rounded-xl border border-border p-4 flex gap-4">
              <img 
                src={reportedItem.image} 
                alt={reportedItem.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold text-foreground">{reportedItem.name}</h4>
                <p className="text-sm text-muted-foreground">{reportedItem.location}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{reportedItem.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Matches Section */}
        <div className="animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title text-2xl">
              Potential Matches ({matches.length})
            </h2>
          </div>

          {matches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((item, index) => (
                <div key={item.id} className={`opacity-0 animate-slide-up stagger-${index + 1}`}>
                  <ItemCard item={item} matchScore={item.matchScore} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground mb-4">No matches found yet, but don't worry!</p>
              <p className="text-sm text-muted-foreground">
                Your item has been posted and we'll notify you when a potential match is found.
              </p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link to="/" className="btn-outline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Matches;
