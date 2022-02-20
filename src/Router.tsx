import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { route } from './constants/route';

export const Router = () => {
  return (
    <Routes>
      <Route path={route.index} element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
