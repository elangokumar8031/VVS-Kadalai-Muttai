import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import Bakery from "../pages/Bakery";
import Home from "../pages/Home";
import Order from "../pages/Order";
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout";
import Sweets from "../pages/Sweets";
import BulkEnquiry from "../pages/BulkEnquiry";
import Savouries from "../pages/Savouries";
import Orders from "../admin/Orders";
import BestSellersPage from "../pages/BestSellersPage";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import CategoryPage from "../pages/CategoryPage";
import AdminLogin from "../pages/AdminLogin";
import OurStoryPage from "../pages/OurStoryPage";
import ScrollToTop from "../components/ScrollToTop";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>

      {/* USER PAGES (WITH LAYOUT) */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/sweets"
        element={
          <MainLayout>
            <Sweets />
          </MainLayout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        }
      />
      <Route
  path="/cart"
  element={
    <MainLayout>
      <Cart />
    </MainLayout>
  }
/>

      <Route
        path="/category/:categoryName"
        element={
          <MainLayout>
            <CategoryPage />
          </MainLayout>
        }
      />

      <Route
        path="/bakery"
        element={
          <MainLayout>
            <Bakery />
          </MainLayout>
        }
      />
      <Route
        path="/savouries"
        element={
          <MainLayout>
            <Savouries />
          </MainLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
      <Route
        path="/bestsellers"
        element={
          <MainLayout>
            <BestSellersPage />
          </MainLayout>
        }
      />

      <Route
        path="/order"
        element={
          <MainLayout>
            <Order />
          </MainLayout>
        }
      />

      <Route
        path="/checkout"
        element={
          <MainLayout>
            <Checkout />
          </MainLayout>
        }
      />

      <Route
        path="/bulk-enquiry"
        element={
          <MainLayout>
            <BulkEnquiry />
          </MainLayout>
        }
      />

      <Route
        path="/our-story"
        element={
          <MainLayout>
            <OurStoryPage />
          </MainLayout>
        }
      />

      {/* ADMIN PAGES (ADMIN LAYOUT) */}
      <Route
        path="/admin/orders"
        element={
          <AdminLayout>
            <Orders />
          </AdminLayout>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminLayout>
            <AdminLogin />
          </AdminLayout>
        }
      />

    </Routes>
    </>
  );
};

export default AppRoutes;