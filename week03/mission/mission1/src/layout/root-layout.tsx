// src/layout/root-layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar'; //navbar 추가

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;