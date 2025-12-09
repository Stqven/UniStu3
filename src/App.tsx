import { SignUpPage } from './components/SignUpPage';
import { DealsPage } from './components/DealsPage';
import { useAuth } from './hooks/useAuth';

function AppContent() {
  const { user, loading, profile } = useAuth();

  // Show loading spinner while checking session
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show sign up page if no user
  if (!user) {
    return <SignUpPage />;
  }

  // Show deals page if user is authenticated
  // Use profile name if available, otherwise fallback to email username or 'User'
  const userName = profile?.name || user.email?.split('@')[0] || 'User';
  
  return <DealsPage userName={userName} />;
}

export default function App() {
  return <AppContent />;
}