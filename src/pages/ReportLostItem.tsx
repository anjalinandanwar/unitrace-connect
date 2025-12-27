import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, FileText, Tag, AlertCircle, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import { locations, categories } from '../data/mockData';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ReportLostItem = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: '',
    description: '',
    color: '',
    brand: '',
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to report an item');
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('items')
        .insert({
          user_id: user.id,
          name: formData.name,
          description: formData.description,
          location: formData.location,
          category: formData.category,
          color: formData.color || null,
          brand: formData.brand || null,
          type: 'lost',
          image_url: imagePreview,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Item reported successfully!');
      
      sessionStorage.setItem('reportedItem', JSON.stringify({
        ...formData,
        type: 'lost',
        image: imagePreview,
      }));
      navigate('/matches?type=lost');
    } catch (error) {
      console.error('Error reporting item:', error);
      toast.error('Failed to report item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="section-title">Report Lost Item</h1>
            <p className="section-subtitle">We'll help you find what you've lost</p>
          </div>

          {!user && (
            <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-center animate-fade-in">
              <p className="text-foreground">
                <button 
                  onClick={() => navigate('/auth')} 
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </button>
                {' '}to save your report and track matches
              </p>
            </div>
          )}

          {/* Tips Banner */}
          <div className="bg-secondary/50 rounded-xl p-4 mb-6 flex items-start gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground">
              <strong>Tip:</strong> Add as many details as possible. Include brand, color, and any distinctive features to improve matching accuracy.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
            {/* Image Upload */}
            <div className="bg-card rounded-xl border border-border p-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                <Upload className="w-4 h-4 inline mr-2" />
                Item Photo (Optional but Recommended)
              </label>
              <div 
                className={`relative border-2 border-dashed rounded-xl transition-colors ${
                  imagePreview ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, image: null });
                      }}
                      className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-lg text-sm hover:opacity-90"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                    <span className="text-muted-foreground">Upload a photo of your item</span>
                    <span className="text-sm text-muted-foreground mt-1">This helps with visual matching</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Item Details */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Blue Backpack, iPhone 14, Prescription Glasses"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Last Seen Location *
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Color and Brand Row */}
              <div className="grid grid-cols-2 gap-4">
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

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your item in detail. Include any unique identifiers, stickers, scratches, or other distinctive features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full text-lg flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Submit & Find Matches
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ReportLostItem;
