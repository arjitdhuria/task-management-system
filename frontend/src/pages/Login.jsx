import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow p-6">

        {/* Title */}
        <h1 className="text-2xl font-bold text-indigo-600 mb-1 text-center">
          Task Management
        </h1>
        <p className="text-slate-500 text-center mb-6">
          Login to continue
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2
              focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full border rounded-lg px-3 py-2
              focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg
            hover:bg-indigo-700 transition shadow-sm disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-slate-500 text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

