// src/components/navbar.tsx
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const Navbar = () => { //navbar 눌렀을 때 작동할 것
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'px-3 py-2 rounded-md transition-all font-medium', // 공통 디자인
      isActive ? 'bg-blue-400 text-white' : 'text-gray-300 hover:text-black' // 활성화 여부에 따른 색상
    );


  return (
    <nav className='flex gap-4 p-4'>
      <NavLink to="/" className={navLinkStyle}>홈</NavLink>
      <NavLink to="/movies/category/popular" className={navLinkStyle}>인기 영화</NavLink>
      <NavLink to="/movies/category/now_playing" className={navLinkStyle}>상영 중</NavLink>
      <NavLink to="/movies/category/top_rated" className={navLinkStyle}>평점 높은</NavLink>
      <NavLink to="/movies/category/upcoming" className={navLinkStyle}>개봉 예정</NavLink>
    </nav>
  );
};

export default Navbar;