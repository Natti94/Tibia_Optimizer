import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="side-nav">
      <div className="side-nav-title">Tibia Optimizer</div>
      <ul>
        <li>
          <a onClick={() => handleLinkClick("/")}>Home</a>
        </li>
        <li>
          <a onClick={() => handleLinkClick("/optimizer")}>Optimizer</a>
        </li>
        <li>
          <a onClick={() => handleLinkClick("/about")}>About</a>
        </li>
        <li>
          <a href="#">Character</a>
        </li>
        <li>
          <a href="#">Skills</a>
        </li>
        <li>
          <a href="#">Equipments</a>
        </li>
        <li>
          <a href="#">Weapons</a>
        </li>
        <li>
          <a href="#">Runes</a>
        </li>
        <li>
          <a href="#">Spells</a>
        </li>
        <li>
          <a href="#">Encounters</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
