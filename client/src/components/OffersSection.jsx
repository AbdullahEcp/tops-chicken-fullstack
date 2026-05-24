import { FaBolt, FaEye, FaFire, FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function OffersSection() {
  const { addToCart, openOrder, openView } = useCart();

  const offers = [
    {
      id: 101,
      title: "Tower Box",
      name: "Tower Box",
      price: "£8.29",
      desc: "Tower burger, 1 pc chicken or 3 wings, fries & drink.",
      image:
        "https://images.unsplash.com/photo-1610614819513-58e34989848b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 102,
      title: "Burger Box",
      name: "Burger Box",
      price: "£7.79",
      desc: "Chicken burger, 1 pc chicken or 3 wings, fries & drink.",
      image:
        "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 103,
      title: "Mighty Box for 2",
      name: "Mighty Box for 2",
      price: "£14.99",
      desc: "2 chicken burgers, 2 pc chicken or 6 wings, fries & 2 drinks.",
      image:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section id="offers" className="relative overflow-hidden bg-red-950 px-5 py-20 text-white">
      <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-yellow-400/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-red-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
            TOPS Deals
          </p>

          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            Special Offers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Premium box meals with burger, chicken, fries and drink.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="hover-card group overflow-hidden rounded-[34px] bg-white text-black shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black shadow-xl">
                  <FaFire className="text-red-700" />
                  Special Deal
                </div>

                <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-black/80 px-4 py-2 text-sm font-black text-white">
                  <FaStar className="text-yellow-300" />
                  4.9
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-3xl font-black text-white">
                    {offer.title}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-gray-200">
                    Fresh box meal offer
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="min-h-[58px] text-sm font-semibold leading-7 text-gray-600">
                  {offer.desc}
                </p>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-red-50 p-4">
                  <span className="text-sm font-black uppercase text-gray-500">
                    Deal Price
                  </span>

                  <span className="text-3xl font-black text-red-700">
                    {offer.price}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => openView(offer)}
                    className="premium-btn flex items-center justify-center gap-1 rounded-full bg-gray-100 px-2 py-3 text-xs font-black text-black hover:bg-black hover:text-white"
                  >
                    <FaEye />
                    View
                  </button>

                  <button
                    onClick={() => addToCart(offer)}
                    className="premium-btn flex items-center justify-center gap-1 rounded-full bg-black px-2 py-3 text-xs font-black text-white hover:bg-red-700"
                  >
                    <FaShoppingCart />
                    Cart
                  </button>

                  <button
                    onClick={() => openOrder(offer)}
                    className="premium-btn flex items-center justify-center gap-1 rounded-full bg-yellow-400 px-2 py-3 text-xs font-black text-black hover:bg-red-700 hover:text-white"
                  >
                    <FaBolt />
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}