# Requirements Document

## Introduction

This document defines the requirements for the **Flower Booking System Frontend** — a React + Vite single-page application that serves as the complete user interface for a Spring Boot REST API backend. The application enables customers to browse floral arrangements, manage a shopping cart, place bookings, and track orders. It also provides an admin interface for managing flowers, categories, and all bookings.

The design follows the "Botanical Elegance / The Digital Conservatory" design system with Petal Pink (#6b5a60) as the primary brand color, Deep Rose (#a82d68) for CTAs, and Botanical Green (#556158) as the secondary palette. Typography pairs Playfair Display (headings) with Plus Jakarta Sans (body/UI). All interactive elements use pill-shaped radii; cards use rounded-xl.

---

## Glossary

- **App**: The React + Vite frontend application.
- **AuthContext**: The React Context that holds authentication state (JWT token, user info, role).
- **CartContext**: The React Context that holds the client-side shopping cart state.
- **Router**: React Router v6 managing all client-side navigation.
- **API_Client**: The Axios instance configured with the base URL and JWT interceptor.
- **AuthService**: The frontend service module that calls `/api/auth/*` endpoints.
- **FlowerService**: The frontend service module that calls `/api/flowers/*` endpoints.
- **CategoryService**: The frontend service module that calls `/api/categories/*` endpoints.
- **BookingService**: The frontend service module that calls `/api/bookings/*` endpoints.
- **AdminService**: The frontend service module that calls `/api/admin/*` endpoints.
- **MainLayout**: The shared layout wrapping public-facing pages with Navbar and Footer.
- **AdminLayout**: The shared layout wrapping admin pages with AdminSidebar and AdminTopBar.
- **ProtectedRoute**: A route guard component that redirects unauthenticated users to login.
- **AdminRoute**: A route guard component that redirects non-admin users to the home page.
- **FlowerCard**: A reusable card component displaying a single flower's image, name, and price.
- **CartItem**: A reusable component displaying a single line item within the cart.
- **BookingRow**: A reusable table row component displaying a single booking record.
- **User**: An entity with fields: id, name, email, role (USER | ADMIN).
- **Flower**: An entity with fields: id, name, description, price, stockQuantity, imageUrl, category.
- **Category**: An entity with fields: id, name, description.
- **Booking**: An entity with fields: id, quantity, totalPrice, bookingDate, status (PENDING | CONFIRMED | CANCELLED), user, flower.
- **JWT**: JSON Web Token returned by `/api/auth/login`, stored in localStorage and sent as `Authorization: Bearer <token>` on all protected requests.

---

## Requirements

### Requirement 1: Project Setup and Build Configuration

**User Story:** As a developer, I want the project to be correctly scaffolded with all required dependencies, so that the team can start development immediately without environment issues.

#### Acceptance Criteria

1. THE App SHALL be built with React 19 and Vite as the build tool.
2. THE App SHALL include `react-router-dom` v6 for client-side navigation.
3. THE App SHALL include `axios` for all HTTP communication with the backend API.
4. THE App SHALL configure a Vite proxy so that requests to `/api` are forwarded to `http://localhost:8080` during development.
5. THE App SHALL import the `Playfair Display` and `Plus Jakarta Sans` fonts from Google Fonts in `index.html`.
6. THE App SHALL define CSS custom properties in `index.css` for all design-system tokens (colors, spacing, border-radius, typography scales) derived from DESIGN.md.
7. THE `vite.config.js` SHALL configure the dev server proxy to avoid CORS issues in development.

---

### Requirement 2: Design System Token Implementation

**User Story:** As a UI engineer, I want a single source of truth for all design tokens, so that every component consistently reflects the Botanical Elegance design system.

#### Acceptance Criteria

1. THE `index.css` SHALL declare CSS variables for: `--color-primary` (#6b5a60), `--color-tertiary` (#a82d68), `--color-secondary` (#556158), `--color-surface` (#fbf9f8), `--color-on-surface` (#1b1c1c), `--color-error` (#ba1a1a), and all other DESIGN.md color tokens.
2. THE `index.css` SHALL declare CSS variables for border-radius tokens: `--radius-full` (9999px), `--radius-xl` (3rem), `--radius-lg` (2rem), `--radius-md` (1.5rem).
3. THE `index.css` SHALL declare CSS variables for spacing tokens: `--spacing-base` (8px), `--container-max` (1200px), `--gutter` (24px).
4. THE App SHALL apply Playfair Display to all heading elements (h1–h4) and Plus Jakarta Sans as the default body font via `index.css`.
5. THE App's global button style SHALL use `--color-tertiary` as the background, white text, and `--radius-full` as the border-radius for primary action buttons.
6. THE App's global input style SHALL use a 56px height, `--radius-full` border-radius, a subtle border that transitions to `--color-tertiary` on focus.

---

### Requirement 3: Application Routing

**User Story:** As a user, I want to navigate between all pages of the application without full page reloads, so that the experience feels fast and seamless.

#### Acceptance Criteria

1. THE Router SHALL define the following public routes: `/` (Home), `/login` (Login), `/register` (Register), `/flowers` (Flower Listing), `/flowers/:id` (Flower Details).
2. THE Router SHALL define the following authenticated user routes behind ProtectedRoute: `/cart` (Cart), `/checkout` (Checkout), `/orders` (My Orders).
3. THE Router SHALL define the following admin routes behind AdminRoute: `/admin/dashboard` (Admin Dashboard), `/admin/flowers` (Manage Flowers), `/admin/categories` (Manage Categories), `/admin/bookings` (Manage Bookings).
4. WHEN an unauthenticated user navigates to a ProtectedRoute, THE Router SHALL redirect the user to `/login`.
5. WHEN a non-admin authenticated user navigates to an AdminRoute, THE Router SHALL redirect the user to `/`.
6. WHEN a user navigates to an undefined path, THE Router SHALL render a 404 Not Found page.
7. THE App SHALL wrap all routes within `MainLayout` for public/user routes and `AdminLayout` for admin routes.

---

### Requirement 4: Authentication — Context and State

**User Story:** As a user, I want my authentication state to persist across page refreshes, so that I do not have to log in repeatedly.

#### Acceptance Criteria

1. THE AuthContext SHALL store the following state: `user` (object with name, email, role), `token` (string), `isAuthenticated` (boolean), `isAdmin` (boolean).
2. WHEN the App initializes, THE AuthContext SHALL read the token and user from localStorage and restore the session if a valid token is present.
3. WHEN the `login` action is dispatched, THE AuthContext SHALL store the JWT token and user data in both state and localStorage.
4. WHEN the `logout` action is dispatched, THE AuthContext SHALL clear the token and user from both state and localStorage and redirect the user to `/login`.
5. THE API_Client SHALL attach the `Authorization: Bearer <token>` header to every outgoing request when a token is present in AuthContext.
6. WHEN the backend returns an HTTP 401 response, THE API_Client SHALL automatically dispatch the `logout` action and redirect the user to `/login`.

---

### Requirement 5: Authentication — Login Page

**User Story:** As a registered user, I want to log in with my email and password, so that I can access my account and bookings.

#### Acceptance Criteria

1. THE Login page SHALL render an email input field and a password input field, both styled as pill-shaped inputs with 56px height.
2. WHEN the user submits the login form with a valid email and password, THE AuthService SHALL call `POST /api/auth/login` with the credentials.
3. WHEN the login API call succeeds, THE AuthContext SHALL store the returned JWT and redirect the user to `/`.
4. IF the login API call returns an error, THEN THE Login page SHALL display a descriptive error message below the form.
5. WHILE the login API call is in progress, THE Login page SHALL display a loading indicator and disable the submit button.
6. THE Login page SHALL include a link to the Register page (`/register`).
7. WHEN the user submits the form with an empty email or password field, THE Login page SHALL display inline validation errors without making an API call.

---

### Requirement 6: Authentication — Register Page

**User Story:** As a new user, I want to create an account with my name, email, and password, so that I can start booking flowers.

#### Acceptance Criteria

1. THE Register page SHALL render input fields for: name, email, password, and confirm password.
2. WHEN the user submits the registration form with valid data, THE AuthService SHALL call `POST /api/auth/register` with name, email, and password.
3. WHEN the registration API call succeeds, THE Register page SHALL redirect the user to `/login` and display a success notification.
4. IF the registration API call returns an error, THEN THE Register page SHALL display a descriptive error message.
5. WHEN the user submits the form with a password that does not match confirmPassword, THE Register page SHALL display a "Passwords do not match" validation error without making an API call.
6. WHEN the user submits the form with an email that does not match the standard email format, THE Register page SHALL display an "Invalid email format" validation error without making an API call.
7. THE Register page SHALL include a link to the Login page (`/login`).

---

### Requirement 7: Home Page

**User Story:** As a visitor, I want to see an attractive landing page that highlights featured flowers and categories, so that I am inspired to browse and book.

#### Acceptance Criteria

1. THE Home page SHALL render a hero section with a headline, a subtitle, and a primary CTA button styled with Deep Rose (#a82d68) that navigates to `/flowers`.
2. THE Home page SHALL render a "Featured Flowers" section that fetches and displays up to 8 flowers using `GET /api/flowers` and renders each as a FlowerCard.
3. THE Home page SHALL render a "Browse by Category" section that fetches all categories using `GET /api/categories` and renders each as a clickable category chip/card.
4. WHEN a user clicks a category chip, THE Home page SHALL navigate to `/flowers` with the selected category pre-applied as a filter.
5. WHEN the FlowerCard "Book Now" / "View Details" CTA is clicked, THE Router SHALL navigate to `/flowers/:id`.
6. THE Home page SHALL render a footer section containing navigation links, brand tagline, and copyright text.

---

### Requirement 8: Flower Listing Page

**User Story:** As a shopper, I want to browse, search, and filter all available flowers, so that I can find exactly what I am looking for.

#### Acceptance Criteria

1. THE Flower Listing page SHALL fetch and display all flowers using `GET /api/flowers` on initial load, rendering each as a FlowerCard in a responsive grid (4 columns desktop, 2 columns tablet, 1 column mobile).
2. THE Flower Listing page SHALL render a search input that calls `GET /api/flowers/search?name={query}` after the user stops typing for 400ms (debounced).
3. THE Flower Listing page SHALL render a category filter that calls `GET /api/flowers/filter/category/{id}` when a category is selected.
4. THE Flower Listing page SHALL render a price range filter with min and max inputs that calls `GET /api/flowers/filter/price?min={min}&max={max}` when applied.
5. WHEN no flowers match the current filters, THE Flower Listing page SHALL display an empty state message: "No flowers found for your search."
6. WHILE flowers are being fetched, THE Flower Listing page SHALL display skeleton loading cards in place of real FlowerCards.
7. THE Flower Listing page SHALL fetch all categories using `GET /api/categories` to populate the category filter options.

---

### Requirement 9: Flower Details Page

**User Story:** As a shopper, I want to see the full details of a flower including description, price, and stock, so that I can make an informed booking decision.

#### Acceptance Criteria

1. THE Flower Details page SHALL fetch a single flower using `GET /api/flowers/:id` and display: image, name, category, description, price, and stock quantity.
2. THE Flower Details page SHALL render a quantity selector that allows the user to choose between 1 and the available stockQuantity.
3. WHEN the user clicks "Add to Cart," THE CartContext SHALL add the flower and selected quantity to the cart state.
4. WHEN the user clicks "Book Now," THE Router SHALL navigate to `/checkout` with the selected flower and quantity pre-populated.
5. IF the flower's stockQuantity is 0, THEN THE Flower Details page SHALL display an "Out of Stock" badge and disable the "Add to Cart" and "Book Now" buttons.
6. WHEN the Flower Details page finishes loading, THE App SHALL update the browser tab title to reflect the flower name.

---

### Requirement 10: Shopping Cart

**User Story:** As a shopper, I want to review the items I have added to my cart before placing a booking, so that I can confirm my order.

#### Acceptance Criteria

1. THE CartContext SHALL store cart items as an array of objects: `{ flower, quantity, subtotal }`.
2. THE CartContext SHALL expose actions: `addItem`, `removeItem`, `updateQuantity`, and `clearCart`.
3. WHEN `addItem` is called with a flower already in the cart, THE CartContext SHALL increment the quantity of that item rather than adding a duplicate.
4. THE Cart page SHALL display each item as a CartItem component showing: flower image, name, price, a quantity editor, and a remove button.
5. THE Cart page SHALL display an order summary section with the subtotal for each item, the total price, and a "Proceed to Checkout" button.
6. WHEN the user clicks "Remove" on a CartItem, THE CartContext SHALL remove that item and re-render the cart totals.
7. WHEN the cart is empty, THE Cart page SHALL display an empty state with a "Browse Flowers" link to `/flowers`.
8. THE Navbar SHALL display a cart icon with a badge showing the current total item count from CartContext.
9. WHEN the "Proceed to Checkout" button is clicked and the user is not authenticated, THE App SHALL redirect the user to `/login` and preserve the intended destination.

---

### Requirement 11: Checkout Page

**User Story:** As an authenticated user, I want to confirm my order details and place a booking, so that my flowers are reserved.

#### Acceptance Criteria

1. THE Checkout page SHALL display an order summary showing each cart item (name, quantity, subtotal) and the grand total.
2. THE Checkout page SHALL display the logged-in user's email (read-only) as the booking contact.
3. WHEN the user clicks "Place Order," THE BookingService SHALL call `POST /api/bookings` for each distinct item in the cart, passing email, flowerId, and quantity as query parameters.
4. WHEN all booking API calls succeed, THE CartContext SHALL clear the cart and THE Router SHALL navigate to `/orders`.
5. IF any booking API call fails, THEN THE Checkout page SHALL display an error message and preserve the cart state.
6. WHILE booking API calls are in progress, THE Checkout page SHALL disable the "Place Order" button and display a loading indicator.
7. WHEN the Checkout page is loaded with an empty cart, THE Router SHALL redirect the user to `/cart`.

---

### Requirement 12: My Orders Page

**User Story:** As an authenticated user, I want to view all of my past and current bookings, so that I can track my order history.

#### Acceptance Criteria

1. THE Orders page SHALL fetch the current user's bookings using `GET /api/bookings/user?email={email}` and display them in a list or table sorted by bookingDate descending.
2. THE Orders page SHALL render each booking as a BookingRow showing: booking ID, flower name, quantity, total price, booking date, and status.
3. THE Booking status SHALL be visually differentiated using color-coded badges: PENDING (yellow), CONFIRMED (green), CANCELLED (red/grey).
4. WHEN the user clicks "Cancel" on a PENDING booking, THE BookingService SHALL call `PUT /api/bookings/cancel/{id}`.
5. WHEN the cancellation API call succeeds, THE Orders page SHALL update the booking status in the list to CANCELLED without a full page reload.
6. WHEN a user has no bookings, THE Orders page SHALL display an empty state message: "You have no bookings yet."
7. WHILE bookings are being fetched, THE Orders page SHALL display a loading skeleton in place of the table.

---

### Requirement 13: Admin Dashboard

**User Story:** As an admin, I want a dedicated dashboard showing a high-level overview of the system, so that I can monitor activity at a glance.

#### Acceptance Criteria

1. THE Admin Dashboard page SHALL be accessible only via AdminRoute and display within AdminLayout.
2. THE Admin Dashboard SHALL display summary stat cards for: total flowers count, total categories count, and total bookings count.
3. THE Admin Dashboard SHALL display a recent bookings preview table showing the 5 most recent bookings fetched via `GET /api/admin/bookings`.
4. THE AdminLayout SHALL render a sidebar with navigation links to: Dashboard, Manage Flowers, Manage Categories, and Manage Bookings.
5. THE AdminLayout sidebar SHALL visually highlight the currently active route link.

---

### Requirement 14: Admin — Manage Flowers

**User Story:** As an admin, I want to add, edit, and delete flowers, so that I can keep the catalog up to date.

#### Acceptance Criteria

1. THE Admin Flowers page SHALL fetch and display all flowers in a data table with columns: ID, Image, Name, Category, Price, Stock, Actions.
2. WHEN the admin clicks "Add Flower," THE App SHALL display an AddFlowerModal (or inline form) with fields: name, description, price, stockQuantity, imageUrl, and category (dropdown).
3. WHEN the admin submits the Add Flower form with valid data, THE AdminService SHALL call `POST /api/admin/flowers` and refresh the flower table.
4. WHEN the admin clicks "Edit" on a flower row, THE App SHALL display an EditFlowerModal pre-populated with the flower's current data.
5. WHEN the admin submits the Edit Flower form, THE FlowerService SHALL call `PUT /api/flowers/{id}` and refresh the flower table.
6. WHEN the admin clicks "Delete" on a flower row, THE App SHALL display a confirmation dialog before proceeding.
7. WHEN the admin confirms deletion, THE FlowerService SHALL call `DELETE /api/flowers/{id}` and remove the row from the table.
8. IF any admin flower API call fails, THEN THE Admin Flowers page SHALL display a descriptive error toast notification.

---

### Requirement 15: Admin — Manage Categories

**User Story:** As an admin, I want to add, edit, and delete flower categories, so that I can organise the catalog.

#### Acceptance Criteria

1. THE Admin Categories page SHALL fetch and display all categories in a data table with columns: ID, Name, Description, Actions.
2. WHEN the admin clicks "Add Category," THE App SHALL display an AddCategoryModal with fields: name and description.
3. WHEN the admin submits the Add Category form, THE AdminService SHALL call `POST /api/admin/categories` and refresh the category table.
4. WHEN the admin clicks "Edit" on a category row, THE App SHALL display an EditCategoryModal pre-populated with the category's current data.
5. WHEN the admin submits the Edit Category form, THE CategoryService SHALL call `PUT /api/categories/{id}` and refresh the category table.
6. WHEN the admin clicks "Delete" on a category row, THE App SHALL display a confirmation dialog before proceeding.
7. WHEN the admin confirms deletion, THE CategoryService SHALL call `DELETE /api/categories/{id}` and remove the row from the table.

---

### Requirement 16: Admin — Manage Bookings

**User Story:** As an admin, I want to view all bookings across all users, so that I can manage fulfilment and operations.

#### Acceptance Criteria

1. THE Admin Bookings page SHALL fetch and display all bookings using `GET /api/admin/bookings` in a data table with columns: Booking ID, Customer Email, Flower Name, Quantity, Total Price, Date, Status.
2. THE Admin Bookings table SHALL support status-based filtering (All | PENDING | CONFIRMED | CANCELLED) via a filter dropdown above the table.
3. THE Booking status column SHALL render color-coded badges consistent with the My Orders page design.
4. THE Admin Bookings table SHALL be sortable by bookingDate and totalPrice columns.

---

### Requirement 17: Reusable Component Library

**User Story:** As a frontend developer, I want a set of well-defined reusable components, so that the UI is consistent and new pages can be built quickly.

#### Acceptance Criteria

1. THE App SHALL implement a `Button` component accepting props: `variant` (primary | secondary | danger), `size` (sm | md | lg), `loading` (boolean), `disabled` (boolean), and `onClick`.
2. THE App SHALL implement an `Input` component accepting props: `label`, `type`, `value`, `onChange`, `error`, and `placeholder`, styled with 56px height and pill-shaped radius.
3. THE App SHALL implement a `Modal` component accepting props: `isOpen`, `onClose`, `title`, and `children`, rendered as a centered overlay with backdrop.
4. THE App SHALL implement a `Badge` component accepting props: `status` (PENDING | CONFIRMED | CANCELLED | IN_SEASON | BEST_SELLER) and rendering an appropriately color-coded pill badge.
5. THE App SHALL implement a `SkeletonCard` component that mimics the FlowerCard layout for use as a loading placeholder.
6. THE FlowerCard component SHALL accept props: `flower` (object), `onAddToCart` (function), and `onViewDetails` (function), and render the flower image, name, category chip, price, and action buttons.
7. THE App SHALL implement a `ConfirmDialog` component used for all destructive admin actions, accepting props: `isOpen`, `message`, `onConfirm`, and `onCancel`.

---

### Requirement 18: Navbar and Layout Components

**User Story:** As a user, I want a consistent navigation bar on every page, so that I can always find my way around the application.

#### Acceptance Criteria

1. THE Navbar SHALL display the brand logo/name on the left, navigation links in the center (Home, Flowers), and action icons on the right (cart icon with badge, user menu / login button).
2. WHEN the user is authenticated, THE Navbar SHALL display a user avatar / name and a "Logout" option in a dropdown menu.
3. WHEN the user is not authenticated, THE Navbar SHALL display "Login" and "Register" links.
4. THE Navbar SHALL be fully responsive: on mobile viewports (< 768px) it SHALL collapse navigation links into a hamburger menu.
5. THE Footer SHALL display brand information, navigation links (Home, Flowers, Login), and copyright text.
6. THE MainLayout SHALL render Navbar at the top, page content in the main area, and Footer at the bottom.
7. THE AdminLayout SHALL render AdminSidebar on the left and AdminTopBar at the top, with page content in the main area, and SHALL NOT render the public Navbar or Footer.

---

### Requirement 19: API Service Layer

**User Story:** As a developer, I want all API calls centralized in service modules, so that endpoints are easy to find, reuse, and modify.

#### Acceptance Criteria

1. THE API_Client SHALL be an Axios instance created in `src/services/api.js` with `baseURL` set to `/api` and a request interceptor that attaches the JWT `Authorization` header.
2. THE AuthService (`src/services/authService.js`) SHALL export functions: `login(credentials)` → `POST /api/auth/login` and `register(data)` → `POST /api/auth/register`.
3. THE FlowerService (`src/services/flowerService.js`) SHALL export functions: `getAll()`, `getById(id)`, `search(name)`, `filterByCategory(id)`, `filterByPrice(min, max)`, `create(data)`, `update(id, data)`, `delete(id)`.
4. THE CategoryService (`src/services/categoryService.js`) SHALL export functions: `getAll()`, `getById(id)`, `create(data)`, `update(id, data)`, `delete(id)`.
5. THE BookingService (`src/services/bookingService.js`) SHALL export functions: `createBooking(email, flowerId, quantity)`, `getUserBookings(email)`, `cancelBooking(id)`.
6. THE AdminService (`src/services/adminService.js`) SHALL export functions: `getAllBookings()`, `addFlower(data)`, `addCategory(data)`.
7. WHEN any service function receives an HTTP error response, THE service function SHALL re-throw the error so calling components can handle it in their local error state.

---

### Requirement 20: Responsive Design

**User Story:** As a user on any device, I want the application to be fully usable on mobile, tablet, and desktop screens, so that I can book flowers from any device.

#### Acceptance Criteria

1. THE App SHALL implement a mobile-first CSS approach using the 12-column grid for desktop and a 4-column grid for mobile as defined in DESIGN.md.
2. THE Flower Listing page grid SHALL render 4 columns on screens ≥ 1024px, 2 columns on screens ≥ 640px, and 1 column below 640px.
3. THE Navbar SHALL collapse to a hamburger menu on screens < 768px, revealing a full-screen or slide-in drawer.
4. THE Admin data tables SHALL be horizontally scrollable on mobile viewports (< 768px) to preserve column integrity.
5. ALL interactive touch targets (buttons, links, inputs) SHALL have a minimum height and width of 44px to meet WCAG 2.1 AA touch target guidelines.
6. THE hero section font size SHALL scale from 48px (desktop) to 32px (mobile) as defined in the `display-lg-mobile` typography token.
