import { useState } from 'react';
import { Upload, Search, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import { mockFoundItems, Item } from '../data/mockData';

interface MatchedItem extends Item {
  matchScore: number;
}

const ImageMatching = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [matches, setMatches] = useState<MatchedItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setMatches([]);
        setHasSearched(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (!imagePreview) return;
    
    setIsSearching(true);
    
    // Simulate image matching with random scores (mock)
    setTimeout(() => {
      const scored = mockFoundItems.map((item) => ({
        ...item,
        matchScore: Math.floor(Math.random() * 40) + 50, // 50-90% for demo
      }));

      const topMatches = scored
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3);

      setMatches(topMatches);
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="section-title">Image-to-Image Matching</h1>
            <p className="section-subtitle">
              Upload a photo of your lost item to find visually similar items
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-secondary/50 rounded-xl p-4 mb-8 flex items-start gap-3 animate-fade-in">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground">
              <strong>How it works:</strong> Our system analyzes your uploaded image and compares it with found items in our database to identify potential visual matches.
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8 animate-slide-up">
            <div 
              className={`relative border-2 border-dashed rounded-xl transition-colors ${
                imagePreview ? 'border-primary' : 'border-border hover:border-primary/50'
              }`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Uploaded" 
                    className="w-full h-72 object-contain rounded-xl bg-muted"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setMatches([]);
                      setHasSearched(false);
                    }}
                    className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-lg text-sm hover:opacity-90"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-72 cursor-pointer">
                  <Upload className="w-16 h-16 text-muted-foreground mb-4" />
                  <span className="text-lg text-foreground mb-2">Upload your lost item's photo</span>
                  <span className="text-sm text-muted-foreground">PNG, JPG up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {imagePreview && (
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Find Similar Items
                  </>
                )}
              </button>
            )}
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Visual Matches Found ({matches.length})
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
                  <p className="text-muted-foreground">No visual matches found.</p>
                </div>
              )}

              <p className="text-sm text-muted-foreground mt-4 text-center">
                * Match percentages are simulated for demonstration purposes
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageMatching;
