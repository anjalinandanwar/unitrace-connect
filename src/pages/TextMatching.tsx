import { useState } from 'react';
import { Search, FileText, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import { mockFoundItems, calculateMatchScore, Item, locations, categories } from '../data/mockData';

interface MatchedItem extends Item {
  matchScore: number;
}

const TextMatching = () => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    color: '',
    brand: '',
    location: '',
  });
  const [isSearching, setIsSearching] = useState(false);
  const [matches, setMatches] = useState<MatchedItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      const scored = mockFoundItems.map((item) => ({
        ...item,
        matchScore: calculateMatchScore(formData, item),
      }));

      const topMatches = scored
        .filter((i) => i.matchScore > 20)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6);

      setMatches(topMatches);
      setIsSearching(false);
      setHasSearched(true);
    }, 1000);
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="section-title">Text-to-Image Matching</h1>
            <p className="section-subtitle">
              Describe your lost item and we'll find matching posts
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-secondary/50 rounded-xl p-4 mb-8 flex items-start gap-3 animate-fade-in">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground">
              <strong>Pro tip:</strong> The more details you provide (color, brand, category), the better our matching algorithm works.
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-card rounded-xl border border-border p-6 mb-8 animate-slide-up">
            <div className="space-y-4">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Item Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your lost item... e.g., 'Blue backpack with laptop compartment, has a small keychain'"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field resize-none"
                />
              </div>

              {/* Category and Location Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Any category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Seen Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Any location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Color and Brand Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Blue, Black, Red"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Apple, Nike, Jansport"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Find Matches
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Results Section */}
          {hasSearched && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Text Matches Found ({matches.length})
              </h2>
              
              {matches.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map((item, index) => (
                    <div key={item.id} className={`opacity-0 animate-scale-in stagger-${index + 1}`}>
                      <ItemCard item={item} matchScore={item.matchScore} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <p className="text-muted-foreground mb-2">No matches found for your description.</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search criteria or report your item as lost.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TextMatching;
