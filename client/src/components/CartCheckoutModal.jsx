import { useEffect, useState } from "react";
import {
  FaTimes,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTruck,
  FaStore,
  FaEnvelope,
  FaHome,
  FaStickyNote,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import PaymentMethod from "./PaymentMethod";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function CartCheckoutModal() {
  const {
    cartCheckoutOpen,
    closeCartCheckout,
    cartItems,
    clearCart,
    bookOrder,
    successOpen,
    setSuccessOpen,
  } = useCart();

  const { user, openSignup } = useAuth();

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

    if (params.get("payment") === "cart-success") {
      const savedOrder = localStorage.getItem("topsChickenPendingCartOrder");

      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);

        bookOrder({
          ...parsedOrder,
          paymentStatus: "Paid",
        });

        localStorage.removeItem("topsChickenPendingCartOrder");
        clearCart();
        closeCartCheckout();
        setSuccessOpen(true);
      }

      window.history.replaceState({}, "", window.location.pathname);
    }

    if (params.get("payment") === "cart-cancel") {
      alert("Payment was cancelled. Please try again.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [bookOrder, clearCart, closeCartCheckout, setSuccessOpen]);

  if (!cartCheckoutOpen && !successOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    const price = Number(String(item.price || "0").replace("£", ""));
    const qty = Number(item.qty || 1);
    return sum + price * qty;
  }, 0);

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

  const placeCartOrder = async () => {
    if (!user) {
      openSignup();
      return;
    }

    if (!validateForm()) return;

    try {
      const orderData = {
        customer: form,
        items: cartItems,
        total: total.toFixed(2),
        paymentStatus: "Paid",
      };

      localStorage.setItem(
        "topsChickenPendingCartOrder",
        JSON.stringify(orderData)
      );

      const res = await fetch(`${API}/api/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total.toFixed(2),
          name: "TOPS CHICKEN Cart Order",
          customer: form,
          items: cartItems,
          successType: "cart",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Stripe payment failed");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.log("Cart payment error:", error);
      alert("Payment server error");
    }
  };

  return (
    <>
      {cartCheckoutOpen && (
        <>
          <div
            onClick={closeCartCheckout}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
          ></div>

          <div className="fixed inset-0 z-[100] flex items-center justify-center px-3 py-5">
            <div className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[36px] bg-white shadow-2xl">
              <button
                type="button"
                onClick={closeCartCheckout}
                className="absolute right-4 top-4 z-20 rounded-full bg-black p-3 text-white shadow-xl"
              >
                <FaTimes />
              </button>

              <div className="grid bg-[#f7f7f7] lg:grid-cols-[0.85fr_1.15fr]">
                <div className="bg-gradient-to-b from-black to-red-950 p-5 text-white sm:p-8 lg:rounded-l-[36px]">
                  <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
                    Cart Checkout
                  </p>

                  <h2 className="mt-3 text-4xl font-black">Order Summary</h2>

                  <div className="mt-7 space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="rounded-3xl bg-white p-6 text-center text-black">
                        <h3 className="text-2xl font-black">Cart is empty</h3>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 rounded-3xl bg-white p-4 text-black shadow-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-24 w-24 rounded-2xl object-cover"
                          />

                          <div className="flex-1">
                            <h3 className="text-lg font-black">{item.name}</h3>

                            <p className="text-sm font-bold text-gray-600">
                              Qty: {item.qty || 1}
                            </p>

                            <p className="mt-2 text-2xl font-black text-red-700">
                              {item.price}
                            </p>
                          </div>
                        </div>
                      ))
                    )}

                    <div className="rounded-3xl bg-yellow-400 p-5 text-black">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black">Grand Total</h3>

                        <h2 className="text-4xl font-black">
                          £{total.toFixed(2)}
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="rounded-2xl bg-white/10 p-4">
                        <FaTruck className="mx-auto text-yellow-400" />
                        <p className="mt-1 font-black">Delivery</p>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-4">
                        <FaStore className="mx-auto text-yellow-400" />
                        <p className="mt-1 font-black">Collection</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="rounded-[30px] bg-white p-5 shadow-2xl sm:p-7">
                    <div className="mb-6">
                      <p className="text-sm font-black uppercase tracking-[3px] text-red-700">
                        Customer Details
                      </p>

                      <h2 className="text-3xl font-black text-black">
                        Complete Your Cart Order
                      </h2>
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
                            placeholder="Extra sauce, no mayo, call on arrival"
                            rows="3"
                            className="w-full resize-none bg-transparent font-bold outline-none"
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={placeCartOrder}
                        disabled={cartItems.length === 0}
                        className="premium-btn mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-red-700 px-6 py-4 text-lg font-black text-white hover:bg-black disabled:bg-gray-400"
                      >
                        <FaCheckCircle />
                        Book Order & Pay
                      </button>
                    </form>
                  </div>
                </div>
              </div>
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
              Thank you for ordering from TOPS CHICKEN. Your cart order has
              been received successfully after secure payment.
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