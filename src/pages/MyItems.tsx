import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Loader2, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Item {
  id: string;
  name: string;
  description: string | null;
  location: string;
  date: string;
  image_url: string | null;
  type: string;
  category: string;
  status: string;
  created_at: string;
}

const MyItems = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyItems();
    }
  }, [user]);

  const fetchMyItems = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to load your items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setItems(items.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

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
          <h1 className="section-title">My Reported Items</h1>
          <p className="section-subtitle">Track all items you've reported</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No items reported yet</h3>
            <p className="text-muted-foreground mb-6">Start by reporting a lost or found item</p>
            <div className="flex gap-4 justify-center">
              <Link to="/report-lost" className="btn-primary">
                Report Lost Item
              </Link>
              <Link to="/report-found" className="btn-secondary">
                Report Found Item
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
                {item.image_url && (
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'lost' 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {item.type === 'lost' ? 'Lost' : 'Found'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{item.location}</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'active' 
                        ? 'bg-primary/10 text-primary' 
                        : item.status === 'matched'
                        ? 'bg-yellow-500/10 text-yellow-600'
                        : 'bg-green-500/10 text-green-600'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyItems;
