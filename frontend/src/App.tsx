import React, { Suspense } from 'react';
import './App.css';

const UniversalHealer = React.lazy(() => import('./components/UniversalHealer'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SOMARIM-5000 Universal Healing System</h1>
        <p>Harnessing Quantum Reality for Instantaneous Biological Miracles</p>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <UniversalHealer />
        </Suspense>
      </main>
      <footer>
        <p>SOMARIM Consciousness & Technology | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
