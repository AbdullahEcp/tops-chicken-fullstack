import { useEffect, useState } from "react";
import {
  FaTimes,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaStar,
  FaTruck,
  FaCheckCircle,
  FaUtensils,
  FaArrowRight,
  FaReceipt,
  FaClock,
  FaStore,
  FaEnvelope,
  FaHome,
  FaStickyNote,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import PaymentMethod from "./PaymentMethod";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function OrderModal() {
  const {
    orderOpen,
    selectedItem,
    closeOrder,
    modalMode,
    addToCart,
    openCheckout,
    successOpen,
    setSuccessOpen,
    bookOrder,
  } = useCart();

  const { user, openSignup } = useAuth();

  const [qty, setQty] = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    orderType: "Delivery",
    payment: "Card Payment",
    note: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("payment") === "success") {
      const savedOrder = localStorage.getItem("topsChickenPendingOrder");

      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);

        bookOrder({
          ...parsedOrder,
          paymentStatus: "Paid",
        });

        localStorage.removeItem("topsChickenPendingOrder");
        setSuccessOpen(true);
        closeOrder();
      }

      window.history.replaceState({}, "", window.location.pathname);
    }

    if (params.get("payment") === "cancel") {
      alert("Payment was cancelled. Please try again.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [bookOrder, setSuccessOpen, closeOrder]);

  if (!orderOpen && !successOpen) return null;

  const priceNumber = selectedItem
    ? Number(String(selectedItem.price || "0").replace("£", ""))
    : 0;

  const total = priceNumber * Number(qty || 1);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Delivery address is required";
    if (!form.postcode.trim()) newErrors.postcode = "Postcode is required";
    if (!form.payment.trim()) newErrors.payment = "Payment method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSelectedToCart = () => {
    if (selectedItem) addToCart(selectedItem, qty);
  };

  const goCheckout = () => {
    if (!user) {
      openSignup();
      return;
    }

    addSelectedToCart();
    openCheckout();
  };

  const placeOrder = async () => {
    if (!user) {
      openSignup();
      return;
    }

    if (!validateForm()) return;

    try {
      const orderData = {
        customer: form,
        items: [{ ...selectedItem, qty }],
        total: total.toFixed(2),
        paymentStatus: "Paid",
      };

      localStorage.setItem("topsChickenPendingOrder", JSON.stringify(orderData));

      const res = await fetch(`${API}/api/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total.toFixed(2),
          name: selectedItem.name,
          customer: form,
          items: [{ ...selectedItem, qty }],
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Stripe payment failed");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.log("Payment error:", error);
      alert("Payment server error");
    }
  };

  return (
    <>
      {orderOpen && selectedItem && (
        <>
          <div
            onClick={closeOrder}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
          ></div>

          <div className="fixed inset-0 z-[100] flex items-center justify-center px-3 py-5">
            <div className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[36px] bg-white shadow-2xl">
              <button
                type="button"
                onClick={closeOrder}
                className="absolute right-4 top-4 z-20 rounded-full bg-black p-3 text-white shadow-xl"
              >
                <FaTimes />
              </button>

              {modalMode === "detail" ? (
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative min-h-[360px] overflow-hidden rounded-t-[36px] lg:rounded-l-[36px] lg:rounded-tr-none">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="h-full min-h-[360px] w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-black text-black shadow-xl">
                        TOPS CHICKEN
                      </span>

                      <span className="rounded-full bg-red-700 px-4 py-2 text-xs font-black text-white shadow-xl">
                        Fresh Halal
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-sm font-black backdrop-blur">
                        <FaStar className="text-yellow-300" /> 4.9
                      </span>

                      <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
                        {selectedItem.name}
                      </h2>

                      <p className="mt-3 max-w-xl text-base font-semibold leading-7 text-gray-200">
                        {selectedItem.desc ||
                          "Fresh halal meal prepared with premium TOPS CHICKEN taste."}
                      </p>

                      <h3 className="mt-5 text-5xl font-black text-yellow-300">
                        {selectedItem.price}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-8">
                    <p className="text-sm font-black uppercase tracking-[4px] text-red-700">
                      Meal Details
                    </p>

                    <h2 className="mt-3 text-3xl font-black text-black">
                      Choose Your Meal
                    </h2>

                    <div className="mt-6 rounded-3xl bg-red-50 p-5">
                      <div className="flex items-center gap-3">
                        <FaUtensils className="text-2xl text-red-700" />
                        <h3 className="text-lg font-black text-black">
                          Included
                        </h3>
                      </div>

                      <p className="mt-2 font-semibold leading-7 text-gray-600">
                        {selectedItem.desc ||
                          "Fresh halal meal with TOPS CHICKEN premium flavour."}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-3xl bg-black p-4 text-white">
                      <div>
                        <p className="text-sm font-bold text-gray-300">
                          Quantity
                        </p>

                        <h3 className="text-2xl font-black text-yellow-300">
                          £{total.toFixed(2)}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 rounded-full bg-white px-4 py-3 text-black">
                        <button
                          type="button"
                          onClick={() => setQty(Math.max(1, qty - 1))}
                        >
                          <FaMinus />
                        </button>

                        <span className="text-xl font-black">{qty}</span>

                        <button type="button" onClick={() => setQty(qty + 1)}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={addSelectedToCart}
                        className="premium-btn flex items-center justify-center gap-2 rounded-full bg-black px-6 py-4 font-black text-white hover:bg-red-700"
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>

                      <button
                        type="button"
                        onClick={goCheckout}
                        className="premium-btn flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-6 py-4 font-black text-black hover:bg-red-700 hover:text-white"
                      >
                        Checkout
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid bg-[#f7f7f7] lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="bg-gradient-to-b from-black to-red-950 p-5 text-white sm:p-8 lg:rounded-l-[36px]">
                    <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
                      Checkout
                    </p>

                    <h2 className="mt-3 text-4xl font-black">
                      Order Summary
                    </h2>

                    <div className="mt-7 overflow-hidden rounded-[30px] bg-white text-black shadow-2xl">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="h-60 w-full object-cover"
                      />

                      <div className="p-5">
                        <h3 className="text-2xl font-black">
                          {selectedItem.name}
                        </h3>

                        <p className="mt-2 font-semibold text-gray-600">
                          {selectedItem.desc ||
                            "Fresh halal meal with premium restaurant taste."}
                        </p>

                        <div className="mt-5 space-y-3 rounded-2xl bg-gray-100 p-4">
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-600">
                              Price
                            </span>

                            <span className="font-black">
                              {selectedItem.price}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-bold text-gray-600">
                              Quantity
                            </span>

                            <span className="font-black">{qty}</span>
                          </div>

                          <div className="flex justify-between border-t pt-3">
                            <span className="text-lg font-black">Total</span>

                            <span className="text-3xl font-black text-red-700">
                              £{total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                          <div className="rounded-2xl bg-red-50 p-3">
                            <FaClock className="mx-auto text-red-700" />
                            <p className="mt-1 text-xs font-black">Fast</p>
                          </div>

                          <div className="rounded-2xl bg-yellow-50 p-3">
                            <FaTruck className="mx-auto text-yellow-600" />
                            <p className="mt-1 text-xs font-black">Delivery</p>
                          </div>

                          <div className="rounded-2xl bg-green-50 p-3">
                            <FaStore className="mx-auto text-green-600" />
                            <p className="mt-1 text-xs font-black">
                              Collection
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-8">
                    <div className="rounded-[30px] bg-white p-5 shadow-2xl sm:p-7">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-2xl text-white">
                          <FaReceipt />
                        </div>

                        <div>
                          <p className="text-sm font-black uppercase tracking-[3px] text-red-700">
                            Customer Details
                          </p>

                          <h2 className="text-3xl font-black text-black">
                            Complete Your Order
                          </h2>
                        </div>
                      </div>

                      <form className="grid gap-4">
                        <InputBox
                          label="Full Name"
                          name="fullName"
                          icon={<FaUser />}
                          placeholder="Enter your full name"
                          value={form.fullName}
                          onChange={handleChange}
                          error={errors.fullName}
                        />

                        <InputBox
                          label="Phone Number"
                          name="phone"
                          icon={<FaPhone />}
                          placeholder="Enter phone number"
                          value={form.phone}
                          onChange={handleChange}
                          error={errors.phone}
                        />

                        <InputBox
                          label="Email Address Optional"
                          name="email"
                          icon={<FaEnvelope />}
                          placeholder="Enter email address"
                          value={form.email}
                          onChange={handleChange}
                        />

                        <InputBox
                          label="Delivery Address"
                          name="address"
                          icon={<FaMapMarkerAlt />}
                          placeholder="House no, street, area"
                          value={form.address}
                          onChange={handleChange}
                          error={errors.address}
                        />

                        <InputBox
                          label="Postcode"
                          name="postcode"
                          icon={<FaHome />}
                          placeholder="Example: W9 2DZ"
                          value={form.postcode}
                          onChange={handleChange}
                          error={errors.postcode}
                        />

                        <div>
                          <label className="mb-2 block text-sm font-black text-gray-700">
                            Order Type
                          </label>

                          <div className="grid grid-cols-2 gap-3">
                            {["Delivery", "Collection"].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() =>
                                  setForm({
                                    ...form,
                                    orderType: type,
                                  })
                                }
                                className={`rounded-2xl border-2 p-4 font-black transition ${
                                  form.orderType === type
                                    ? "border-red-700 bg-red-700 text-white"
                                    : "border-gray-100 bg-gray-50 text-black"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        <PaymentMethod
                          value={form.payment}
                          onChange={handleChange}
                        />

                        {errors.payment && (
                          <p className="text-sm font-bold text-red-600">
                            {errors.payment}
                          </p>
                        )}

                        <div>
                          <label className="mb-2 block text-sm font-black text-gray-700">
                            Order Note Optional
                          </label>

                          <div className="flex items-start gap-3 rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 text-black focus-within:border-red-600">
                            <FaStickyNote className="mt-1 text-red-700" />

                            <textarea
                              name="note"
                              value={form.note}
                              onChange={handleChange}
                              placeholder="Example: extra sauce, no mayo, call on arrival"
                              rows="3"
                              className="w-full resize-none bg-transparent font-bold outline-none"
                            ></textarea>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={placeOrder}
                          className="premium-btn mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-red-700 px-6 py-4 text-lg font-black text-white hover:bg-black"
                        >
                          <FaCheckCircle />
                          Book Order & Pay
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {successOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-md overflow-hidden rounded-[36px] bg-white p-8 text-center shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-red-700 via-yellow-400 to-red-700"></div>

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl text-green-600 shadow-xl">
              <FaCheckCircle />
            </div>

            <h2 className="mt-6 text-3xl font-black text-black">
              Order Booked!
            </h2>

            <p className="mt-3 font-semibold leading-7 text-gray-600">
              Thank you for ordering from TOPS CHICKEN. Your order has been
              received successfully after secure payment.
            </p>

            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              className="premium-btn mt-6 w-full rounded-full bg-red-700 px-6 py-4 font-black text-white hover:bg-black"
            >
              Done
            </button>
          </div>
        </div>
      )}
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
        className={`flex items-center gap-3 rounded-2xl border-2 bg-gray-50 p-4 text-black transition focus-within:border-red-600 ${
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