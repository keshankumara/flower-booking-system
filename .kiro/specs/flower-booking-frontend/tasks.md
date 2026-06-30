# Implementation Plan: Flower Booking System Frontend

## Overview

Incremental build of the React + Vite frontend in implementation order: project config → design tokens → API layer → context → routing/layouts → pages → admin pages. Each task wires into the previous step so there is no orphaned code.

## Tasks

- [x] 1. Project configuration and design system foundation
  - [x] 1.1 Configure Vite proxy and environment variables
    - Update `vite.config.js` to proxy `/api` → `http://localhost:8080`
    - Create `.env` with `VITE_API_BASE_URL=/api`
    - _Requirements: 1.4, 1.7_
  - [x] 1.2 Add Google Fonts and global design tokens to `index.html` and `index.css`
    - Add Playfair Display + Plus Jakarta Sans `<link>` tags in `index.html`
    - Declare all CSS custom properties (colors, radii, spacing, typography) in `index.css`
    - Apply heading font to h1–h4 and body font globally
    - Add global button and input base styles
    - _Requirements: 1.5, 1.6, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 2. API service layer
  - [x] 2.1 Create Axios instance in `src/services/api.js`
    - Set `baseURL` to `/api`
    - Add request interceptor to attach `Authorization: Bearer <token>` from localStorage
    - Add response interceptor to handle 401 by clearing auth and redirecting to `/login`
    - _Requirements: 4.5, 4.6, 19.1_
  - [x] 2.2 Implement `src/services/authService.js`
    - Export `login(credentials)` → `POST /api/auth/login`
    - Export `register(data)` → `POST /api/auth/register`
    - Re-throw errors to caller
    - _Requirements: 19.2_
  - [x] 2.3 Implement `src/services/flowerService.js`
    - Export `getAll()`, `getById(id)`, `search(name)`, `filterByCategory(id)`, `filterByPrice(min, max)`, `create(data)`, `update(id, data)`, `delete(id)`
    - _Requirements: 19.3_
  - [x] 2.4 Implement `src/services/categoryService.js`
    - Export `getAll()`, `getById(id)`, `create(data)`, `update(id, data)`, `delete(id)`
    - _Requirements: 19.4_
  - [x] 2.5 Implement `src/services/bookingService.js`
    - Export `createBooking(email, flowerId, quantity)`, `getUserBookings(email)`, `cancelBooking(id)`
    - _Requirements: 19.5_
  - [x] 2.6 Implement `src/services/adminService.js`
    - Export `getAllBookings()`, `addFlower(data)`, `addCategory(data)`
    - _Requirements: 19.6_

- [x] 3. Context API
  - [x] 3.1 Implement `src/context/AuthContext.jsx`
    - State: `user`, `token`, `isAuthenticated`, `isAdmin`
    - On mount: restore session from localStorage
    - Expose `login(token, user)` action: persist to state + localStorage
    - Expose `logout()` action: clear state + localStorage + redirect to `/login`
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [x] 3.2 Implement `src/context/CartContext.jsx`
    - State: `items` array of `{ flower, quantity, subtotal }`
    - Expose `addItem`, `removeItem`, `updateQuantity`, `clearCart`
    - `addItem` increments quantity if flower already in cart
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 4. Reusable component library
  - [x] 4.1 Create `src/components/common/Button.jsx`
    - Props: `variant` (primary | secondary | danger), `size` (sm | md | lg), `loading`, `disabled`, `onClick`
    - _Requirements: 17.1_
  - [x] 4.2 Create `src/components/common/Input.jsx`
    - Props: `label`, `type`, `value`, `onChange`, `error`, `placeholder`
    - 56px height, pill-shaped radius, focus border transitions to `--color-tertiary`
    - _Requirements: 17.2_
  - [x] 4.3 Create `src/components/common/Modal.jsx`
    - Props: `isOpen`, `onClose`, `title`, `children`
    - Centered overlay with backdrop; trap focus when open
    - _Requirements: 17.3_
  - [x] 4.4 Create `src/components/common/Badge.jsx`
    - Props: `status` (PENDING | CONFIRMED | CANCELLED | IN_SEASON | BEST_SELLER)
    - Color-coded pill badge per status
    - _Requirements: 17.4_
  - [x] 4.5 Create `src/components/common/SkeletonCard.jsx`
    - Mimics FlowerCard layout as animated loading placeholder
    - _Requirements: 17.5_
  - [x] 4.6 Create `src/components/common/ConfirmDialog.jsx`
    - Props: `isOpen`, `message`, `onConfirm`, `onCancel`
    - _Requirements: 17.7_
  - [x] 4.7 Create `src/components/flowers/FlowerCard.jsx`
    - Props: `flower`, `onAddToCart`, `onViewDetails`
    - Render image, name, category chip, price, action buttons
    - _Requirements: 17.6_

