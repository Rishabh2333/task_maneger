import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
