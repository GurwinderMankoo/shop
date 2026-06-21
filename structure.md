shop/
│
├── app/
│ │
│ ├── (store)/
│ │ │
│ │ ├── products/
│ │ │ ├── page.tsx # Product listing (Server Component)
│ │ │ ├── loading.tsx
│ │ │ ├── error.tsx
│ │ │ │
│ │ │ ├── [slug]/
│ │ │ │ └── page.tsx # Product details
│ │ │ │
│ │ │ └── components/
│ │ │ ├── ProductCard.tsx
│ │ │ ├── ProductGallery.tsx
│ │ │ ├── ProductVariants.tsx
│ │ │ ├── Filters.tsx # Client component
│ │ │ └── Pagination.tsx
│ │ │
│ │ ├── cart/
│ │ │ └── page.tsx
│ │ │
│ │ └── layout.tsx
│ │
│ ├── (admin)/
│ │ │
│ │ ├── admin/
│ │ │ │
│ │ │ ├── products/
│ │ │ │ ├── page.tsx # Admin products
│ │ │ │ ├── new/
│ │ │ │ │ └── page.tsx
│ │ │ │ └── [id]/
│ │ │ │ └── edit/
│ │ │ │ └── page.tsx
│ │ │
│ │ └── layout.tsx
│ │
│ ├── actions/
│ │ │
│ │ ├── product.actions.ts # Product mutations
│ │ ├── cart.actions.ts
│ │ ├── user.actions.ts
│ │ └── order.actions.ts
│ │
│ ├── api/
│ │ │
│ │ ├── upload/
│ │ │ └── route.ts # Image upload
│ │ │
│ │ └── webhook/
│ │ └── route.ts # Payment webhook
│ │
│ ├── layout.tsx
│ └── page.tsx
│
│
├── components/
│ │
│ ├── ui/ # shadcn/ui components
│ │ ├── button.tsx
│ │ ├── input.tsx
│ │ └── dialog.tsx
│ │
│ ├── Navbar.tsx
│ └── Footer.tsx
│
│
├── lib/
│ │
│ ├── prisma.ts # Prisma client
│ │
│ ├── queries/
│ │ ├── products.ts # Product reads
│ │ ├── orders.ts
│ │ └── users.ts
│ │
│ ├── validations/
│ │ ├── product.schema.ts # Zod schemas
│ │ └── user.schema.ts
│ │
│ └── utils.ts
│
│
├── prisma/
│ ├── schema.prisma
│ └── migrations/
│
│
├── types/
│ ├── product.ts
│ └── user.ts
│
├── public/
│ └── images/
│
├── .env
├── package.json
└── tsconfig.json
