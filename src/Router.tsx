import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { Catalog } from './pages/Catalog/Catalog';
import { UserSettings } from './pages/UserSettings/UserSettings';
import { Booking } from './pages/Booking/Booking';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/books" element={<Booking />} />
        <Route path="/books/:orderId" element={<Booking />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
