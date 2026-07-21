# 🏪 ShopSphere — Project Map

**Stack:** Next.js 16.2.9 (App Router) · React 19.2 · Prisma 6 · SQLite · Tailwind CSS 4 · shadcn/ui · TypeScript 5

---

## 📁 Project Structure Overview

```
shop/
├── app/                          # Next.js App Router pages + API/actions
├── components/                   # React components (UI, shared, layout, home)
├── lib/                          # Server-only utilities (DB, queries, auth, email, validations)
├── types/                        # Shared TypeScript type definitions
├── prisma/                       # Schema, migrations, seed
├── .vscode/                      # Editor settings
├── proxy.ts                      # Next.js middleware for auth-protected routes
├── next.config.ts                # Next.js configuration
├── prisma.config.ts              # Prisma configuration
├── components.json               # shadcn/ui configuration
├── package.json
├── tsconfig.json
└── tailwind.config.ts / postcss.config.mjs
```

---

## 🗺️ Top-Level Files

| File | Purpose |
|------|---------|
| `proxy.ts` | **Auth middleware** — protects routes (`/account`, `/admin`, `/wishlist`, `/checkout`, `/cart`). Redirects unauthenticated users to `/sign-in`. Redirects authenticated users away from `/sign-in`, `/sign-up`. |
| `next.config.ts` | Configures remote image patterns (images.unsplash.com) |
| `prisma.config.ts` | Prisma config with SQLite datasource |
| `components.json` | shadcn/ui component registry config |

---

## 📁 `app/` — Pages & Route Groups

```
app/
├── layout.tsx                    # Root layout — Navbar, Footer, AuthProvider, Toaster
├── page.tsx                      # Homepage — Hero, Categories, Featured Products, Benefits, PromoBanner, Testimonials, Newsletter
├── globals.css                   # Tailwind v4 global styles + shadcn CSS variables
├── not-found.tsx                 # 404 page
├── error.tsx                     # Error boundary
│
├── (store)/                      # Route group — Store-facing pages (no user layout)
│   ├── products/
│   │   ├── page.tsx              # Products listing page — filters, pagination, search, sort
│   │   ├── loading.tsx           # Products skeleton loading state
│   │   ├── [slug]/
│   │   │   ├── page.tsx          # Single product detail page
│   │   │   ├── loading.tsx       # Product detail skeleton
│   │   │   └── _components/
│   │   │       ├── ProductDetails.tsx    # Product info, price, variant selection, add-to-cart
│   │   │       └── VariantOptions.tsx    # Variant selector UI
│   │   └── _components/
│   │       ├── ProductCard.tsx           # Product card grid item
│   │       ├── ProductCardSkeleton.tsx   # Card skeleton
│   │       ├── ProductFilters.tsx        # Filter sidebar UI
│   │       ├── ProductFilterContent.tsx  # Filter content (accordion)
│   │       ├── ProductGallery.tsx        # Image gallery/lightbox
│   │       ├── ProductAddToCartButton.tsx # Add-to-cart button with loading state
│   │       └── ProductWishlistButton.tsx # Wishlist toggle button (optimistic updates)
│   └── categories/
│       └── page.tsx              # Categories listing page
│
├── (user)/                       # Route group — User pages (require auth)
│   ├── cart/
│   │   ├── page.tsx              # Cart page — items list, summary, checkout
│   │   └── _components/
│   │       ├── CartItem.tsx              # Individual cart item row
│   │       ├── CartSummary.tsx           # Cart totals sidebar
│   │       ├── CartQuantityButtons.tsx   # +/- quantity controls
│   │       ├── RemoveCartButton.tsx      # Remove item button
│   │       └── EmptyCart.tsx             # Empty cart state
│   ├── wishlist/
│   │   ├── page.tsx              # Wishlist page
│   │   └── _components/
│   │       └── EmptyWishlist.tsx         # Empty wishlist state
│   └── account/
│       ├── layout.tsx            # Account layout — sidebar nav (desktop + mobile)
│       ├── profile/
│       │   ├── page.tsx          # Profile display page
│       │   └── edit/
│       │       ├── page.tsx              # Edit profile page
│       │       └── _EditProfileForm.tsx  # Profile edit form (useActionState)
│       ├── orders/
│       │   ├── page.tsx          # Orders page
│       │   └── _EmptyState.tsx           # Empty orders state
│       ├── settings/
│       │   ├── page.tsx          # Settings page
│       │   ├── email/
│       │   │   ├── page.tsx              # Change email page
│       │   │   └── _EmailEditForm.tsx    # Email edit form
│       │   └── update-password/
│       │       ├── page.tsx              # Update password page
│       │       └── _UpdatePasswordForm.tsx # Password update form
│       └── _components/
│           ├── navLinks.ts               # Account nav link definitions
│           ├── DesktopNavbar.tsx          # Desktop sidebar nav
│           └── MobileNavbar.tsx           # Mobile bottom nav
│
├── @modal/                       # Parallel route — modals
│   ├── (.)sign-in/
│   │   └── page.tsx              # Sign-in modal (intercepted from /sign-in)
│   └── default.tsx               # Default modal fallback
│
├── sign-in/
│   ├── page.tsx                  # Sign-in page
│   └── _SignIn.tsx               # Sign-in form component (useActionState)
├── sign-up/
│   ├── page.tsx                  # Sign-up page
│   └── _SignUp.tsx               # Sign-up form component
├── verify-email/
│   └── page.tsx                  # Email verification page (handles token from URL)
│
└── actions/                      # Server Actions
    ├── signin.action.ts          # Sign-in — validates credentials, creates session
    ├── signup.actions.ts         # Sign-up — creates user, sends verification email
    ├── logout.action.ts          # Logout — deletes session cookie
    ├── verifyEmail.ts            # Verify email token (transactional, prevents replay)
    ├── updateCart.ts             # Add/remove items from cart
    ├── updateWishlist.ts         # Add/remove items from wishlist
    ├── updateEmail.ts            # Request email change (sends verification)
    ├── updateProfile.ts          # Update first/last name
    ├── updatePassword.ts         # Change password (validates current password)
    └── getUser.ts                # Get current user data (client-safe)
```

