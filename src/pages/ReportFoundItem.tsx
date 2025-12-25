import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, FileText, Tag } from 'lucide-react';
import Header from '../components/Header';
import { locations, categories } from '../data/mockData';

const ReportFoundItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: '',
    description: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in sessionStorage for the matches page
    sessionStorage.setItem('reportedItem', JSON.stringify({
      ...formData,
      type: 'found',
      image: imagePreview,
    }));
    navigate('/matches?type=found');
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="section-title">Report Found Item</h1>
            <p className="section-subtitle">Help reunite someone with their belongings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
            {/* Image Upload */}
            <div className="bg-card rounded-xl border border-border p-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                <Upload className="w-4 h-4 inline mr-2" />
                Item Photo
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
                  <label className="flex flex-col items-center justify-center h-64 cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mb-3" />
                    <span className="text-muted-foreground">Click to upload or drag and drop</span>
                    <span className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB</span>
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
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Blue Backpack, iPhone, Student ID"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location Found
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
                  Category
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

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the item in detail (color, brand, distinctive features...)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full text-lg">
              Submit & Find Matches
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ReportFoundItem;
