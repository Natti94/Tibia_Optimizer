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
                  src="/nav/title_small.png"
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
                <Link to="/cooperations">
                  Cooperations
                  <img
                    className="nav-icon"
                    src="/nav/cooperate_icon.png"
                    alt="Cooperate Icon"
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
