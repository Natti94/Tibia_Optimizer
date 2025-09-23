import { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Nav() {
  const [collapsed, setCollapsed] = useState(false);

  const isProd = import.meta.env.PROD;

  const assets = {
    book_gif: isProd
      ? `/api/getAsset?asset=book_gif`
      : import.meta.env.VITE_CLOUDINARY_BOOK_GIF,
    title_small: isProd
      ? `/api/getAsset?asset=title_small`
      : import.meta.env.VITE_CLOUDINARY_TITLE_SMALL,
    about: isProd
      ? `/api/getAsset?asset=about_icon`
      : import.meta.env.VITE_CLOUDINARY_ABOUT_ICON,
    guide: isProd
      ? `/api/getAsset?asset=guide_icon`
      : import.meta.env.VITE_CLOUDINARY_GUIDE_ICON,
    contact: isProd
      ? `/api/getAsset?asset=contact_icon`
      : import.meta.env.VITE_CLOUDINARY_CONTACT_ICON,
    cooperation: isProd
      ? `/api/getAsset?asset=cooperation_icon`
      : import.meta.env.VITE_CLOUDINARY_COOPERATION_ICON,
    donate: isProd
      ? `/api/getAsset?asset=donate_icon`
      : import.meta.env.VITE_CLOUDINARY_DONATE_ICON,
  };

  return (
    <div>
      <nav className={`side-nav${collapsed ? " collapsed" : ""}`}>
        <img
          className="side-nav-image-top"
          src={assets.book_gif}
          alt="Nav Image"
        />
        <button
          className="side-nav-collapse-btn"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          type="button"
        >
          <span className="side-nav-collapse-icon">
            {collapsed ? "»" : "«"}
          </span>
        </button>

        <div className="side-nav-title">{!collapsed}</div>

        <ul>
          {!collapsed && (
            <Link to="/" className="side-nav-logo-link">
              <img
                className="side-nav-logo"
                src={assets.title_small}
                alt="Title Small"
                height={90}
                width={120}
              />
            </Link>
          )}

          <li>
            <Link to="/about">
              <img className="nav-icon" src={assets.about} alt="About Icon" />
              <span>About</span>
            </Link>
          </li>

          <li>
            <Link to="/guides">
              <img className="nav-icon" src={assets.guide} alt="Guides Icon" />
              <span>Guides</span>
            </Link>
          </li>
          <li>
            <Link to="/cooperations">
              <img
                className="nav-icon"
                src={assets.cooperation}
                alt="Cooperations Icon"
              />
              <span>Cooperations</span>
            </Link>
          </li>

          <li>
            <Link to="/contact">
              <img
                className="nav-icon"
                src={assets.contact}
                alt="Contact Icon"
              />
              <span>Contact</span>
            </Link>
          </li>

          <li>
            <Link to="/donate">
              <img className="nav-icon" src={assets.donate} alt="Donate Icon" />
              <span>Donate</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
