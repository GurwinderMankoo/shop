import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CreateManyData = {
  data: {
    name: string;
    slug: string;
    description: string;
  }[];
  skipDuplicates: boolean;
};

async function main() {
  // =====================
  // 1. Create Categories
  // =====================

  await prisma.category.createMany({
    data: [
      {
        name: "Electronics",
        slug: "electronics",
        description: "Latest gadgets, devices, and electronic accessories.",
        imageUrl:
          "https://images.unsplash.com/photo-1498049794561-7780e7231661",
        isActive: true,
      },
      {
        name: "Fashion",
        slug: "fashion",
        description: "Trendy clothing, footwear, and fashion accessories.",
        imageUrl:
          "https://images.unsplash.com/photo-1445205170230-053b83016050",
        isActive: true,
      },
      {
        name: "Home & Living",
        slug: "home-living",
        description: "Furniture, decor, and essentials for your home.",
        imageUrl:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
        isActive: true,
      },
      {
        name: "Sports & Fitness",
        slug: "sports-fitness",
        description: "Sports equipment, fitness gear, and accessories.",
        imageUrl:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
        isActive: true,
      },
      {
        name: "Beauty & Personal Care",
        slug: "beauty-personal-care",
        description: "Skincare, cosmetics, and personal care products.",
        imageUrl:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
        isActive: true,
      },
    ],
  });

  // =====================
  // 2. Get Categories
  // =====================

  const categories = await prisma.category.findMany();

  // --------------------
  // Categories
  // --------------------

  const electronics = await prisma.category.findUnique({
    where: { slug: "electronics" },
  });

  const fashion = await prisma.category.findUnique({
    where: { slug: "fashion" },
  });

  const home = await prisma.category.findUnique({
    where: { slug: "home-living" },
  });

  const sports = await prisma.category.findUnique({
    where: { slug: "sports-fitness" },
  });

  const beauty = await prisma.category.findUnique({
    where: { slug: "beauty-personal-care" },
  });

  const products = [
    {
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "Premium noise cancelling wireless headphones",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      categoryId: electronics?.id,

      variants: [
        {
          name: "Black",
          sku: "HEAD-BLK",
          price: 4999,
          stock: 50,
          options: [
            {
              name: "Color",
              value: "Black",
            },
          ],
        },
      ],
    },

    {
      name: "Smart Watch",
      slug: "smart-watch",
      description: "Fitness tracking smart watch",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics?.id,

      variants: [
        {
          name: "Silver",
          sku: "WATCH-SIL",
          price: 7999,
          stock: 30,
          options: [
            {
              name: "Color",
              value: "Silver",
            },
          ],
        },
      ],
    },

    {
      name: "Gaming Mouse",
      slug: "gaming-mouse",
      description: "RGB gaming mouse",
      imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db",
      categoryId: electronics?.id,

      variants: [
        {
          name: "RGB",
          sku: "MOUSE-RGB",
          price: 2499,
          stock: 80,
          options: [
            {
              name: "Light",
              value: "RGB",
            },
          ],
        },
      ],
    },

    {
      name: "Mechanical Keyboard",
      slug: "mechanical-keyboard",
      description: "Mechanical gaming keyboard",
      imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
      categoryId: electronics?.id,

      variants: [
        {
          name: "Blue Switch",
          sku: "KEY-BLUE",
          price: 5999,
          stock: 40,
          options: [
            {
              name: "Switch",
              value: "Blue",
            },
          ],
        },
      ],
    },

    {
      name: "Cotton T Shirt",
      slug: "cotton-t-shirt",
      description: "Comfortable cotton t-shirt",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      categoryId: fashion?.id,

      variants: [
        {
          name: "Black Large",
          sku: "TSHIRT-BLK-L",
          price: 799,
          stock: 100,
          options: [
            {
              name: "Size",
              value: "L",
            },
          ],
        },
      ],
    },

    {
      name: "Running Shoes",
      slug: "running-shoes",
      description: "Lightweight running shoes",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      categoryId: fashion?.id,

      variants: [
        {
          name: "Red Size 9",
          sku: "SHOE-RED-9",
          price: 4999,
          stock: 60,
          options: [
            {
              name: "Size",
              value: "9",
            },
          ],
        },
      ],
    },

    {
      name: "Leather Wallet",
      slug: "leather-wallet",
      description: "Premium leather wallet",
      imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93",
      categoryId: fashion?.id,

      variants: [
        {
          name: "Brown",
          sku: "WALLET-BRN",
          price: 1499,
          stock: 70,
          options: [
            {
              name: "Color",
              value: "Brown",
            },
          ],
        },
      ],
    },

    {
      name: "Office Chair",
      slug: "office-chair",
      description: "Ergonomic office chair",
      imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
      categoryId: home?.id,

      variants: [
        {
          name: "Black",
          sku: "CHAIR-BLK",
          price: 12999,
          stock: 20,
          options: [
            {
              name: "Color",
              value: "Black",
            },
          ],
        },
      ],
    },

    {
      name: "Table Lamp",
      slug: "table-lamp",
      description: "Modern home lamp",
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
      categoryId: home?.id,

      variants: [
        {
          name: "White",
          sku: "LAMP-WHT",
          price: 2999,
          stock: 35,
          options: [
            {
              name: "Color",
              value: "White",
            },
          ],
        },
      ],
    },

    {
      name: "Coffee Maker",
      slug: "coffee-maker",
      description: "Automatic coffee maker",
      imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
      categoryId: home?.id,

      variants: [
        {
          name: "Classic",
          sku: "COFFEE-01",
          price: 6999,
          stock: 25,
          options: [],
        },
      ],
    },

    {
      name: "Yoga Mat",
      slug: "yoga-mat",
      description: "Premium yoga mat",
      imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
      categoryId: sports?.id,

      variants: [
        {
          name: "Blue",
          sku: "YOGA-BLU",
          price: 999,
          stock: 90,
          options: [
            {
              name: "Color",
              value: "Blue",
            },
          ],
        },
      ],
    },

    {
      name: "Dumbbell Set",
      slug: "dumbbell-set",
      description: "Home workout dumbbells",
      imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
      categoryId: sports?.id,

      variants: [
        {
          name: "20kg",
          sku: "DUMB-20",
          price: 4999,
          stock: 15,
          options: [],
        },
      ],
    },

    {
      name: "Face Cream",
      slug: "face-cream",
      description: "Hydrating skincare cream",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
      categoryId: beauty?.id,

      variants: [
        {
          name: "100ml",
          sku: "CREAM-100",
          price: 1299,
          stock: 50,
          options: [],
        },
      ],
    },

    {
      name: "Perfume",
      slug: "perfume",
      description: "Long lasting perfume",
      imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601",
      categoryId: beauty?.id,

      variants: [
        {
          name: "50ml",
          sku: "PERF-50",
          price: 3999,
          stock: 40,
          options: [],
        },
      ],
    },

    {
      name: "Hair Dryer",
      slug: "hair-dryer",
      description: "Professional hair dryer",
      imageUrl: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da",
      categoryId: beauty?.id,

      variants: [
        {
          name: "Black",
          sku: "DRY-BLK",
          price: 3499,
          stock: 30,
          options: [
            {
              name: "Color",
              value: "Black",
            },
          ],
        },
      ],
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,

        variants: {
          create: product.variants.map((v) => ({
            name: v.name,
            sku: v.sku,
            price: v.price,
            stock: v.stock,

            options: {
              create: v.options,
            },
          })),
        },
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seed completed");
  })
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect();
  });