---

## 📁 `components/` — React Components

```
components/
├── ui/                           # shadcn/ui primitives
│   ├── button.tsx, input.tsx, label.tsx, card.tsx, badge.tsx
│   ├── avatar.tsx, skeleton.tsx, separator.tsx
│   ├── select.tsx, radio-group.tsx, toggle.tsx, toggle-group.tsx
│   ├── dialog.tsx, sheet.tsx, dropdown-menu.tsx
│   ├── pagination.tsx, sonner.tsx (toast notifications)
│   └── ...other UI primitives
│
├── layout/                       # Layout components
│   ├── Navbar.tsx                # Main navigation bar (desktop + mobile responsive)
│   ├── MobileNav.tsx             # Mobile drawer menu
│   ├── Footer.tsx                # Site footer
│   ├── UserMenu.tsx              # User dropdown menu (desktop)
│   ├── UserMenuMobile.tsx        # User menu in mobile drawer
│   └── _CartButton.tsx           # Cart button with item count badge
│
├── home/                         # Homepage sections
│   ├── Hero.tsx                  # Hero banner
│   ├── Categories.tsx            # Categories grid
│   ├── FeaturedProducts.tsx      # Featured products carousel/grid
│   ├── Benefits.tsx              # Benefits/features grid
│   ├── PromoBanner.tsx           # Promotional banner
│   ├── Testimonial.tsx           # Testimonials carousel
│   └── NewsLetter.tsx            # Newsletter signup
│
├── shared/                       # Shared/reusable components
│   ├── Headers.tsx               # Section title + description
│   ├── SignInUpCard.tsx          # Sign-in/sign-up card wrapper
│   ├── SubmitButton.tsx          # Form submit button with loading state
│   ├── InputField.tsx            # Form input with label + error
│   ├── CustomSelect.tsx          # Form select wrapper
│   ├── PasswordInput.tsx         # Password input with show/hide toggle
│   ├── Error.tsx                 # Error messages display
│   ├── Breadcrumb.tsx            # Breadcrumb navigation
│   ├── DiscountBadge.tsx         # Price discount badge
│   ├── UserAvatar.tsx            # User avatar with initials fallback
│   ├── UserDetails.tsx           # User info display
│   ├── ProductSearch.tsx         # Search input with results
│   ├── CustomPagination.tsx      # Pagination component
│   └── categories/
│       └── CategoryCard.tsx      # Category card
│
└── Provider/
    └── AuthProvider.tsx          # Auth context provider (user state to client)
```

---

## 📁 `lib/` — Server-Only Logic

```
lib/
├── prisma.ts                     # Prisma client singleton (cached in globalThis)
├── resend.ts                     # Resend email client singleton
├── helper.ts                     # Utility: formatCurrency(), formatLastChanged()
├── utils.ts                      # Utility: cn() classname merger
│
├── queries/                      # Database query functions
│   ├── products.ts               # getProducts() (paginated, filtered, sorted), getProduct()
│   ├── categories.ts             # getCategories() (cached with unstable_cache)
│   ├── getCurrentUser.ts         # Get authenticated user from session cookie
│   ├── session.ts                # createSession() — creates session record + sets cookie
│   ├── getCart.ts                # getCart() — cart items + summary, getCartItemsCount()
│   └── getWishlist.ts            # getWishlist() — user's wishlist with product details
│
├── auth/                         # Auth utilities
│   ├── createVerificationToken.ts # Creates UUID token, stores in DB with 5min expiry
│   └── sendEmail.ts             # Sends verification email via Resend
│
└── validations/
    └── auth.schema.ts            # Zod schemas: register, signin, verifyEmail, updatePassword, updateProfile, TokenSchema
```

