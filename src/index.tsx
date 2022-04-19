import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Layout from './layout';
import Dnd from './pages/Dnd/Dnd';
import BeautifulDnd from './pages/BeautifulDnd/BeautifulDnd';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dnd" element={<Dnd />} />
          <Route path="/beautiful-dnd" element={<BeautifulDnd />} />
          <Route path="" element={<Navigate to="/dnd" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
