import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/dashboard" className="text-xl font-bold">
        TaskManager 🚀
      </Link>

      {token && (
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
