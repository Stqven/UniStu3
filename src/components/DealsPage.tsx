import { useState } from 'react';
import { MapPin, Bell, Search, Star, Clock } from 'lucide-react';
import { DealCard } from './DealCard';
import { DealModal } from './DealModal';

interface DealsPageProps {
  userName: string;
}

const DEALS = [
  {
    id: 1,
    restaurant: 'In-N-Out Burger',
    deal: 'BOGO Double-Double',
    description: 'Buy one Double-Double, get one free. Valid for dine-in and takeout orders.',
    category: 'Fast Food',
    distance: '0.5 mi',
    validUntil: 'Nov 30',
    color: 'bg-purple-200',
    savings: '$8.50',
    rating: 4.8,
    time: '10 min'
  },
  {
    id: 2,
    restaurant: 'Starbucks UTC',
    deal: 'BOGO Seasonal Drinks',
    description: 'Buy one seasonal beverage, get one free. All sizes available.',
    category: 'Coffee',
    distance: '0.3 mi',
    validUntil: 'Nov 28',
    color: 'bg-pink-200',
    savings: '$6.75',
    rating: 4.6,
    time: '5 min'
  },
  {
    id: 3,
    restaurant: 'Chipotle',
    deal: 'BOGO Bowls',
    description: 'Buy one bowl or burrito, get one free with student ID.',
    category: 'Mexican',
    distance: '1.2 mi',
    validUntil: 'Dec 5',
    color: 'bg-amber-200',
    savings: '$12.00',
    rating: 4.5,
    time: '15 min'
  },
  {
    id: 4,
    restaurant: 'Milk Tea Lab',
    deal: 'BOGO Boba Drinks',
    description: 'Buy one boba drink, get one free. Choose from 20+ flavors.',
    category: 'Drinks',
    distance: '0.8 mi',
    validUntil: 'Nov 29',
    color: 'bg-purple-200',
    savings: '$7.50',
    rating: 4.7,
    time: '8 min'
  },
  {
    id: 5,
    restaurant: 'Blaze Pizza',
    deal: 'BOGO Personal Pizzas',
    description: 'Build your own pizza, get a second one free with unlimited toppings.',
    category: 'Pizza',
    distance: '1.5 mi',
    validUntil: 'Dec 1',
    color: 'bg-pink-200',
    savings: '$9.95',
    rating: 4.4,
    time: '12 min'
  },
  {
    id: 6,
    restaurant: 'Panda Express',
    deal: 'BOGO Bowls',
    description: 'Buy one bowl, get one free. Mix and match your favorite entrees.',
    category: 'Asian',
    distance: '0.4 mi',
    validUntil: 'Nov 27',
    color: 'bg-amber-200',
    savings: '$10.50',
    rating: 4.3,
    time: '7 min'
  }
];

export function DealsPage({ userName }: DealsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDeal, setSelectedDeal] = useState<typeof DEALS[0] | null>(null);

  const categories = ['All', 'Fast Food', 'Coffee', 'Mexican', 'Drinks', 'Pizza', 'Asian'];

  const filteredDeals = DEALS.filter(deal => {
    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
    return matchesCategory;
  });

  // Calculate total savings
  const totalSavings = DEALS.reduce((sum, deal) => {
    return sum + parseFloat(deal.savings.replace('$', ''));
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      {/* Header */}
      <div className="bg-white rounded-b-[2rem] p-6 pb-8 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-purple-500" />
            <p className="text-gray-600">Irvine, CA</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white">
            {userName[0]?.toUpperCase() || 'A'}
          </div>
        </div>

        <h1 className="text-3xl mb-2">
          What BOGO deal are you claiming today?
        </h1>

        {/* Money Saved Stats */}
        <div className="bg-gradient-to-r from-pink-300 to-pink-200 rounded-3xl p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 mb-1">💰 Total Available Savings</p>
              <p className="text-5xl mb-1">${totalSavings.toFixed(2)}</p>
              <p className="text-sm text-gray-600">across {DEALS.length} deals today!</p>
            </div>
            <div className="text-6xl">🎉</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Categories</h2>
          <button className="text-purple-500 text-sm">See more</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Deals Carousel */}
      <div className="px-6">
        <h2 className="text-xl mb-4">Available Deals</h2>
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {filteredDeals.map((deal) => (
            <DealCard 
              key={deal.id} 
              deal={deal}
              onClaim={() => setSelectedDeal(deal)}
            />
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-4xl mb-2">🔍</p>
            <p>No deals found</p>
          </div>
        )}
      </div>

      {/* Deal Modal */}
      {selectedDeal && (
        <DealModal 
          deal={selectedDeal} 
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </div>
  );
}