import {
  FaShoppingCart,
  FaEye,
  FaStar,
  FaFire,
  FaBolt,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

const defaultMenu = [
  {
    id: "tower-burger",
    name: "Tower Burger Meal",
    category: "Burgers",
    price: "£6.99",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    desc: "Tower burger with crispy chicken, fries and drink.",
  },
  {
    id: "chicken-burger",
    name: "Chicken Burger Meal",
    category: "Burgers",
    price: "£5.99",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    desc: "Fresh chicken burger meal with fries and drink.",
  },
  {
    id: "spicy-wings",
    name: "Spicy Wings Meal",
    category: "Wings",
    price: "£7.29",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1200&auto=format&fit=crop",
    desc: "Hot spicy wings served with fries and dip.",
  },
  {
    id: "bbq-wings",
    name: "BBQ Wings Meal",
    category: "Wings",
    price: "£7.49",
    image:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=1200&auto=format&fit=crop",
    desc: "BBQ wings meal with fries and cold drink.",
  },
  {
    id: "half-peri",
    name: "Half Peri Peri Chicken",
    category: "Peri Chicken",
    price: "£8.49",
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1200&auto=format&fit=crop",
    desc: "Grilled half chicken with peri peri flavour.",
  },
  {
    id: "whole-peri",
    name: "Whole Peri Peri Chicken",
    category: "Peri Chicken",
    price: "£13.99",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop",
    desc: "Full grilled peri peri chicken for sharing.",
  },
  {
    id: "family-box",
    name: "Family Wings Box",
    category: "Deals",
    price: "£14.99",
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200&auto=format&fit=crop",
    desc: "Family wings deal with fries and drinks.",
  },
  {
    id: "burger-box",
    name: "Burger Box",
    category: "Deals",
    price: "£11.99",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    desc: "Chicken burger, wings, fries and drink.",
  },
  {
    id: "wrap-meal",
    name: "Chicken Wrap Meal",
    category: "Wraps",
    price: "£6.49",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1200&auto=format&fit=crop",
    desc: "Fresh peri peri chicken wrap meal.",
  },
];

export default function MenuSection() {
  const cart = useCart();

  const {
    addToCart,
    openView,
    openOrder,
    openOrderModal,
    openCheckout,
    openOrderCheckout,
  } = cart;

  const handleOrder = (item) => {
    if (typeof openOrder === "function") {
      openOrder(item);
      return;
    }

    if (typeof openOrderModal === "function") {
      openOrderModal(item);
      return;
    }

    if (typeof openCheckout === "function") {
      openCheckout(item);
      return;
    }

    if (typeof openOrderCheckout === "function") {
      openOrderCheckout(item);
      return;
    }

    addToCart(item);
    alert("Item added to cart. Please open cart to checkout.");
  };

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-gradient-to-b from-black via-red-950 to-black px-4 py-20 text-white sm:px-6 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[5px] text-yellow-300 sm:text-sm">
            Premium Fresh Menu
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            TOPS CHICKEN Menu
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold leading-7 text-gray-300 sm:text-base">
            Premium peri peri meals, burgers, wraps, wings and family deals.
            Fresh halal food made daily.
          </p>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {defaultMenu.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-[34px] bg-white text-black shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition duration-500 hover:-translate-y-3"
            >
              <div className="relative h-[240px] overflow-hidden sm:h-[280px] md:h-[310px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <span className="absolute left-3 top-3 rounded-full bg-yellow-400 px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-black shadow-xl sm:text-xs">
                  {item.category}
                </span>

                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/80 px-4 py-2 text-[10px] font-black text-white backdrop-blur-md sm:text-xs">
                  <FaStar className="text-yellow-300" />
                  4.9
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="min-h-[60px] text-sm font-semibold leading-7 text-gray-600">
                  {item.desc}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-xs font-black uppercase tracking-[2px] text-red-700">
                    <FaFire />
                    Fresh Halal
                  </span>

                  <span className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-xs font-black uppercase tracking-[2px] text-yellow-700">
                    <FaBolt />
                    Fast Delivery
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-black uppercase tracking-[3px] text-gray-500">
                    Price
                  </p>

                  <h4 className="mt-1 text-4xl font-black text-red-700">
                    {item.price}
                  </h4>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => openView(item)}
                    className="rounded-full bg-gray-100 px-3 py-3 text-xs font-black text-black transition hover:bg-black hover:text-white sm:text-sm"
                  >
                    <FaEye className="mb-1 inline" />
                    <br />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="rounded-full bg-black px-3 py-3 text-xs font-black text-white transition hover:bg-red-700 sm:text-sm"
                  >
                    <FaShoppingCart className="mb-1 inline" />
                    <br />
                    Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOrder(item)}
                    className="rounded-full bg-yellow-400 px-3 py-3 text-xs font-black text-black transition hover:bg-red-700 hover:text-white sm:text-sm"
                  >
                    <FaBolt className="mb-1 inline" />
                    <br />
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm font-bold tracking-[2px] text-gray-400">
            Fresh • Halal • Fast Delivery • Premium UK Restaurant
          </p>
        </div>
      </div>
    </section>
  );
}