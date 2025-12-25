export interface Item {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  image: string;
  type: 'lost' | 'found';
  category: string;
  color?: string;
  brand?: string;
}

export const mockFoundItems: Item[] = [
  {
    id: '1',
    name: 'Blue Backpack',
    description: 'Navy blue Jansport backpack with laptop compartment. Has a small keychain attached.',
    location: 'Library',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    type: 'found',
    category: 'Bags',
    color: 'Blue',
    brand: 'Jansport'
  },
  {
    id: '2',
    name: 'iPhone 14 Pro',
    description: 'Space gray iPhone with cracked screen protector. Has a black silicone case.',
    location: 'Cafeteria',
    date: '2024-01-14',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
    type: 'found',
    category: 'Electronics',
    color: 'Gray',
    brand: 'Apple'
  },
  {
    id: '3',
    name: 'Student ID Card',
    description: 'University student ID card. Name partially visible.',
    location: 'Hostel',
    date: '2024-01-13',
    image: 'https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?w=400&h=300&fit=crop',
    type: 'found',
    category: 'Documents',
    color: 'White'
  },
  {
    id: '4',
    name: 'Silver Watch',
    description: 'Analog silver watch with leather strap. Fossil brand.',
    location: 'Library',
    date: '2024-01-12',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
    type: 'found',
    category: 'Accessories',
    color: 'Silver',
    brand: 'Fossil'
  },
  {
    id: '5',
    name: 'Black Umbrella',
    description: 'Large black umbrella with wooden handle.',
    location: 'Cafeteria',
    date: '2024-01-11',
    image: 'https://images.unsplash.com/photo-1534309466160-70b22cc6252c?w=400&h=300&fit=crop',
    type: 'found',
    category: 'Accessories',
    color: 'Black'
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'White wireless earbuds in charging case. AirPods Pro.',
    location: 'Hostel',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=300&fit=crop',
    type: 'found',
    category: 'Electronics',
    color: 'White',
    brand: 'Apple'
  }
];

export const mockLostItems: Item[] = [
  {
    id: '7',
    name: 'Red Notebook',
    description: 'Red spiral notebook with physics notes. Very important!',
    location: 'Library',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop',
    type: 'lost',
    category: 'Stationery',
    color: 'Red'
  },
  {
    id: '8',
    name: 'Prescription Glasses',
    description: 'Black frame prescription glasses. Ray-Ban.',
    location: 'Cafeteria',
    date: '2024-01-14',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop',
    type: 'lost',
    category: 'Accessories',
    color: 'Black',
    brand: 'Ray-Ban'
  }
];

export const locations = ['Library', 'Hostel', 'Cafeteria', 'Sports Complex', 'Main Building', 'Science Block'];

export const categories = ['Electronics', 'Bags', 'Accessories', 'Documents', 'Stationery', 'Clothing', 'Other'];

export function calculateMatchScore(item1: Partial<Item>, item2: Item): number {
  let score = 0;
  let factors = 0;

  // Location match
  if (item1.location && item1.location === item2.location) {
    score += 30;
  }
  factors += 30;

  // Category match
  if (item1.category && item1.category === item2.category) {
    score += 25;
  }
  factors += 25;

  // Color match
  if (item1.color && item2.color && item1.color.toLowerCase() === item2.color.toLowerCase()) {
    score += 20;
  }
  factors += 20;

  // Brand match
  if (item1.brand && item2.brand && item1.brand.toLowerCase() === item2.brand.toLowerCase()) {
    score += 15;
  }
  factors += 15;

  // Description keyword match
  if (item1.description && item2.description) {
    const words1 = item1.description.toLowerCase().split(/\s+/);
    const words2 = item2.description.toLowerCase().split(/\s+/);
    const commonWords = words1.filter(w => words2.includes(w) && w.length > 3);
    score += Math.min(commonWords.length * 2, 10);
  }
  factors += 10;

  return Math.round((score / factors) * 100);
}
