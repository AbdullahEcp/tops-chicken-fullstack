import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaShoppingBag,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Users from "./Users";
import Analytics from "./Analytics";
import logo from "../assets/logo.png";

export default function AdminLayout() {
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = localStorage.getItem("tops_admin");

  if (!isAdmin) {
    window.location.href = "/admin";
    return null;
  }

  const logout = () => {
    localStorage.removeItem("tops_admin");
    window.location.href = "/admin";
  };

  const openPage = (target) => {
    setPage(target);
    setMobileOpen(false);
  };

  const links = [
    { id: "dashboard", name: "Dashboard", icon: <FaChartLine /> },
    { id: "orders", name: "Orders", icon: <FaShoppingBag /> },
    { id: "users", name: "Users", icon: <FaUsers /> },
    { id: "analytics", name: "Analytics", icon: <FaChartLine /> },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <div className="lg:hidden">
        <div className="fixed left-0 top-0 z-[90] flex h-[76px] w-full items-center justify-between bg-black px-4 text-white shadow-2xl">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="TOPS CHICKEN"
              className="h-12 w-12 rounded-full bg-white object-contain p-1"
            />

            <div>
              <h1 className="text-lg font-black text-yellow-300">
                TOPS Admin
              </h1>
              <p className="text-xs font-bold text-gray-300">
                Restaurant Panel
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full bg-red-700 p-3 text-xl"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm">
            <div className="mt-[76px] bg-gradient-to-b from-black to-red-950 p-5 text-white shadow-2xl">
              <div className="grid gap-3">
                {links.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => openPage(link.id)}
                    className={`flex items-center gap-3 rounded-2xl px-5 py-4 font-black ${
                      page === link.id
                        ? "bg-yellow-400 text-black"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={logout}
                  className="mt-2 flex items-center justify-center gap-3 rounded-full bg-red-700 px-5 py-4 font-black text-white"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        <Sidebar page={page} setPage={setPage} logout={logout} />

        <section className="min-h-screen flex-1 p-4 pt-24 md:p-8 lg:pt-8">
          {page === "dashboard" && <Dashboard setPage={setPage} />}
          {page === "orders" && <Orders />}
          {page === "users" && <Users />}
          {page === "analytics" && <Analytics />}
        </section>
      </div>
    </main>
  );
}