import { Star, Clock } from 'lucide-react';

interface Deal {
  id: number;
  restaurant: string;
  deal: string;
  description: string;
  category: string;
  distance: string;
  address: string;
  validUntil: string;
  color: string;
  savings: string;
  rating: number;
  time: string;
  originalPrice: number;
  price: number;
  expiresIn: string;
}

interface DealCardProps {
  deal: Deal;
  onClaim: () => void;
}

export function DealCard({ deal, onClaim }: DealCardProps) {
  const getEmoji = (category: string) => {
    switch (category) {
      case 'Fast Food': return '🍔';
      case 'Coffee': return '☕';
      case 'Mexican': return '🌯';
      case 'Drinks': return '🧋';
      case 'Pizza': return '🍕';
      case 'Asian': return '🥡';
      default: return '🍴';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div 
      className="min-w-[280px] w-[280px] snap-center"
      onClick={onClaim}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer">
        <div className={`${deal.color} p-12 relative flex items-center justify-center`}>
          {/* Expires In Badge - Fixed "Expires in Expired" text logic */}
          <div className="absolute top-3 left-4 bg-black text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            {deal.expiresIn === 'Expired' ? 'Expired' : `Expires in ${deal.expiresIn}`}
          </div>

          <div className="absolute top-3 right-3 bg-white text-black text-xs px-3 py-1 rounded-full">
            Save {deal.savings}
          </div>
          
          <div 
            className="text-9xl transform hover:scale-110 transition-transform"
            style={{
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15)) drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
              transform: 'perspective(1000px) translateZ(50px)'
            }}
          >
            {getEmoji(deal.category)}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl mb-2">{deal.restaurant}</h3>
          
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{deal.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-pink-400" />
              <span>{deal.time}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {/* Force line-through using style to ensure it appears */}
              <span className="text-gray-400 text-lg" style={{ textDecoration: 'line-through' }}>
                {formatPrice(deal.originalPrice)}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(deal.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}