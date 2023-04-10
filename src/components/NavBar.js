import Logo from '../assets/logo.png';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { HiBars3 } from 'react-icons/hi2';

import Menu from './Menu';
import SearchBar from './SearchBar';

export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="wrapper">
        <div className="navbar__logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <ul className="navbar__items">
          <li className="navbar__link">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar__link">
            <Link to="/watchlist">Watchlist</Link>
          </li>
          <li className="navbar__link">
            <Link to="/favorite">Favorite</Link>
          </li>
          <li className="navbar__searchbar">
            <SearchBar />
          </li>

          {!user && (
            <li className="navbar__auth">
              <button
                className="btn btn--large btn--dark"
                onClick={() => navigate('/login')}>
                Login
              </button>
              <button
                className="btn btn--large btn--primary"
                onClick={() => navigate('/signup')}>
                Sign up
              </button>
            </li>
          )}

          {user && (
            <li
              className="navbar__user"
              onMouseEnter={() => setToggleMenu(true)}
              onMouseLeave={() => setToggleMenu(false)}
              onClick={() => setToggleMenu(!toggleMenu)}>
              <FaUser className="icon--primary" />
              <span className="navbar__display-name">
                Hi, {user.displayName}
              </span>
              {toggleMenu && <Menu />}
            </li>
          )}

          <li className="navbar__menu">
            <button
              className="btn btn__menu"
              onClick={() => setToggleMenu(!toggleMenu)}>
              <HiBars3 className="" />
            </button>
            {toggleMenu && <Menu onClick={() => setToggleMenu(!toggleMenu)} />}
          </li>
        </ul>
      </div>
    </nav>
  );
}
