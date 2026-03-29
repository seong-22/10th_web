// src/components/navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => { //navbar 눌렀을 때 작동할 것
  return (
    <nav>
      <Link to="/">홈 페이지로 이동</Link>
      <Link to="/movies">영화 목록 페이지로 이동</Link>
    </nav>
  );
};

export default Navbar;