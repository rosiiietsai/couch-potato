import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkFill } from 'react-icons/bs';
import { FaPenAlt, FaSignInAlt, FaSignOutAlt, FaHeart } from 'react-icons/fa';

import { logout } from '../store';

export default function Menu({ className = '', ...rest }) {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const links = [
    {
      title: 'Sign up',
      icon: <FaPenAlt className="icon--primary" />,
      to: '/signup',
      display: !user,
    },
    {
      title: 'Login',
      icon: <FaSignInAlt className="icon--primary" />,
      to: '/login',
      display: !user,
    },
    {
      title: 'Watchlist',
      icon: <BsBookmarkFill className="icon--primary" />,
      to: '/watchlist',
      display: true,
    },
    {
      title: 'Favorite',
      icon: <FaHeart className="icon--primary" />,
      to: '/favorite',
      display: true,
    },
  ];

  return (
    <div className={`menu ${className}`} {...rest}>
      <ul>
        {user && (
          <li className="menu__user">
            <span className="navbar__display-name">Hi, {user.displayName}</span>
          </li>
        )}

        {links.map(
          link =>
            link.display && (
              <li key={link.title}>
                <Link to={link.to} className="menu__link">
                  {link.icon}
                  {link.title}
                </Link>
              </li>
            )
        )}

        {user && (
          <li className="menu__logout" onClick={() => dispatch(logout())}>
            <FaSignOutAlt className="icon--primary" />
            Logout
          </li>
        )}
      </ul>
    </div>
  );
}
