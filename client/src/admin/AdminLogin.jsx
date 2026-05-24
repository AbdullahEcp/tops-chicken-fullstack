import { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
  FaUserShield,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import logo from "../assets/logo.png";

export default function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAIL = "abdusamad@madi.com";
  const ADMIN_PASSWORD = "Madi169@";

  const login = () => {
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Admin email and password are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        form.email.trim().toLowerCase() === ADMIN_EMAIL &&
        form.password === ADMIN_PASSWORD
      ) {
        localStorage.setItem("tops_admin", "true");
        localStorage.setItem("tops_admin_email", ADMIN_EMAIL);
        localStorage.setItem("tops_admin_last_login", new Date().toLocaleString());

        window.location.href = "/admin/dashboard";
        return;
      }

      setLoading(false);
      setError("Invalid admin email or password");
    }, 900);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#7f0000,transparent_35%),radial-gradient(circle_at_bottom_right,#c40000,transparent_30%)]"></div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-10 lg:grid-cols-[1fr_0.9fr]">
        <section className="hidden lg:block">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 font-black text-yellow-300 shadow-xl backdrop-blur">
            <FaShieldAlt />
            Secure Restaurant Admin Panel
          </div>

          <h1 className="mt-8 text-7xl font-black leading-tight">
            TOPS CHICKEN
            <span className="block text-yellow-300">Control Center</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-gray-300">
            Manage customer orders, invoice printing, tracking updates, sales,
            and restaurant workflow from one premium admin dashboard.
          </p>

          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {["Order Control", "Invoice Print", "Live Tracking"].map((item) => (
              <div
                key={item}
                className="rounded-3xl bg-white/10 p-5 text-center font-black shadow-xl backdrop-blur"
              >
                <FaCheckCircle className="mx-auto mb-3 text-3xl text-yellow-300" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[42px] border border-white/10 bg-white p-6 text-black shadow-2xl sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white p-2 shadow-2xl ring-4 ring-yellow-400">
              <img
                src={logo}
                alt="TOPS CHICKEN"
                className="h-full w-full rounded-full object-contain"
              />
            </div>

            <h2 className="mt-6 text-4xl font-black">Admin Login</h2>

            <p className="mt-2 font-semibold text-gray-500">
              Secure access for TOPS CHICKEN management.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <InputBox
              icon={<FaEnvelope />}
              placeholder="Admin Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-4 focus-within:ring-2 focus-within:ring-red-700">
              <FaLock className="text-red-700" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Admin Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") login();
                }}
                className="w-full bg-transparent font-bold outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-gray-600">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) =>
                    setForm({ ...form, remember: e.target.checked })
                  }
                  className="h-4 w-4 accent-red-700"
                />
                Remember me
              </label>

              <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-black text-red-700">
                Admin Only
              </span>
            </div>

            {error && (
              <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                <FaExclamationTriangle />
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={login}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-red-700 px-6 py-4 text-lg font-black text-white shadow-xl transition hover:bg-black disabled:bg-gray-500"
            >
              <FaUserShield />
              {loading ? "Checking Security..." : "Login to Dashboard"}
            </button>

            <div className="rounded-3xl bg-black p-5 text-white">
              <p className="flex items-center gap-2 text-sm font-black text-yellow-300">
                <FaShieldAlt />
                Security Status
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SecurityItem text="Protected admin route" />
                <SecurityItem text="Session saved locally" />
                <SecurityItem text="Order management locked" />
                <SecurityItem text="Invoice access protected" />
              </div>
            </div>

            <p className="text-center text-xs font-bold leading-6 text-gray-500">
              Only authorized restaurant admin can access this dashboard.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function InputBox({ icon, ...props }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-4 focus-within:ring-2 focus-within:ring-red-700">
      <span className="text-red-700">{icon}</span>

      <input
        {...props}
        className="w-full bg-transparent font-bold outline-none"
      />
    </div>
  );
}

function SecurityItem({ text }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-3 text-xs font-bold">
      <FaCheckCircle className="text-yellow-300" />
      {text}
    </div>
  );
}