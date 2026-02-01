import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
          Login
        </button>

        <p className="text-center text-sm">
          No account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
