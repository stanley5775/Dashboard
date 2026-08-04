import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate("/");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      {/* Left Side */}

      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
              D
            </div>

            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          </div>

          <h2 className="text-5xl font-bold leading-tight text-white">
            Welcome Back
          </h2>

          <p className="mt-6 text-lg text-slate-200">
            Sign in to continue managing your dashboard, projects, analytics and
            tasks.
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex justify-center items-center p-6">
        <div className="auth-card w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-2">Sign In</h2>

          <p className="text-center text-slate-500 mb-8">
            Welcome back! Please login.
          </p>

          <form onSubmit={submit} className="space-y-5">
            {/* Email */}

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11"
              />
            </div>

            {/* Password */}

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Remember */}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                Remember me
              </label>

              <button type="button" className="text-indigo-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500">
            Don't have an account?
            <Link
              to="/register"
              className="ml-2 text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
