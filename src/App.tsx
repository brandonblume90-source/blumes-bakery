/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FallingTreats from './components/FallingTreats';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Story from './pages/Story';
import Location from './pages/Location';
import Order from './pages/Order';
import ProductDetail from './pages/ProductDetail';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-bakery-bg relative">
      <FallingTreats />
      <div className="flex-grow flex flex-col relative z-10 w-full">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="story" element={<Story />} />
          <Route path="location" element={<Location />} />
          <Route path="order" element={<Order />} />
          <Route path="product/:slug" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

