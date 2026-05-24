import {
  FaMinus,
  FaPlus,
  FaTimes,
  FaTrash,
  FaShoppingBag,
  FaReceipt,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const {
    cartOpen,
    setCartOpen,
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    total,
    openCartCheckout,
  } = useCart();

  return (
    <>
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm"
        ></div>
      )}

      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-full flex-col bg-white shadow-2xl transition duration-500 sm:max-w-md ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="shrink-0 bg-gradient-to-r from-black via-red-950 to-red-700 p-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[3px] text-yellow-300">
                TOPS CHICKEN Peri Peri
              </p>

              <h2 className="mt-1 text-3xl font-black">Your Cart</h2>
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="rounded-full bg-white/10 p-3 text-xl text-white hover:bg-white hover:text-black"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-5">
          {cartItems.length === 0 ? (
            <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-4xl text-red-700">
                <FaShoppingBag />
              </div>

              <h3 className="mt-5 text-2xl font-black text-black">
                Cart is Empty
              </h3>

              <p className="mt-2 max-w-xs font-semibold leading-7 text-gray-500">
                Add your favourite meals from the menu.
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {cartItems.map((item) => {
                const itemPrice = Number(
                  String(item.price || "0").replace("£", "")
                );

                const qty = Number(item.qty || 1);
                const itemTotal = itemPrice * qty;

                return (
                  <div
                    key={item.id}
                    className="rounded-[26px] bg-white p-3 shadow-lg ring-1 ring-black/5 sm:p-4"
                  >
                    <div className="flex gap-3 sm:gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 shrink-0 rounded-2xl object-cover shadow-md sm:h-28 sm:w-28"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="line-clamp-2 text-base font-black leading-tight text-black sm:text-lg">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-sm font-black text-red-700">
                              {item.price}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="shrink-0 rounded-full bg-red-100 p-3 text-red-700 hover:bg-red-700 hover:text-white"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-2 shadow-sm">
                            <button
                              type="button"
                              onClick={() => decreaseQty(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
                            >
                              <FaMinus />
                            </button>

                            <span className="min-w-[26px] text-center font-black text-black">
                              {qty}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQty(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-700 text-white"
                            >
                              <FaPlus />
                            </button>
                          </div>

                          <h4 className="text-xl font-black text-red-700 sm:text-2xl">
                            £{itemTotal.toFixed(2)}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between rounded-3xl bg-gray-100 p-4">
            <span className="text-lg font-black text-black">Total</span>

            <span className="text-3xl font-black text-red-700">
              £{Number(total || 0).toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={openCartCheckout}
            className="premium-btn flex w-full items-center justify-center gap-2 rounded-full bg-red-700 px-6 py-4 font-black text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <FaReceipt />
            Checkout Now
          </button>
        </div>
      </aside>
    </>
  );
}