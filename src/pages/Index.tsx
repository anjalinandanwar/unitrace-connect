import { MapPin, Search, Image, FileText, QrCode, Navigation } from 'lucide-react';
import FeatureButton from '../components/FeatureButton';

const Index = () => {
  const features = [
    {
      to: '/report-found',
      icon: MapPin,
      title: 'Report Found Item',
      description: 'Found something? Help reunite it with its owner.'
    },
    {
      to: '/report-lost',
      icon: Search,
      title: 'Report Lost Item',
      description: 'Lost something? Post it and let others help you find it.'
    },
    {
      to: '/image-matching',
      icon: Image,
      title: 'Image-to-Image Matching',
      description: 'Upload an image to find visually similar items.'
    },
    {
      to: '/text-matching',
      icon: FileText,
      title: 'Text-to-Image Matching',
      description: 'Describe your item and find matching posts.'
    },
    {
      to: '/nearby',
      icon: Navigation,
      title: 'Nearby Lost Items',
      description: 'Browse items found near your campus location.'
    },
    {
      to: '/qr-recovery',
      icon: QrCode,
      title: 'QR-Based Recovery',
      description: 'Found an item with a UniTrace QR code? Report it here.'
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--mint)/0.3),transparent_50%)]" />
        <div className="relative content-wrapper py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-6 opacity-0 animate-fade-in">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 opacity-0 animate-slide-up stagger-1">
              UniTrace
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 opacity-0 animate-slide-up stagger-2">
              Keeping Your Belongings in the Right Hands
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-16 mb-12 opacity-0 animate-slide-up stagger-3">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">250+</div>
                <div className="text-sm text-muted-foreground">Items Recovered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">1.2k</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Match Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="content-wrapper">
        <div className="text-center mb-12">
          <h2 className="section-title">How Can We Help?</h2>
          <p className="section-subtitle">Choose an option to get started</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureButton
              key={feature.to}
              {...feature}
              delay={`stagger-${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 mt-16">
        <div className="content-wrapper py-16">
          <div className="text-center mb-12">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Simple steps to reunite lost items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Report</h3>
              <p className="text-muted-foreground">Post a lost or found item with details and photos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Match</h3>
              <p className="text-muted-foreground">Our system finds potential matches automatically</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Recover</h3>
              <p className="text-muted-foreground">Connect with the finder and get your item back</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="content-wrapper py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">UniTrace</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 UniTrace. Keeping campus belongings safe.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
