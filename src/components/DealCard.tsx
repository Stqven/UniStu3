import { Star, Clock, MapPin } from 'lucide-react';

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

  return (
    <div 
      className="min-w-[280px] w-[280px] snap-center"
      onClick={onClaim}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer">
        <div className={`${deal.color} p-12 relative flex items-center justify-center`}>
          <div className="absolute top-3 right-3 bg-black text-white text-xs px-3 py-1 rounded-full">
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
            <div>
              <p className="text-gray-500 text-xs mb-1">You Save</p>
              <p className="text-2xl">{deal.savings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}