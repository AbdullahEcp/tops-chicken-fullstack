import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function AuthProvider({ children }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("tops_user")) || null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("tops_token") || null;
  });

  const openLogin = () => {
    setAuthMode("login");
    setAuthOpen(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setAuthOpen(true);
  };

  const saveLogin = (data) => {
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("tops_user", JSON.stringify(data.user));
    localStorage.setItem("tops_token", data.token);

    setAuthOpen(false);
  };

  const registerUser = async (form) => {
    try {
      const res = await fetch(`${API}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return {
          success: false,
          message: data.message,
        };
      }

      saveLogin(data);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: "Server error. Please try again.",
      };
    }
  };

  const loginUser = async (form) => {
    try {
      const res = await fetch(`${API}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return {
          success: false,
          message: data.message,
        };
      }

      saveLogin(data);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: "Server error. Please try again.",
      };
    }
  };

  const googleLogin = () => {
    alert("Real Google Login will be added with Firebase in next phase.");
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("tops_user");
    localStorage.removeItem("tops_token");
  };

  return (
    <AuthContext.Provider
      value={{
        authOpen,
        setAuthOpen,
        authMode,
        setAuthMode,

        user,
        token,

        openLogin,
        openSignup,
        registerUser,
        loginUser,
        googleLogin,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}