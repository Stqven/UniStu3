import { useState } from 'react';
import { MapPin, Bell, Search, Star, Clock, LogOut } from 'lucide-react';
import { DealCard } from './DealCard';
import { DealModal } from './DealModal';
import { supabase } from '../lib/supabase';

interface DealsPageProps {
  userName: string;
}

const DEALS = [
  {
    id: 1,
    restaurant: 'Chipotle',
    deal: 'BOGO Entree',
    description: 'Buy one burrito, get one fre entree. Valid for dine-in and takeout orders.',
    category: 'Mexican',
    distance: '0.5 mi',
    address: '4255 Campus Dr, Irvine, CA 92612',
    validUntil: 'Dec 13',
    color: 'bg-purple-200',
    savings:  '$12.00',
    rating: 3.7,
    time: '10 min',
    originalPrice: 24.00,
    price: 12.00
  },
  {
    id: 2,
    restaurant: 'Boiling Point',
    deal: 'Free appetizer and drink with code JEA',
    description: 'Purchase 1 Hot Soup get 1 free drink and 1 free appetizer.',
    category: 'Asian',
    distance: '7.2 mi',
    address: 'Boiling Point, 14140 Culver Dr, Irvine, CA 92604',
    validUntil: 'Dec 27',
    color: 'bg-pink-200',
    savings: '$10.00',
    rating: 3.9,
    time: '20 min',
    originalPrice: 30.00,
    price: 20.00
  },
  {
    id: 3,
    restaurant: 'Astra bean Coffee',
    deal: 'BOGO Drink',
    description: 'Buy one drink, get one free',
    category: 'Drinks',
    distance: '13.7 mi',
    address: '9878 Bolsa Ave, Westminster, CA 92683',
    validUntil: 'December 31',
    color: 'bg-amber-200',
    savings: '$6.00',
    rating: 4.4,
    time: '30 min',
    originalPrice: 12.00,
    price: 6.00
  },
  {
    id: 4,
    restaurant: 'Chewie Mellow',
    deal: 'BOGO Matcha Wonderful Bowl',
    description: 'Buy one matcha pudding bowl, get one free.',
    category: 'coffee',
    distance: '2.8 mi',
    address: '2222 Michelson Dr, Ste 236, Irvine, CA 92612',
    validUntil: 'Dec 14',
    color: 'bg-purple-200',
    savings: '$10.85',
    rating: 4.6,
    time: '11 min',
    originalPrice: 21.70,
    price: 10.85,
  },
  {
    id: 5,
    restaurant: 'Wushi Land Boba',
    deal: 'Buy 2 drinks get one free',
    description: 'buy 2 drinks get the lowest priced drink free',
    category: 'Drinks',
    distance: '5.7 mi',
    address: '3851 S Bristol St, Santa Ana, CA 92704',
    validUntil: 'Dec 12',
    color: 'bg-pink-200',
    savings: '$6.00',
    rating: 4.4,
    time: '12 min',
    originalPrice: 18.00,
    price: 12.00
  },
  {
    id: 6,
    restaurant: 'Shake Shack',
    deal: 'Free Burgers in December',
    description: 'Free SmokeShack with a 10$ purchase every in December',
    category: 'Fast Food',
    distance: '6.9 mi',
    address: '329 E 17th St, Costa Mesa, CA 92627',
    validUntil: 'Dec 14',
    color: 'bg-amber-200',
    savings: '$12.59',
    rating: 4.3,
    time: '20 min',
    originalPrice: 22.50,
    price: 10.00
  },
  {
  id: 7,
  restaurant: 'Bamboo and Bean',
  deal: 'BOGO Drink',
  description: 'Buy one drink, get one free on matcha lattes, coffees, and more.',
  category: 'Drinks',
  distance: '6.9 mi',
  address: '2413 S Fairview St Unit P, Santa Ana, CA 92704',
  validUntil: 'Dec 15',
  color: 'bg-amber-200',
  savings: '$6.00',
  rating: 4.0,
  time: '20 min',
  originalPrice: 12.00,
  price: 6.00
  },
  {
  id: 8,
  restaurant: 'Bake and Che',
  deal: 'BOGO Desert',
  description: 'Buy Panda Grass Jelly get one free with code PGJ',
  category: 'Drinks',
  distance: '14.9 mi',
  address: '9729 Bolsa Ave, Westminster, CA 92683',
  validUntil: 'Dec 11',
  color: 'bg-amber-200',
  savings: '6.90',
  rating: 4.0,
  time: '25 min',
  originalPrice: 13.80,
  price: 6.90
  }
];

function getTimeRemaining(validUntilStr: string): string {
  const currentYear = new Date().getFullYear();
  const expiryDate = new Date(`${validUntilStr}, ${currentYear} 23:59:59`);
  const now = new Date();

  const diff = expiryDate.getTime() - now.getTime();

  if (diff <= 0) return 'Expired';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  return `${hours}h ${minutes}m`;
}

export function DealsPage({ userName }: DealsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDeal, setSelectedDeal] = useState<(typeof DEALS[0] & { expiresIn: string }) | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const categories = ['All','Low-To-High', 'High-to-Low', 'Top-Rated', 'Nearest', 'Ending-Soon', 'Newest', 'Biggest-Savers'];

  const filteredDeals = DEALS.filter(deal => {
    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
    return matchesCategory;
  });

  // Calculate total savings
  const totalSavings = DEALS.reduce((sum, deal) => {
    return sum + parseFloat(deal.savings.replace('$', ''));
  }, 0);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        console.log('Successfully signed out');
        // The useAuth hook will detect the sign out and update the app state
        // No need to manually redirect - App.tsx will show SignUpPage
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      {/* Header */}
      <div className="bg-white rounded-b-[2rem] p-6 pb-8 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-purple-500" />
            <p className="text-gray-600">Irvine, CA</p>
          </div>
          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu(!showProfileMenu);
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              {userName[0]?.toUpperCase() || 'A'}
            </button>
            
            {/* Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    setShowProfileMenu(false);
                  }}
                />
                <div 
                 className="absolute mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                 style={{ 
                   right: '50%',
                   transform: 'translateX(50%)' 
                 }}
                 onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowProfileMenu(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <h1 className="text-3xl mb-2">
          What BOGO deal are you claiming today?
        </h1>

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
              deal={{
                ...deal,
                expiresIn: getTimeRemaining(deal.validUntil)
              }}
              onClaim={() => setSelectedDeal({
                ...deal,
                expiresIn: getTimeRemaining(deal.validUntil)
              })}
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