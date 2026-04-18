import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import StorefrontLayout from './components/layout/StorefrontLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Storefront Pages
import Home from './pages/storefront/Home';
import ProductList from './pages/storefront/ProductList';
import ProductDetail from './pages/storefront/ProductDetail';
import Blog from './pages/storefront/Blog';
import BlogPostDetail from './pages/storefront/BlogPostDetail';
import Cart from './pages/storefront/Cart';
import Contact from './pages/storefront/Contact';
import Checkout from './pages/storefront/Checkout';

// Dashboard Pages
import Login from './pages/dashboard/Login';
import DashboardHome from './pages/dashboard/DashboardHome';
import Inventory from './pages/dashboard/Inventory';
import POS from './pages/dashboard/POS';
import Orders from './pages/dashboard/Orders';
import Warehouses from './pages/dashboard/Warehouses';
import Employees from './pages/dashboard/Employees';
import CRM from './pages/dashboard/CRM';
import Analytics from './pages/dashboard/Analytics';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="godsway-theme" attribute="class">
      <AuthProvider>
        <CartProvider>
          <ErrorBoundary>
            <Router>
              <Routes>
                {/* Storefront Routes */}
                <Route element={<StorefrontLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPostDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Route>

                {/* Dashboard Routes (Auth protected) */}
                <Route path="/dashboard/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="pos" element={<POS />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="warehouses" element={<Warehouses />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="crm" element={<CRM />} />
                    <Route path="analytics" element={<Analytics />} />
                  </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster position="top-right" />
            </Router>
          </ErrorBoundary>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