- [x] 5. Layout components and routing skeleton
  - [x] 5.1 Create `src/components/layout/Navbar.jsx`
    - Brand logo/name, center nav links (Home, Flowers), right: cart icon with item count badge + user menu or login/register links
    - Authenticated: show name + logout dropdown; unauthenticated: show Login + Register
    - Hamburger collapse on < 768px
    - _Requirements: 18.1, 18.2, 18.3, 18.4_
  - [x] 5.2 Create `src/components/layout/Footer.jsx`
    - Brand info, nav links (Home, Flowers, Login), copyright text
    - _Requirements: 18.5_
  - [x] 5.3 Create `src/components/layout/MainLayout.jsx`
    - Renders Navbar + `<Outlet />` + Footer
    - _Requirements: 18.6_
  - [x] 5.4 Create `src/components/layout/AdminSidebar.jsx`
    - Links to Dashboard, Manage Flowers, Manage Categories, Manage Bookings
    - Highlight active route using `NavLink`
    - _Requirements: 13.4, 13.5_
  - [x] 5.5 Create `src/components/layout/AdminTopBar.jsx`
    - Top bar for admin layout showing page title and user info
    - _Requirements: 18.7_
  - [x] 5.6 Create `src/components/layout/AdminLayout.jsx`
    - Renders AdminSidebar + AdminTopBar + `<Outlet />`; no public Navbar/Footer
    - _Requirements: 18.7_
  - [x] 5.7 Create route guards `src/components/routing/ProtectedRoute.jsx` and `src/components/routing/AdminRoute.jsx`
    - ProtectedRoute: redirect unauthenticated to `/login`
    - AdminRoute: redirect non-admin to `/`
    - _Requirements: 3.4, 3.5_
  - [x] 5.8 Wire all routes in `src/App.jsx`
    - Public routes under MainLayout: `/`, `/login`, `/register`, `/flowers`, `/flowers/:id`
    - Protected routes under MainLayout + ProtectedRoute: `/cart`, `/checkout`, `/orders`
    - Admin routes under AdminLayout + AdminRoute: `/admin/dashboard`, `/admin/flowers`, `/admin/categories`, `/admin/bookings`
    - 404 catch-all route
    - Wrap app in `AuthContext.Provider` and `CartContext.Provider`
    - _Requirements: 3.1, 3.2, 3.3, 3.6, 3.7_

- [x] 6. Checkpoint — verify routing and layout render correctly
  - Ensure app compiles, all routes render their layout shell, and context providers are accessible. Ask the user if questions arise.

- [x] 7. Authentication pages
  - [x] 7.1 Implement `src/pages/LoginPage.jsx`
    - Email + password inputs (56px pill), loading state, error display, link to `/register`
    - On submit: call `authService.login`, store via `AuthContext.login`, redirect to `/`
    - Client-side validation for empty fields (no API call)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  - [x] 7.2 Implement `src/pages/RegisterPage.jsx`
    - Name, email, password, confirm password inputs; link to `/login`
    - Validate: passwords match, valid email format (no API call on failure)
    - On success: redirect to `/login` with success notification
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [x] 8. Flower browsing pages
  - [x] 8.1 Implement `src/pages/HomePage.jsx`
    - Hero section: headline, subtitle, CTA → `/flowers`
    - "Featured Flowers" section: fetch up to 8 flowers via `flowerService.getAll()`, render as FlowerCards
    - "Browse by Category" section: fetch categories via `categoryService.getAll()`, render category chips; clicking navigates to `/flowers?category={id}`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  - [x] 8.2 Implement `src/pages/FlowerListingPage.jsx`
    - Fetch all flowers on load; render responsive grid (4/2/1 columns)
    - Search input with 400ms debounce → `flowerService.search(name)`
    - Category filter → `flowerService.filterByCategory(id)`
    - Price range filter → `flowerService.filterByPrice(min, max)`
    - Skeleton loading state (SkeletonCard), empty state message
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 20.2_
  - [x] 8.3 Implement `src/pages/FlowerDetailsPage.jsx`
    - Fetch flower by id via `flowerService.getById(id)`; display image, name, category, description, price, stock
    - Quantity selector (1 to stockQuantity)
    - "Add to Cart" → `CartContext.addItem`; "Book Now" → navigate to `/checkout` with state
    - Out-of-stock badge + disable buttons when stock = 0
    - Update document title to flower name
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [x] 9. Cart and checkout pages
  - [x] 9.1 Create `src/components/cart/CartItem.jsx`
    - Display flower image, name, price, quantity editor, remove button; reads from CartContext
    - _Requirements: 10.4_
  - [x] 9.2 Implement `src/pages/CartPage.jsx`
    - List CartItem components, order summary (subtotals + total), "Proceed to Checkout" button
    - Empty state with "Browse Flowers" link
    - Unauthenticated checkout click → redirect to `/login` preserving destination
    - _Requirements: 10.4, 10.5, 10.6, 10.7, 10.9_
  - [x] 9.3 Implement `src/pages/CheckoutPage.jsx`
    - Order summary, read-only user email, "Place Order" button
    - Redirect to `/cart` if cart empty
    - On submit: call `bookingService.createBooking` for each item; on success clear cart + navigate to `/orders`; on error display message + preserve cart
    - Loading state disables button
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

