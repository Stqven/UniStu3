import { X, MapPin, Clock, Star, Share2 } from 'lucide-react';

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

interface DealModalProps {
  deal: Deal;
  onClose: () => void;
}

export function DealModal({ deal, onClose }: DealModalProps) {
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

  const handleShare = async () => {
    const shareData = {
      title: `${deal.deal} at ${deal.restaurant}`,
      text: `Check out this BOGO deal! Save ${deal.savings} at ${deal.restaurant}. ${deal.description}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Deal link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  // Generate Google Maps URL
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(deal.address || `${deal.restaurant} Irvine CA`)}`;  
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Section with Emoji */}
        <div className={`${deal.color} p-16 relative flex flex-col items-center justify-center`}>
          <div 
            className="text-[12rem] mb-6"
            style={{
              filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.2)) drop-shadow(0 20px 30px rgba(0,0,0,0.15))',
              transform: 'perspective(1000px) translateZ(80px) rotateX(-5deg)'
            }}
          >
            {getEmoji(deal.category)}
          </div>
          <div className="bg-black text-white px-6 py-2 rounded-full text-lg">
            Save {deal.savings}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl mb-2">{deal.restaurant}</h2>
          <p className="text-xl text-purple-500 mb-4">{deal.deal}</p>
          
          <div className="flex items-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>{deal.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-pink-400" />
              <span>{deal.time}</span>
            </div>
            
            {/* Redirect Link */}
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-purple-600 transition-colors group cursor-pointer"
              title="Get Directions"
            >
              <MapPin className="w-5 h-5 text-purple-400 group-hover:text-purple-600" />
              {deal.restaurant} ({deal.distance})
            </a>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 mb-6">
            <h3 className="mb-2">About this deal</h3>
            <p className="text-gray-600">{deal.description}</p>
          </div>

          <div className="bg-pink-100 rounded-2xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-1">Valid until</p>
            <p className="text-xl">{deal.validUntil}</p>
          </div>

          <button 
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-5 rounded-2xl text-lg hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
            Share with Friends
          </button>
        </div>
      </div>
    </div>
  );
}