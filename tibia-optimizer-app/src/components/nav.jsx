import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className={`side-nav${collapsed ? " collapsed" : ""}`}>
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
            <li>
              <Link to="/">Home</Link>
            </li>
            <br />
            <li>
              <Link to="/about">About</Link>
            </li>
            <br />
            <li>
              <Link to="/donate">Guides</Link>
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
  );
}

export default Nav;
