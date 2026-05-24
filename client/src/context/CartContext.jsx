import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export function CartProvider({ children }) {
  const { user } = useAuth();

  const userKey = user?.email || "guest";

  const cartStorageKey = useMemo(
    () => `tops_cart_${userKey}`,
    [userKey]
  );

  const trackingStorageKey = useMemo(
    () => `tops_tracking_${userKey}`,
    [userKey]
  );

  const [cartOpen, setCartOpen] = useState(false);

  const [cartCheckoutOpen, setCartCheckoutOpen] =
    useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [orderOpen, setOrderOpen] = useState(false);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [modalMode, setModalMode] =
    useState("detail");

  const [successOpen, setSuccessOpen] =
    useState(false);

  const [trackingOrder, setTrackingOrder] =
    useState(null);

  const [trackingOpen, setTrackingOpen] =
    useState(false);

  const [myOrders, setMyOrders] = useState([]);

  /* LOAD SAVED DATA */
  useEffect(() => {
    const savedCart =
      JSON.parse(
        localStorage.getItem(cartStorageKey)
      ) || [];

    const savedTracking =
      JSON.parse(
        localStorage.getItem(
          trackingStorageKey
        )
      ) || null;

    setCartItems(savedCart);

    if (savedTracking) {
      setTrackingOrder(savedTracking);
    }
  }, [cartStorageKey, trackingStorageKey]);

  /* SAVE CART */
  useEffect(() => {
    localStorage.setItem(
      cartStorageKey,
      JSON.stringify(cartItems)
    );
  }, [cartItems, cartStorageKey]);

  /* SAVE TRACKING */
  useEffect(() => {
    if (trackingOrder) {
      localStorage.setItem(
        trackingStorageKey,
        JSON.stringify(trackingOrder)
      );
    }
  }, [trackingOrder, trackingStorageKey]);

  /* TOKEN */
  const getToken = () => {
    const saved =
      localStorage.getItem(
        "topsChickenUser"
      ) ||
      localStorage.getItem("user") ||
      localStorage.getItem(
        "authUser"
      );

    if (saved) {
      try {
        const parsed =
          JSON.parse(saved);

        return (
          parsed.token ||
          parsed?.user?.token ||
          ""
        );
      } catch {
        return (
          localStorage.getItem(
            "token"
          ) || ""
        );
      }
    }

    return (
      localStorage.getItem("token") ||
      ""
    );
  };

  /* ADD TO CART */
  const addToCart = (
    item,
    qty = 1
  ) => {
    setCartItems((prev) => {
      const exist = prev.find(
        (p) => p.id === item.id
      );

      if (exist) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                qty:
                  Number(
                    p.qty || 1
                  ) +
                  Number(qty || 1),
              }
            : p
        );
      }

      return [
        ...prev,
        {
          ...item,
          qty: Number(qty || 1),
        },
      ];
    });
  };

  /* BOOK ORDER */
  const bookOrder = async (
    orderData
  ) => {
    try {
      const customerEmail =
        user?.email ||
        orderData.customer?.email ||
        "guest@gmail.com";

      const res = await fetch(
        `${API}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            customerEmail,

            customer: {
              ...orderData.customer,
              email:
                customerEmail,
            },

            items:
              orderData.items,

            total: Number(
              orderData.total ||
                0
            ),

            paymentMethod:
              orderData.customer
                ?.payment ||
              "Card Payment",

            paymentStatus:
              orderData.paymentStatus ||
              "Paid",
          }),
        }
      );

      const data =
        await res.json();

      if (!data.success) {
        console.log(
          data.message
        );
        return null;
      }

      const savedOrder = {
        ...data.order,

        status:
          data.order.status ||
          "Order Confirmed",

        createdAt:
          new Date(
            data.order.createdAt
          ).toLocaleString(),
      };

      setTrackingOrder(
        savedOrder
      );

      localStorage.setItem(
        trackingStorageKey,
        JSON.stringify(
          savedOrder
        )
      );

      setMyOrders((prev) => [
        savedOrder,
        ...prev,
      ]);

      setSuccessOpen(true);

      setTimeout(() => {
        setSuccessOpen(false);
      }, 3500);

      return savedOrder;
    } catch (error) {
      console.log(
        "Order Save Error:",
        error
      );

      return null;
    }
  };

  /* LIVE LOAD ORDERS */
  const loadMyOrders =
    async () => {
      try {
        const token =
          getToken();

        if (!token) return;

        const res =
          await fetch(
            `${API}/api/orders/my-orders`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const data =
          await res.json();

        if (data.success) {
          const updatedOrders =
            data.orders || [];

          setMyOrders(
            updatedOrders
          );

          if (
            updatedOrders.length >
            0
          ) {
            let latestOrder =
              updatedOrders[0];

            /* FIND CURRENT TRACKING ORDER */
            if (
              trackingOrder
            ) {
              const matched =
                updatedOrders.find(
                  (order) =>
                    order._id ===
                      trackingOrder._id ||
                    order.orderNumber ===
                      trackingOrder.orderNumber
                );

              if (matched) {
                latestOrder =
                  matched;
              }
            }

            setTrackingOrder(
              latestOrder
            );

            localStorage.setItem(
              trackingStorageKey,
              JSON.stringify(
                latestOrder
              )
            );
          }
        }
      } catch (error) {
        console.log(
          "Load tracking error:",
          error
        );
      }
    };

  /* INITIAL LOAD */
  useEffect(() => {
    loadMyOrders();
  }, [user]);

  /* AUTO REFRESH TRACKING */
  useEffect(() => {
    const interval =
      setInterval(() => {
        loadMyOrders();
      }, 3000);

    return () =>
      clearInterval(interval);
  }, [user, trackingOrder]);

  /* STRIPE SUCCESS */
  useEffect(() => {
    const saveStripeOrder =
      async () => {
        try {
          const params =
            new URLSearchParams(
              window.location.search
            );

          const payment =
            params.get(
              "payment"
            );

          if (
            payment !==
            "success"
          )
            return;

          const singleOrder =
            localStorage.getItem(
              "topsChickenPendingOrder"
            );

          const cartOrder =
            localStorage.getItem(
              "topsChickenPendingCartOrder"
            );

          if (
            singleOrder
          ) {
            const parsedOrder =
              JSON.parse(
                singleOrder
              );

            const orderData =
              parsedOrder.orderData ||
              parsedOrder;

            await bookOrder({
              ...orderData,
              paymentStatus:
                "Paid",
            });

            localStorage.removeItem(
              "topsChickenPendingOrder"
            );
          }

          if (cartOrder) {
            const parsedCart =
              JSON.parse(
                cartOrder
              );

            const orderData =
              parsedCart.orderData ||
              parsedCart;

            await bookOrder({
              ...orderData,
              paymentStatus:
                "Paid",
            });

            localStorage.removeItem(
              "topsChickenPendingCartOrder"
            );

            clearCart();
          }

          window.history.replaceState(
            {},
            "",
            window.location.pathname
          );

          loadMyOrders();
        } catch (error) {
          console.log(
            "Stripe Order Error:",
            error
          );
        }
      };

    saveStripeOrder();
  }, []);

  /* CART ACTIONS */
  const increaseQty = (
    id
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                Number(
                  item.qty ||
                    1
                ) + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (
    id
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty:
                  Number(
                    item.qty ||
                      1
                  ) - 1,
              }
            : item
        )
        .filter(
          (item) =>
            Number(
              item.qty ||
                0
            ) > 0
        )
    );
  };

  const removeItem = (
    id
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  /* TOTAL */
  const total =
    cartItems.reduce(
      (sum, item) => {
        const price =
          Number(
            String(
              item.price ||
                "0"
            ).replace(
              "£",
              ""
            )
          );

        return (
          sum +
          price *
            Number(
              item.qty ||
                1
            )
        );
      },
      0
    );

  /* MODALS */
  const openOrder = (
    item
  ) => {
    setSelectedItem(item);
    setModalMode(
      "checkout"
    );
    setOrderOpen(true);
  };

  const openView = (
    item
  ) => {
    setSelectedItem(item);
    setModalMode(
      "detail"
    );
    setOrderOpen(true);
  };

  const openCheckout =
    () => {
      setModalMode(
        "checkout"
      );
      setOrderOpen(true);
    };

  const closeOrder = () => {
    setOrderOpen(false);
    setModalMode(
      "detail"
    );
  };

  const openCartCheckout =
    () => {
      setCartOpen(false);
      setCartCheckoutOpen(
        true
      );
    };

  const closeCartCheckout =
    () => {
      setCartCheckoutOpen(
        false
      );
    };

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,

        cartCheckoutOpen,
        openCartCheckout,
        closeCartCheckout,

        cartItems,
        setCartItems,

        addToCart,

        increaseQty,
        decreaseQty,

        removeItem,
        removeFromCart:
          removeItem,

        clearCart,

        total,
        cartTotal: total,

        cartCount:
          cartItems.reduce(
            (sum, item) =>
              sum +
              Number(
                item.qty ||
                  1
              ),
            0
          ),

        orderOpen,

        selectedItem,
        setSelectedItem,

        modalMode,

        openOrder,
        openOrderModal:
          openOrder,

        openView,
        openCheckout,

        closeOrder,

        successOpen,
        setSuccessOpen,

        trackingOrder,
        setTrackingOrder,

        trackingOpen,
        setTrackingOpen,

        myOrders,
        loadMyOrders,

        bookOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(
    CartContext
  );
}