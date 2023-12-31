import React from 'react';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="max-w-7xl mx-auto px-4 lg:px-2 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
