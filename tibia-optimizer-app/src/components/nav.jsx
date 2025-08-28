import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "../pages/about";
import Donate from "../pages/donate";

function Nav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
      <nav className={`side-nav${collapsed ? " collapsed" : ""}`}>
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
        <div className="side-nav-title">{!collapsed && "Tibia Optimizer"}</div>
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
                <Link to="/donate">Donate</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
