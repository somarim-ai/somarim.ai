
import React from 'react';
import LoginBackground from './LoginBackground';

export default function LoginScene({ children }) {
  return (
    <div>
      <LoginBackground />
      {children}
    </div>
  );
}
