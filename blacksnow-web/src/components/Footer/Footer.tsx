import { COORDS, SEASON_LABEL } from '../../config/constants';
import './Footer.scss';

const Footer = () => (
  <footer className="page-footer">
    <span className="footer-coord">{COORDS}</span>
    <span className="footer-season">{SEASON_LABEL}</span>
  </footer>
);

export default Footer;
