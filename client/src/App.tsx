import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import Router from './router';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
