import {
  FaChartLine,
  FaShoppingBag,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

import logo from "../assets/logo.png";

export default function Sidebar({ page, setPage, logout }) {
  const links = [
    { id: "dashboard", name: "Dashboard", icon: <FaChartLine /> },
    { id: "orders", name: "Orders", icon: <FaShoppingBag /> },
    { id: "users", name: "Users", icon: <FaUsers /> },
    { id: "analytics", name: "Analytics", icon: <FaChartLine /> },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-80 bg-gradient-to-b from-black via-red-950 to-black p-5 text-white shadow-2xl lg:block">
      <div className="rounded-[30px] bg-white/10 p-5 text-center shadow-2xl">
        <img
          src={logo}
          alt="TOPS CHICKEN"
          className="mx-auto h-24 w-24 rounded-full bg-white object-contain p-2 shadow-xl"
        />

        <h1 className="mt-4 text-3xl font-black text-yellow-300">
          TOPS CHICKEN
        </h1>

        <p className="font-black text-white">Peri Peri Admin</p>
      </div>

      <div className="mt-8 space-y-3">
        {links.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => setPage(link.id)}
            className={`flex w-full items-center gap-3 rounded-2xl px-5 py-4 text-left font-black transition ${
              page === link.id
                ? "bg-yellow-400 text-black"
                : "bg-white/10 hover:bg-red-700"
            }`}
          >
            {link.icon}
            {link.name}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={logout}
        className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-3 rounded-full bg-red-700 px-5 py-4 font-black hover:bg-yellow-400 hover:text-black"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}