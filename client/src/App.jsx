import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartSidebar from "./components/CartSidebar";
import OrderModal from "./components/OrderModal";
import CartCheckoutModal from "./components/CartCheckoutModal";
import TrackingModal from "./components/TrackingModal";
import AuthModal from "./components/AuthModal";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";

export default function App() {
  const path = window.location.pathname;

  if (path === "/admin") {
    return <AdminLogin />;
  }

  if (path === "/admin/dashboard") {
    return <AdminLayout />;
  }

  return (
    <>
      <Navbar />
      <Home />
      <CartSidebar />
      <OrderModal />
      <CartCheckoutModal />
      <TrackingModal />
      <AuthModal />
    </>
  );
}