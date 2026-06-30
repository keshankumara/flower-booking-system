import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">

      <div className="footer__inner container">

        {/* Brand */}
        <div className="footer__brand">
          <h2 className="footer__logo">
            The Digital Conservatory
          </h2>

          <p className="footer__tagline">
            Creating botanical moments that last a lifetime. Our mission is to
            bridge the gap between nature's beauty and digital convenience.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer__col">
          <h3 className="footer__title">Navigation</h3>
          <ul>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/subscriptions">Subscribed Blooms</Link></li>
            <li><Link to="/workshops">Workshops</Link></li>
            <li><Link to="/gift-cards">Gift Cards</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer__col">
          <h3 className="footer__title">Support</h3>
          <ul>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} The Digital Conservatory. All rights reserved.</p>

          <div className="footer__socials">
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer