import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Spinner from './components/common/Spinner'

// ── Lazy-loaded pages (code splitting per route) ──────────────────────────────
const HomePage           = lazy(() => import('./pages/HomePage'))
const LoginPage          = lazy(() => import('./pages/LoginPage'))
const RegisterPage       = lazy(() => import('./pages/RegisterPage'))
const FlowerListingPage  = lazy(() => import('./pages/FlowerListingPage'))
const FlowerDetailsPage  = lazy(() => import('./pages/FlowerDetailsPage'))
const CartPage           = lazy(() => import('./pages/CartPage'))
const CheckoutPage       = lazy(() => import('./pages/CheckoutPage'))
const OrdersPage         = lazy(() => import('./pages/OrdersPage'))
const NotFoundPage       = lazy(() => import('./pages/NotFoundPage'))

// Admin pages — separate chunk
const AdminDashboardPage  = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminFlowersPage    = lazy(() => import('./pages/admin/AdminFlowersPage'))
const AdminCategoriesPage = lazy(() => import('./pages/admin/AdminCategoriesPage'))
const AdminBookingsPage   = lazy(() => import('./pages/admin/AdminBookingsPage'))

// ── Page-level loading fallback ───────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
    }}>
      <Spinner size="lg" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* ── Public routes (MainLayout) ── */}
              <Route element={<MainLayout />}>
                <Route path="/"            element={<HomePage />} />
                <Route path="/login"       element={<LoginPage />} />
                <Route path="/register"    element={<RegisterPage />} />
                <Route path="/flowers"     element={<FlowerListingPage />} />
                <Route path="/flowers/:id" element={<FlowerDetailsPage />} />

                {/* ── Authenticated user routes ── */}
                <Route path="/cart"     element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path="/orders"   element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
              </Route>

              {/* ── Admin routes (AdminLayout) ── */}
              <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route path="/admin/dashboard"  element={<AdminDashboardPage />} />
                <Route path="/admin/flowers"    element={<AdminFlowersPage />} />
                <Route path="/admin/categories" element={<AdminCategoriesPage />} />
                <Route path="/admin/bookings"   element={<AdminBookingsPage />} />
              </Route>

              {/* ── 404 ── */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
