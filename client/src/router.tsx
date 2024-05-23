import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function Router() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }>
      </Route>
      <Route path="/login" element={
        <Login />
      }>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default Router;