import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Catalog } from './pages/Catalog/Catalog';
import { Main } from './pages/Main';
import { Books } from './pages/Books';
import { Settings } from './pages/Settings';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/books" element={<Books />} />
      <Route path="books/:orderId" element={<Books />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};
