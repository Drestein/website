import "./styles/HambBurger.css";
import { HashLink as Link } from "react-router-hash-link";

const Mobilenav = ({ openMenu, setOpenMenu }) => {
  return (
    <>
    <div className={`nav-overlay ${openMenu ? "slide" : ""}`} onClick={() => setOpenMenu(!openMenu)}></div>
    <div className={`onlyshow ${openMenu ? "slide" : ""}`}>
      <ul className="nav-list">
        <Link style={{ textDecoration: "inherit" }} onClick={() => setOpenMenu(!openMenu)} to="/#">
          <li>HOME</li>
        </Link>
        <Link style={{ textDecoration: "inherit" }}onClick={() => setOpenMenu(!openMenu)} to="/#Departments">
          <li>DEPARTMENTS</li>
        </Link>
        <Link style={{ textDecoration: "inherit" }}onClick={() => setOpenMenu(!openMenu)} to="/#SpecialEvents">
          <li>SPECIAL EVENTS</li>
        </Link>
        <Link style={{ textDecoration: "inherit" }}onClick={() => setOpenMenu(!openMenu)} to="/#Gallery">
          <li>MEMORIES</li>
        </Link>
        <Link style={{ textDecoration: "inherit" }}onClick={() => setOpenMenu(!openMenu)} to="/#SECLife">
          <li>ABOUT SEC</li>
        </Link>
        <Link style={{ textDecoration: "inherit" }}onClick={() => setOpenMenu(!openMenu)} to="/#Guest">
          <li>CHIEF GUEST</li>
        </Link>
        <Link style={{ textDecoration: "inherit" }}onClick={() => setOpenMenu(!openMenu)} to="/#About">
          <li>ABOUT</li>
        </Link>
      </ul>
    </div>
    </>
  );
};
export default Mobilenav;
