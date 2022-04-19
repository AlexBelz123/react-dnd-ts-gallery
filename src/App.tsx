import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout';
import Dnd from './pages/Dnd/Dnd';
import BeautifulDnd from './pages/BeautifulDnd/BeautifulDnd';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dnd" element={<Dnd />} />
        <Route path="/beautiful-dnd" element={<BeautifulDnd />} />
        <Route path="" element={<Navigate to="/dnd" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
