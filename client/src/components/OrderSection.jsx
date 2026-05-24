import { FaCreditCard, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function OrderSection() {
  const { cartItems, total } = useCart();

  return (
    <section id="order" className="bg-black px-5 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-black uppercase tracking-[4px] text-red-500">
            Fast Checkout
          </p>

          <h2 className="mt-3 text-4xl font-black text-yellow-300 md:text-5xl">
            Order Online
          </h2>

          <p className="mt-4 max-w-xl text-gray-300">
            Fill your details and confirm your order. In backend phase, this
            order will save in MongoDB.
          </p>

          <form className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 text-black">
              <FaUser className="text-red-700" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent font-bold outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 text-black">
              <FaPhone className="text-red-700" />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-transparent font-bold outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 text-black">
              <FaMapMarkerAlt className="text-red-700" />
              <input
                type="text"
                placeholder="Delivery Address"
                className="w-full bg-transparent font-bold outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 text-black">
              <FaCreditCard className="text-red-700" />
              <select className="w-full bg-transparent font-bold outline-none">
                <option>Cash on Delivery</option>
                <option>Card Payment</option>
                <option>Collection</option>
              </select>
            </div>

            <button
              type="button"
              className="premium-btn w-full rounded-full bg-yellow-400 px-6 py-4 font-black text-black hover:bg-white"
            >
              Place Order
            </button>
          </form>
        </div>

        <div className="rounded-3xl bg-red-950 p-6 shadow-2xl">
          <h3 className="text-2xl font-black text-yellow-300">
            Order Summary
          </h3>

          <div className="mt-6 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-300">No items selected yet.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl bg-black p-4"
                >
                  <div>
                    <h4 className="font-black">{item.name}</h4>
                    <p className="text-sm text-gray-400">Qty: {item.qty}</p>
                  </div>

                  <p className="font-black text-yellow-300">{item.price}</p>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-5">
            <span className="text-xl font-black">Total</span>
            <span className="text-3xl font-black text-yellow-300">
              £{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}