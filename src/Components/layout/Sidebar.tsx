import { NavLink } from "react-router-dom";

export default function Sidebar() {
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
          <li>
            <NavLink to="/profile" className="block py-2 px-4 hover:bg-gray-700">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="block py-2 px-4 hover:bg-gray-700">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
