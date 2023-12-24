import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  let { user } = useContext(AuthContext);
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Êtes-vous sûr de vouloir vous déconnecter ?"
    );
    if (confirmLogout) {
      window.location.href = "/logout";
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/abonnes">Abonné(e)s</Link>
          </li>
          <li>
            <Link to="/livres">Livres</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>{user ? <Link onClick={handleLogout}>Déconnexion</Link> : ""}</li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
