import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../css/app.css';

import Dashboard from './components/Dashboard';
import WeddingForm from './components/WeddingForm';
import AdminWeddingList from './components/admin/AdminWeddingList';
import Invitation from './components/guest/Invitation';
import UndanganViewer from './components/admin/UndanganViewer';
import MainLayout from './components/layouts/MainLayout';

const App = () => (
  <BrowserRouter basename="/app">
    <MainLayout>
        <Routes>
            <Route path="/" element={<AdminWeddingList />} />
            <Route path="/wedding-form" element={<WeddingForm />} />
            <Route path="/admin/wedding" element={<AdminWeddingList />} />
            <Route path="/invitation/:id" element={<Invitation />} />
            <Route path="/admin/wedding-viewer/:id" element={<UndanganViewer />} />
        </Routes>
    </MainLayout>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