---

## 📁 `types/` — TypeScript Types

| File | Exports |
|------|---------|
| `products.ts` | `Product`, `ProductVariant`, `ProductImage`, `ProductOption`, `ProductOptionValue`, `ProductVariantOptionValue`, `Category` |
| `form.type.ts` | `FormErrors<T>`, `FormState<T>` (generic form state with success, errors, values, user) |
| `signin.types.ts` | `SigninFormValues`, `SigninFormState` |
| `signup.type.ts` | `SignupFormValues`, `SignupFormState` |
| `user.ts` | (empty — user types derived from Prisma) |

---

## 📁 `prisma/` — Database Schema & Migrations

```
prisma/
├── schema.prisma                 # Full schema (SQLite)
├── migrations/                   # 8 migration files
│   ├── 20260623134321_init/       # Initial schema
│   ├── 20260624163347_create_user/ # User model
│   ├── 20260624170254_password/   # Password field
│   ├── 20260625154126_verification_token/ # Verification tokens
│   ├── 20260626164531_pending_email/ # Pending email field
│   ├── 20260627044611_verified_email/ # Email verified flag
│   ├── 20260628044300_wishlist/   # Wishlist model
│   ├── 20260628161850_cart_updated/ # Cart model
│   └── 20260701083605_new_product/ # Product schema restructure
├── seed.ts                       # Database seed script (prisma/seed.ts)
└── dev.db                        # SQLite development database
```

### Database Models

| Model | Key Fields | Relations |
|-------|-----------|-----------|
| **User** | id, email, password, firstName, lastName, role, emailVerified, pendingEmail | → Session, VerificationTokens, Wishlist, Cart |
| **Session** | id, token, expiresAt, userId | → User |
| **VerificationTokens** | id, token, expiresAt, userId | → User |
| **Product** | id, name, slug, description, imageUrl, isActive, minPrice, categoryId | → Category, ProductImage, ProductVariant, ProductOption, Wishlist |
| **Category** | id, name, slug, description, imageUrl, isActive | → Product |
| **ProductImage** | id, url, altText, productId | → Product |
| **ProductVariant** | id, name, sku, price, comparePrice, stock, productId | → Product, ProductVariantOptionValue, Cart |
| **ProductOption** | id, name, productId | → Product, ProductOptionValue |
| **ProductOptionValue** | id, value, optionId | → ProductOption, ProductVariantOptionValue |
| **ProductVariantOptionValue** | variantId, optionValueId (composite PK) | → ProductVariant, ProductOptionValue |
| **Wishlist** | id, productId, userId (unique together) | → User, Product |
| **Cart** | id, userId, variantId, quantity (unique together) | → User, ProductVariant |

---

## 🔐 Auth Flow

```
1. Sign Up → validates via Zod → bcrypt hash → create User → create VerificationToken → send email with Resend
2. Verify Email → token verified in transaction (prevents replay) → mark emailVerified = true
3. Sign In → validate credentials → check emailVerified → create Session (cookie) → redirect
4. Middleware (proxy.ts) → checks session cookie on protected routes → redirects to /sign-in if missing
5. Logout → delete session from DB → delete cookie
```

## 🛒 Cart Flow

```
1. User clicks "Add to Cart" → ProductAddToCartButton calls addToCart(variantId, quantity)
2. Server Action: getCurrentUser → check variant stock → upsert Cart record (userId + variantId unique)
3. Cart page → getCart() queries all cart items with variant + product info → calculates subtotal/shipping/tax
```

## ⭐ Wishlist Flow

```
1. User clicks heart icon → ProductWishlistButton calls addProductWishlist() or removeProductWishlist()
2. Optimistic UI update (instant toggle) → network request in useTransition → revert on error
3. Wishlist page → getWishlist() queries all wishlist items with full product details
```

---

## 🧰 Key Dependencies

| Package | Purpose |
|---------|---------|
| next 16 | React framework (App Router) |
| react 19 | UI library |
| @prisma/client + prisma | ORM + SQLite |
| bcryptjs | Password hashing |
| resend | Transactional email |
| zod | Schema validation |
| lucide-react | Icon library |
| sonner | Toast notifications |
| shadcn/ui + radix-ui | UI component primitives |
| tailwindcss v4 | Utility CSS |
| class-variance-authority | Component variants |
| tailwind-merge + clsx | Classname utilities |
