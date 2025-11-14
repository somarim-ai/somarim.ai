import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import LoginScene from './components/login/LoginScene';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';
import DashboardShell from './components/dashboard/DashboardShell';

import './styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const switchToRegister = () => setIsRegistering(true);
  const switchToLogin = () => setIsRegistering(false);

  return (
    <div className="App">
      {user ? (
        <DashboardShell loggedIn={true} />
      ) : (
        <LoginScene>
          {isRegistering ? (
            <RegisterForm onSwitchToLogin={switchToLogin} />
          ) : (
            <LoginForm onSwitchToRegister={switchToRegister} />
          )}
        </LoginScene>
      )}
    </div>
  );
}

export default App;
