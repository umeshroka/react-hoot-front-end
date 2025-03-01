import { useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // src/components/NavBar/NavBar.jsx

  return (
    <nav>
      {user ? (
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/logs">LOGS</Link>
          </li>
          <li>
            <Link to="/logs/new">NEW LOG</Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/sign-in">SIGN IN</Link>
          </li>
          <li>
            <Link to="/sign-up">SIGN UP</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
