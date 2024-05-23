import React from 'react';
import { AuthProvider } from './hooks/AuthProvider';
import { ToastContainer } from 'react-toastify';
import Router from './router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
