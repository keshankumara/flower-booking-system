# Botanical Elegance — Navigation Walkthrough

## Application URL
```
http://localhost:5173
```
Start the app:
```bash
cd frontend
npm run dev
```
Backend must be running on `http://localhost:8080`.

---

## User Roles

| Role    | Access                                              |
|---------|-----------------------------------------------------|
| Guest   | Home, Flowers, Flower Details, Login, Register       |
| User    | All guest pages + Cart, Checkout, My Orders         |
| Admin   | All pages + Admin Dashboard, Flowers, Categories, Bookings |

---

## Guest Navigation (Not Logged In)

### 1. Home Page
```
http://localhost:5173/
```
- Hero section with "Shop Flowers" → navigates to `/flowers`
- "Browse by Category" chips → navigates to `/flowers?category={id}`
- Featured flower cards → "View Details" → navigates to `/flowers/:id`
- "Get Started Free" banner → navigates to `/register`
- Navbar: **Home**, **Flowers**, **Sign in**, **Get started**

---

### 2. Flower Listing
```
http://localhost:5173/flowers
```
- Left sidebar: search, category filter, price range filter
- On mobile: tap the **Filters** button (top-left) to open the drawer
- Flower grid with "Add to Cart" (circle +) and hover quick-add
- Click any card → navigates to `/flowers/:id`

---

### 3. Flower Details
```
http://localhost:5173/flowers/1
```
- Breadcrumb: Home / Flowers / {Flower Name}
- Quantity selector (−/+), total price updates live
- **Book Now** → adds to cart and navigates to `/checkout` (redirects to `/login` if not authenticated)
- **Add to Cart** → adds to cart, stays on page
- **← Back to all flowers** → navigates to `/flowers`

---

### 4. Login
```
http://localhost:5173/login
```
- Email + password inputs
- Submit → POST `/api/auth/login` → JWT stored → redirects to `/` (or previous protected page)
- "Create one free" link → `/register`

**Test credentials (after seeding backend):**
```
Email:    user@example.com
Password: password123
```

---

### 5. Register
```
http://localhost:5173/register
```
- Name, email, password, confirm password
- Submit → POST `/api/auth/register` → redirects to `/login` with success message
- "Sign in" link → `/login`

---

## Authenticated User Navigation

After logging in, the Navbar shows:
- **👤 {FirstName}** dropdown → My Orders, Logout
- Cart icon with item count badge

---

### 6. Cart
```
http://localhost:5173/cart
```
- Lists all cart items (image, name, quantity stepper, subtotal)
- Order summary sidebar: item lines, total, "Proceed to Checkout →"
- Unauthenticated checkout click → redirects to `/login` preserving `/checkout` destination
- "← Continue shopping" → `/flowers`
- Empty state: "Browse Flowers" button

---

### 7. Checkout
```
http://localhost:5173/checkout
```
- Only accessible when cart has items (redirects to `/cart` if empty)
- Progress indicator: Cart ✓ → **Review & Confirm** → Confirmation
- Shows order items (left) + price summary panel (right)
- Email field (read-only, from logged-in user)
- **Place Order** → POST `/api/bookings` for each item → clears cart → navigates to `/orders`
- "← Edit cart" → `/cart`

---

### 8. My Orders
```
http://localhost:5173/orders
```
- Table: Order #, Flower, Qty, Total, Date, Status, Action
- Status badges: 🟡 Pending, 🟢 Confirmed, 🔴 Cancelled
- PENDING orders show a **Cancel** button → PUT `/api/bookings/cancel/{id}` → updates in-place
- Empty state: "Browse Flowers" button

---

## Admin Navigation

Login with an admin account:
```
Email:    admin@example.com
Password: admin123
```

After login, Navbar shows an **Admin** link in the center nav and "Admin Panel" in the user dropdown.

The admin area uses a separate layout — dark sidebar + top bar, no public Navbar/Footer.

---

### 9. Admin Dashboard
```
http://localhost:5173/admin/dashboard
```
- 3 stat cards: Total Flowers, Total Categories, Total Bookings
- Recent bookings table (last 5, sortable by total)
- Sidebar links: Dashboard, Manage Flowers, Categories, Bookings

---

### 10. Manage Flowers
```
http://localhost:5173/admin/flowers
```
- Data table: ID, Image, Name, Category, Price, Stock, Actions
- **+ Add Flower** → modal form (name, description, price, stock, image URL, category)
- **Edit** → pre-filled modal → PUT `/api/flowers/{id}`
- **Delete** → confirmation dialog → DELETE `/api/flowers/{id}`
- Toast notifications on success/error

---

### 11. Manage Categories
```
http://localhost:5173/admin/categories
```
- Data table: ID, Name, Description, Actions
- **+ Add Category** → modal (name, description)
- **Edit** → pre-filled modal → PUT `/api/categories/{id}`
- **Delete** → confirmation dialog → DELETE `/api/categories/{id}`

---

### 12. Manage Bookings
```
http://localhost:5173/admin/bookings
```
- Full bookings table: #, Customer, Flower, Qty, Total, Date, Status
- Status filter chips: **ALL** | **PENDING** | **CONFIRMED** | **CANCELLED**
- Sortable columns: Total (↑↓), Date (↑↓)
- Read-only view (no edit/delete — status changes come from booking service)

---

## Route Protection Summary

| Route                    | Guard          | Redirect if fails     |
|--------------------------|----------------|-----------------------|
| `/cart`                  | ProtectedRoute | `/login`              |
| `/checkout`              | ProtectedRoute | `/login`              |
| `/orders`                | ProtectedRoute | `/login`              |
| `/admin/*`               | AdminRoute     | `/login` or `/`       |
| All others               | Public         | —                     |

- `ProtectedRoute` — redirects to `/login` and preserves the intended destination in `location.state.from`
- `AdminRoute` — unauthenticated → `/login`, authenticated non-admin → `/`

---

## Cart Persistence

The cart is stored in `localStorage` under the key `botanical_cart`. It survives page refreshes and browser restarts. It is cleared when:
- An order is successfully placed (Checkout → Place Order)
- The user manually removes all items

---

## 404 Page

Any unknown URL renders the 404 page:
```
http://localhost:5173/anything-unknown
```
Buttons: **Back to Home**, **Go Back**
