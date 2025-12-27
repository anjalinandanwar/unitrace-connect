import { useState, useEffect } from 'react';
import { MapPin, Filter, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import { mockFoundItems, mockLostItems, locations, Item } from '../data/mockData';
import { supabase } from '@/integrations/supabase/client';

interface DbItem {
  id: string;
  name: string;
  description: string | null;
  location: string;
  date: string;
  image_url: string | null;
  type: string;
  category: string;
  color: string | null;
  brand: string | null;
}

const NearbyItems = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'all' | 'lost' | 'found'>('all');
  const [dbItems, setDbItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const items: Item[] = (data || []).map((item: DbItem) => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        location: item.location,
        date: item.date,
        image: item.image_url || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
        type: item.type as 'lost' | 'found',
        category: item.category,
        color: item.color || undefined,
        brand: item.brand || undefined,
      }));

      setDbItems(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Combine database items with mock items for demo
  const allMockItems: Item[] = [...mockFoundItems, ...mockLostItems];
  const allItems: Item[] = dbItems.length > 0 ? [...dbItems, ...allMockItems] : allMockItems;

  const filteredItems = allItems.filter((item) => {
    const locationMatch = !selectedLocation || item.location === selectedLocation;
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    return locationMatch && typeMatch;
  });

  // Group items by location for display
  const groupedByLocation = filteredItems.reduce((acc, item) => {
    if (!acc[item.location]) {
      acc[item.location] = [];
    }
    acc[item.location].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="section-title">Nearby Lost & Found Items</h1>
          <p className="section-subtitle">
            Browse items by campus location
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-field"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                Item Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'lost' | 'found')}
                className="input-field"
              >
                <option value="all">All Items</option>
                <option value="lost">Lost Items</option>
                <option value="found">Found Items</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {selectedLocation ? (
            // Show items for selected location
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  {selectedLocation}
                </h2>
                <span className="text-muted-foreground">
                  ({filteredItems.length} items)
                </span>
              </div>
              
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <div key={item.id} className={`opacity-0 animate-scale-in stagger-${Math.min(index + 1, 6)}`}>
                      <ItemCard item={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <p className="text-muted-foreground">No items found at this location.</p>
                </div>
              )}
            </div>
          ) : (
            // Show items grouped by location
            Object.entries(groupedByLocation).map(([location, items]) => (
              <div key={location} className="animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    {location}
                  </h2>
                  <span className="text-muted-foreground">
                    ({items.length} items)
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.slice(0, 3).map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>

                {items.length > 3 && (
                  <button
                    onClick={() => setSelectedLocation(location)}
                    className="mt-4 text-primary hover:underline text-sm font-medium"
                  >
                    View all {items.length} items at {location} →
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {filteredItems.length === 0 && !selectedLocation && (
          <div className="text-center py-12 bg-card rounded-xl border border-border animate-fade-in">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No items found matching your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NearbyItems;
