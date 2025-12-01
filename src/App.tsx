import { useState } from 'react';
import { SignUpPage } from './components/SignUpPage';
import { DealsPage } from './components/DealsPage';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');

  if (!isSignedIn) {
    return <SignUpPage onSignUp={(name) => {
      setUserName(name);
      setIsSignedIn(true);
    }} />;
  }

  return <DealsPage userName={userName} />;
}
