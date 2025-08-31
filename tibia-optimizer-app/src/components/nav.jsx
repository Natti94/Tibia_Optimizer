import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <nav className={`side-nav${collapsed ? " collapsed" : ""}`}>
        <img
          className="side-nav-image-top"
          src="/nav/nav_image.gif"
          alt="Nav Image"
        />
        <button
          className="side-nav-collapse-btn"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          type="button"
        >
          <span className="side-nav-collapse-icon" color="">
            {collapsed ? "»" : "«"}
          </span>
        </button>
        <div className="side-nav-title">{!collapsed}</div>

        <ul>
          {!collapsed && (
            <>
              <hr color="#ff8c00" />
              <br />
              <li>
                <Link to="/">Home</Link>
              </li>
              <br />
              <li>
                <Link to="/about">About</Link>
              </li>
              <br />
              <li>
                <Link to="/guides">Guides</Link>
              </li>
              <br />
              <li>
                <Link to="/cooperations">Cooperations</Link>
              </li>
              <br />
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <br />
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
