import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <nav className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/countries"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Study Countries
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Collection
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Quiz
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Leaderboard
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
