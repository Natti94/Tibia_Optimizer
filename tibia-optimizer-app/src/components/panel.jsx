import { useState } from "react";

function Panel() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`right-panel${collapsed ? " collapsed" : ""}`}>
      <button
        className="right-panel-collapse-btn"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Expand right panel" : "Collapse right panel"}
        type="button"
      >
        <span className="right-panel-collapse-icon">
          {collapsed ? "«" : "»"}
        </span>
      </button>

      {!collapsed && (
        <div className="right-panel-content">
          <hr color="#ff8c00" />
          <br />
          <video
            src="/panel/panel_video.mp4"
            controls
            width="100%"
            aria-label="Panel Video"
            autoPlay
            loop
            muted
          ></video>
        </div>
      )}
    </div>
  );
}

export default Panel;
