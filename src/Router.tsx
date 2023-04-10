import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Catalog } from './pages/Catalog/Catalog';
import { Main } from './pages/Main';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/catalog" element={<Catalog />} />
    </Routes>
  );
};
