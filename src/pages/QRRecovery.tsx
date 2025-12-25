import { useState } from 'react';
import { QrCode, User, Phone, CheckCircle } from 'lucide-react';
import Header from '../components/Header';

const QRRecovery = () => {
  const [formData, setFormData] = useState({
    finderName: '',
    finderContact: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="page-container">
        <Header />
        
        <main className="content-wrapper">
          <div className="max-w-lg mx-auto text-center py-16 animate-scale-in">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Owner Notified Successfully!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for helping reunite this item with its owner. They have been notified and will contact you soon.
            </p>
            <div className="bg-secondary/50 rounded-xl p-6">
              <p className="text-sm text-foreground">
                <strong>Your contact info:</strong><br />
                {formData.finderName} • {formData.finderContact}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="section-title">QR Code Recovery</h1>
            <p className="section-subtitle">
              Found an item with a UniTrace QR code? Help us return it!
            </p>
          </div>

          {/* QR Info Card */}
          <div className="bg-secondary/30 rounded-xl p-6 mb-8 text-center animate-fade-in">
            <div className="w-32 h-32 bg-card rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-border">
              <QrCode className="w-16 h-16 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              "This item belongs to a UniTrace user"
            </p>
            <p className="text-sm text-muted-foreground">
              Each UniTrace member can generate a unique QR code to attach to their valuables.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Your Contact Information
              </h2>

              {/* Finder Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.finderName}
                  onChange={(e) => setFormData({ ...formData, finderName: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Contact Information *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Phone number or email"
                  value={formData.finderContact}
                  onChange={(e) => setFormData({ ...formData, finderContact: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Any additional details about where/how you found the item..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field resize-none"
                />
              </div>
            </div>

            {/* Privacy Notice */}
            <p className="text-sm text-muted-foreground text-center">
              Your information will only be shared with the item's owner to facilitate recovery.
            </p>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full text-lg">
              Notify Owner
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default QRRecovery;