- [x] 10. Orders page
  - [x] 10.1 Create `src/components/bookings/BookingRow.jsx`
    - Display booking ID, flower name, quantity, total price, booking date, status Badge, Cancel button (PENDING only)
    - _Requirements: 12.2, 12.3_
  - [x] 10.2 Implement `src/pages/OrdersPage.jsx`
    - Fetch user bookings via `bookingService.getUserBookings(email)`; sort by date descending
    - Render BookingRow list; skeleton loading; empty state
    - Cancel booking → `bookingService.cancelBooking(id)`; update status in-place without reload
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

- [x] 11. Checkpoint — verify all user-facing flows compile and render
  - Ensure all pages mount without errors, context actions work, and service calls are wired. Ask the user if questions arise.

- [x] 12. Admin pages
  - [x] 12.1 Implement `src/pages/admin/AdminDashboardPage.jsx`
    - Fetch all bookings via `adminService.getAllBookings()` for counts and recent 5 preview
    - Render stat cards: total flowers, total categories, total bookings
    - Recent bookings preview table
    - _Requirements: 13.1, 13.2, 13.3_
  - [x] 12.2 Implement `src/pages/admin/AdminFlowersPage.jsx`
    - Data table: ID, Image, Name, Category, Price, Stock, Actions
    - Add Flower button → AddFlowerModal (fields: name, description, price, stockQuantity, imageUrl, category dropdown); submit → `adminService.addFlower(data)` + refresh
    - Edit button → EditFlowerModal pre-populated; submit → `flowerService.update(id, data)` + refresh
    - Delete button → ConfirmDialog → `flowerService.delete(id)` + remove row
    - Error toast on any API failure
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8_
  - [x] 12.3 Implement `src/pages/admin/AdminCategoriesPage.jsx`
    - Data table: ID, Name, Description, Actions
    - Add Category button → AddCategoryModal; submit → `adminService.addCategory(data)` + refresh
    - Edit button → EditCategoryModal pre-populated; submit → `categoryService.update(id, data)` + refresh
    - Delete button → ConfirmDialog → `categoryService.delete(id)` + remove row
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7_
  - [x] 12.4 Implement `src/pages/admin/AdminBookingsPage.jsx`
    - Data table: Booking ID, Customer Email, Flower Name, Quantity, Total Price, Date, Status
    - Status filter dropdown (All | PENDING | CONFIRMED | CANCELLED)
    - Sortable columns: bookingDate, totalPrice
    - Color-coded status badges consistent with OrdersPage
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [x] 13. Responsive design polish
  - [x] 13.1 Apply mobile-first responsive styles across all pages and components
    - Flower grid: 4 cols ≥ 1024px, 2 cols ≥ 640px, 1 col below 640px
    - Hero font: 48px desktop → 32px mobile
    - Admin tables: horizontal scroll on < 768px
    - All interactive targets: minimum 44×44px
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_

- [x] 14. Final checkpoint — ensure all tests pass and the app runs correctly
  - Ensure app compiles with no errors, all routes render, auth/cart flows work end-to-end. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation before moving to the next phase
- Implementation order: config → API → context → components → layouts/routing → pages → admin → responsive
