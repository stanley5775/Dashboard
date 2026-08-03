import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <aside className="bg-gray-900 text-white w-64 p-4">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" className="block py-2 px-4 hover:bg-gray-700">
              Dashboard
            </NavLink>
          </li>

        </ul>
      </nav>

      <p>Welcome, {user?.name}!</p>
      <button onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
