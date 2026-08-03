import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const success = register(form);

    if (success) {
      navigate("/login");
    } else {
      alert("Registration failed. Please try again.");
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
            Build. Manage. Grow.
          </h2>

          <p className="mt-6 text-lg text-slate-200">
            Create your account and manage projects, analytics and tasks from
            one modern dashboard.
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex justify-center items-center p-6">
        <div className="auth-card w-full max-w-md">
          <h2 className="text-center text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-center text-slate-500 mb-8">
            Welcome! Let's get you started.
          </p>

          <form onSubmit={submit} className="space-y-5">
            {/* Name */}

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="pl-11"
              />
            </div>

            {/* Email */}

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
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
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
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

            <button type="submit" className="btn-primary w-full">
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
