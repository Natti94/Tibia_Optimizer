import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <nav className={`side-nav${collapsed ? " collapsed" : ""}`}>
      <button
        className="side-nav-collapse-btn"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        type="button"
      >
        {collapsed ? "»" : "«"}
      </button>
      <div className="side-nav-title">{!collapsed && "Tibia Optimizer"}</div>
      <ul>
        {!collapsed && (
          <>
            <li>
              <a onClick={() => handleLinkClick("/")}>Home</a>
            </li>
            <br />
            <li>
              <a onClick={() => handleLinkClick("/optimizer")}>About</a>
            </li>
            <br />
            <li>
              <a onClick={() => handleLinkClick("/about")}>Donate</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
