import { useState } from "react";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function AuthModal() {
  const {
    authOpen,
    setAuthOpen,
    authMode,
    setAuthMode,
    registerUser,
    loginUser,
    googleLogin,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [googleConfirm, setGoogleConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const emptyForm = {
    name: "",
    email: "",
    password: "",
  };

  const [form, setForm] = useState(emptyForm);

  const closeAuth = () => {
    setForm(emptyForm);
    setErrors({});
    setGoogleConfirm(false);
    setShowPassword(false);
    setAuthOpen(false);
  };

  if (!authOpen) return null;

  const isSignup = authMode === "signup";

  const validEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const passwordRules = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
  };

  const strongPassword = Object.values(passwordRules).every(Boolean);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", google: "" });
  };

  const submitAuth = () => {
    const newErrors = {};

    if (isSignup && !form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validEmail(form.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be 8+ characters";
    } else if (!strongPassword) {
      newErrors.password =
        "Password must contain capital, small, number and symbol";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (isSignup) {
      const result = registerUser(form);

      if (!result.success) {
        setErrors({
          email: result.message,
        });

        return;
      }
    } else {
      const result = loginUser(form);

      if (!result.success) {
        setErrors({
          password: result.message,
        });

        return;
      }
    }

    setForm(emptyForm);
    setErrors({});
    setGoogleConfirm(false);
    setShowPassword(false);
  };

  const handleGoogleLogin = () => {
    googleLogin();

    setForm(emptyForm);
    setErrors({});
    setGoogleConfirm(false);
    setShowPassword(false);
  };

  const switchMode = () => {
    setAuthMode(isSignup ? "login" : "signup");
    setForm(emptyForm);
    setErrors({});
    setGoogleConfirm(false);
    setShowPassword(false);
  };

  return (
    <>
      <div
        onClick={closeAuth}
        className="fixed inset-0 z-[210] bg-black/80 backdrop-blur-md"
      ></div>

      <div className="fixed inset-0 z-[220] flex items-center justify-center px-4 py-6">
        <div className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[42px] bg-white shadow-2xl">
          <button
            onClick={closeAuth}
            className="absolute right-4 top-4 z-20 rounded-full bg-black p-3 text-white shadow-xl transition hover:scale-110"
          >
            <FaTimes />
          </button>

          <div className="grid lg:grid-cols-[1fr_1.05fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-t-[42px] lg:rounded-l-[42px] lg:rounded-tr-none">
              <img
                src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1200&auto=format&fit=crop"
                alt="TOPS CHICKEN login food"
                className="h-full min-h-[520px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-red-950/30"></div>

              <div className="absolute left-6 top-6 rounded-full bg-yellow-400 px-5 py-3 text-sm font-black text-black shadow-2xl">
                TOPS CHICKEN Peri Peri
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-10">
                <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
                  Secure Customer Area
                </p>

                <h2 className="mt-4 text-5xl font-black leading-tight">
                  Login Before Ordering
                </h2>

                <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-gray-200">
                  Create your account to checkout, book food orders and track
                  your TOPS CHICKEN delivery safely.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {["Secure Login", "Order Tracking", "Fast Checkout"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-white/15 p-4 text-center font-black backdrop-blur"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-black uppercase tracking-[4px] text-red-700">
                {isSignup ? "Create Secure Account" : "Customer Login"}
              </p>

              <h2 className="mt-3 text-4xl font-black text-black md:text-5xl">
                {isSignup ? "Sign Up" : "Login"}
              </h2>

              <p className="mt-3 font-semibold leading-7 text-gray-500">
                {isSignup
                  ? "Use full name, email and strong password before ordering."
                  : "Login with the same email and password used during signup."}
              </p>

              <div className="mt-7 space-y-4">
                {isSignup && (
                  <InputBox
                    label="Full Name"
                    name="name"
                    icon={<FaUser />}
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                )}

                <InputBox
                  label="Email Address"
                  name="email"
                  icon={<FaEnvelope />}
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <div>
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    Password
                  </label>

                  <div
                    className={`flex items-center gap-3 rounded-2xl border-2 bg-gray-50 p-4 text-black focus-within:border-red-600 ${
                      errors.password ? "border-red-600" : "border-gray-100"
                    }`}
                  >
                    <FaLock className="text-red-700" />

                    <input
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        isSignup
                          ? "Min 8 chars, A-z, number, symbol"
                          : "Enter password"
                      }
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

                  {errors.password && (
                    <p className="mt-1 text-sm font-bold text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {isSignup && (
                  <div className="rounded-3xl bg-gray-50 p-4">
                    <p className="mb-3 flex items-center gap-2 text-sm font-black text-gray-700">
                      <FaShieldAlt className="text-red-700" />
                      Password Security
                    </p>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <Rule ok={passwordRules.length} text="8 characters" />
                      <Rule ok={passwordRules.uppercase} text="Capital letter" />
                      <Rule ok={passwordRules.lowercase} text="Small letter" />
                      <Rule ok={passwordRules.number} text="Number digit" />
                      <Rule ok={passwordRules.special} text="Special symbol" />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={submitAuth}
                  className="premium-btn w-full rounded-full bg-red-700 px-6 py-4 text-lg font-black text-white hover:bg-black"
                >
                  {isSignup ? "Create Secure Account" : "Secure Login"}
                </button>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="premium-btn flex w-full items-center justify-center gap-3 rounded-full border-2 border-gray-200 bg-white px-6 py-4 font-black text-black hover:bg-gray-100"
                >
                  <FaGoogle className="text-red-700" />
                  Continue with Google
                </button>

                <p className="text-center font-semibold text-gray-600">
                  {isSignup
                    ? "Already have an account?"
                    : "Don’t have an account?"}{" "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="font-black text-red-700"
                  >
                    {isSignup ? "Login" : "Sign Up"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InputBox({ label, name, icon, placeholder, value, onChange, error }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-gray-700">
        {label}
      </label>

      <div
        className={`flex items-center gap-3 rounded-2xl border-2 bg-gray-50 p-4 text-black focus-within:border-red-600 ${
          error ? "border-red-600" : "border-gray-100"
        }`}
      >
        <span className="text-red-700">{icon}</span>

        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent font-bold outline-none"
        />
      </div>

      {error && <p className="mt-1 text-sm font-bold text-red-600">{error}</p>}
    </div>
  );
}

function Rule({ ok, text }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl p-2 text-xs font-black ${
        ok ? "bg-green-100 text-green-700" : "bg-white text-gray-500"
      }`}
    >
      <FaCheckCircle />
      {text}
    </div>
  );
}