import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { setCartOpen, cartItems, setTrackingOpen } = useCart();
  const { user, openLogin, openSignup, logoutUser } = useAuth();

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const openTrackingProtected = () => {
    if (!user) {
      openSignup();
      return;
    }

    setTrackingOpen(true);
  };

  const links = [
    { name: "Home", path: "#home" },
    { name: "Menu", path: "#menu" },
    { name: "Offers", path: "#offers" },
    { name: "About", path: "#about" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-red-700 shadow-2xl">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#home" className="group flex items-center gap-3">
          <img
            src={logo}
            alt="TOPS CHICKEN"
            className="h-12 w-12 rounded-full bg-white object-contain p-1 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          />

          <div>
            <h1 className="text-lg font-black leading-none tracking-wide text-white sm:text-xl md:text-2xl">
              TOPS CHICKEN
            </h1>

            <p className="mt-1 text-xs font-extrabold text-yellow-300">
              Peri Peri
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="rounded-full px-4 py-2 text-[15px] font-extrabold text-white transition duration-300 hover:bg-yellow-400 hover:text-black"
            >
              {link.name}
            </a>
          ))}

          <button
            type="button"
            onClick={openTrackingProtected}
            className="rounded-full px-4 py-2 text-[15px] font-extrabold text-white transition duration-300 hover:bg-yellow-400 hover:text-black"
          >
            Tracking
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative ml-3 rounded-full bg-yellow-400 p-3 text-black shadow-lg transition hover:scale-110 hover:bg-white"
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-black px-2 text-xs font-black text-white">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <button
              onClick={logoutUser}
              className="rounded-full bg-white px-4 py-3 text-sm font-black text-red-700 shadow-lg transition hover:scale-110 hover:bg-yellow-300"
            >
              {user.name} / Logout
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="rounded-full bg-white p-3 text-red-700 shadow-lg transition hover:scale-110 hover:bg-yellow-300"
            >
              <FaUser />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative rounded-full bg-yellow-400 p-3 text-black shadow-lg"
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-black px-2 text-xs font-black text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-2xl text-white transition duration-300 hover:text-yellow-300"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-slideDown bg-black/95 px-5 pb-5 pt-3 lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setOpen(false)}
                className="py-2 text-left text-base font-extrabold text-white transition duration-300 hover:translate-x-2 hover:text-yellow-300"
              >
                {link.name}
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                openTrackingProtected();
                setOpen(false);
              }}
              className="py-2 text-left text-base font-extrabold text-white transition duration-300 hover:translate-x-2 hover:text-yellow-300"
            >
              Tracking
            </button>
          </div>

          {user ? (
            <button
              onClick={() => {
                logoutUser();
                setOpen(false);
              }}
              className="mt-4 flex items-center gap-2 text-base font-extrabold text-white transition duration-300 hover:text-yellow-300"
            >
              <FaUser /> Logout
            </button>
          ) : (
            <button
              onClick={() => {
                openLogin();
                setOpen(false);
              }}
              className="mt-4 flex items-center gap-2 text-base font-extrabold text-white transition duration-300 hover:text-yellow-300"
            >
              <FaUser /> Login / Signup
            </button>
          )}
        </div>
      )}
    </nav>
  );
}