import Logo from '../assets/logo.png';
import TMDBLogo from '../assets/tmdb_logo.svg';

import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { RiInstagramFill, RiLineFill } from 'react-icons/ri';

const socialMedia = [
  { name: 'facebook', icon: <FaFacebookF />, link: '/' },
  { name: 'twitter', icon: <FaTwitter />, link: '/' },
  { name: 'instagram', icon: <RiInstagramFill />, link: '/' },
  { name: 'line', icon: <RiLineFill />, link: '/' },
  { name: 'youtube', icon: <FaYoutube />, link: '/' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__main">
          <div className="footer__logo">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>

          <div className="footer__social-media">
            Follow us:
            {socialMedia.map(el => (
              <a
                key={el.name}
                href={el.link}
                className="btn btn__social-media btn--primary btn--round">
                {el.icon}
              </a>
            ))}
          </div>

          <div className="footer__attribution">
            Attribution:
            <div className="footer__attribution-logo">
              <a href="https://www.themoviedb.org/">
                <img src={TMDBLogo} alt="TMDB Logo" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__copyright">
          <p>
            Copyright &copy; 2023 by rosiiietsai. All rights reserved. This
            product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
