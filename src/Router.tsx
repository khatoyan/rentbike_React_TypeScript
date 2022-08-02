import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { Catalog } from './pages/Catalog/Catalog';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
