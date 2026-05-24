import {
  FaClock,
  FaCheckCircle,
  FaUtensils,
  FaTruck,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

export default function TrackingSection() {
  const { trackingOrder } = useCart();

  const steps = [
    {
      name: "Order Confirmed",
      icon: <FaCheckCircle />,
    },

    {
      name: "Preparing Your Food",
      icon: <FaUtensils />,
    },

    {
      name: "Out for Delivery",
      icon: <FaTruck />,
    },

    {
      name: "Delivered",
      icon: <FaClock />,
    },
  ];

  const activeIndex = trackingOrder
    ? steps.findIndex((s) => s.name === trackingOrder.status)
    : -1;

  return (
    <section
      id="tracking"
      className="relative overflow-hidden bg-red-950 px-6 py-20 text-white"
    >
      <div className="absolute left-0 top-0 h-44 w-44 rounded-full bg-yellow-400/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
            Track Your Order
          </p>

          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            Stay Updated With Your Delivery
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Stay updated with your food delivery status in real time.
          </p>
        </div>

        {!trackingOrder ? (
          <div className="mx-auto mt-12 max-w-4xl rounded-[35px] bg-black/70 p-8 shadow-2xl backdrop-blur-md">
            <div className="grid gap-5 md:grid-cols-4">
              {steps.map((step) => (
                <div
                  key={step.name}
                  className="hover-card rounded-[28px] bg-white/10 p-6 text-center transition duration-500 hover:-translate-y-2"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl text-black shadow-2xl">
                    {step.icon}
                  </div>

                  <h3 className="mt-4 text-lg font-black">
                    {step.name}
                  </h3>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[30px] bg-white p-8 text-center text-black shadow-2xl">
              <h3 className="text-3xl font-black text-red-700">
                No Active Orders
              </h3>

              <p className="mt-4 text-lg font-semibold text-gray-600">
                Looks like you haven’t placed any orders yet.
              </p>

              <p className="mt-2 text-base leading-7 text-gray-500">
                Start ordering from our menu and track your food journey here.
              </p>

              <a
                href="#menu"
                className="premium-btn mt-6 inline-block rounded-full bg-red-700 px-8 py-4 font-black text-white hover:bg-black"
              >
                Explore Menu
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[35px] bg-black/70 p-6 shadow-2xl backdrop-blur-md">
              <p className="text-sm font-black uppercase tracking-[3px] text-yellow-300">
                Order Number
              </p>

              <h3 className="mt-2 text-4xl font-black">
                {trackingOrder.orderNumber}
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-gray-400">
                    Customer
                  </p>

                  <h4 className="font-black">
                    {trackingOrder.customer.fullName}
                  </h4>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-gray-400">
                    Phone
                  </p>

                  <h4 className="font-black">
                    {trackingOrder.customer.phone}
                  </h4>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-gray-400">
                    Address
                  </p>

                  <h4 className="font-black">
                    {trackingOrder.customer.address},{" "}
                    {trackingOrder.customer.postcode}
                  </h4>
                </div>

                <div className="rounded-2xl bg-yellow-400 p-4 text-black">
                  <p className="text-sm font-black">
                    Grand Total
                  </p>

                  <h4 className="text-3xl font-black">
                    £{trackingOrder.total}
                  </h4>
                </div>
              </div>
            </div>

            <div className="rounded-[35px] bg-white p-6 text-black shadow-2xl">
              <h3 className="text-3xl font-black text-red-700">
                Current Status
              </h3>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {steps.map((step, index) => {
                  const active = index <= activeIndex;

                  return (
                    <div
                      key={step.name}
                      className={`rounded-[28px] p-5 text-center shadow-xl transition ${
                        active
                          ? "bg-red-700 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <div
                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
                          active
                            ? "bg-yellow-400 text-black"
                            : "bg-white text-gray-400"
                        }`}
                      >
                        {step.icon}
                      </div>

                      <h4 className="mt-3 font-black">
                        {step.name}
                      </h4>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[28px] bg-gray-100 p-5">
                <h4 className="text-xl font-black">
                  Ordered Items
                </h4>

                <div className="mt-4 space-y-3">
                  {trackingOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-2xl bg-white p-3 shadow"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />

                        <div>
                          <h5 className="font-black">
                            {item.name}
                          </h5>

                          <p className="text-sm font-bold text-gray-500">
                            Qty: {item.qty}
                          </p>
                        </div>
                      </div>

                      <p className="font-black text-red-700">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-sm font-bold text-gray-500">
                Ordered at: {trackingOrder.createdAt}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}