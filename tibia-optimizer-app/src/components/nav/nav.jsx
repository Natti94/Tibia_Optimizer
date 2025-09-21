import { useState } from "react";
import { Link } from "react-router-dom";

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
            <>
              <hr color="#ff8c00" />
              <Link to="/">
                <img
                  src={assets.title_small}
                  alt="Title Small"
                  height={90}
                  width={120}
                  style={{ marginLeft: "3.1rem", marginTop: "1rem" }}
                />
              </Link>
              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/guides">Guides</Link>
              </li>
              <li>
                <Link to="/partners">
                  Partners
                  <img
                    className="nav-icon"
              
                    alt="Partners Icon"
                    style={{ margin: "-0.5rem 1rem" }}
                  />
                </Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>

              <li>
                <Link to="/support">Support Us</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
