import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Review from './pages/Review';
import CalendarPage from './pages/Calendar';
import Settings from './pages/Settings';
import { GhostWriteProvider } from './lib/store';
import ConnectCallback from './pages/ConnectCallback';

function App() {
  return (
    <GhostWriteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="review" element={<Review />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="connect/callback" element={<ConnectCallback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GhostWriteProvider>
  );
}

export default App;
