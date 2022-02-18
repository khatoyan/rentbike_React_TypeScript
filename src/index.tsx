import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './layout';

import './styles/normalize.css';
import './styles/main.css';

render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>,
  document.getElementById('app-root')
);
