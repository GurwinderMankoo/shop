import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  categoryId?: string;

  images: {
    url: string;
    altText: string;
  }[];

  options: {
    name: string;
    values: string[];
  }[];

  variants: {
    name: string;
    sku: string;
    price: number;
    comparePrice: number;
    stock: number;

    optionValues: {
      name: string;
      value: string;
    }[];
  }[];
};

async function main() {

  await prisma.productOptionValue.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
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
    // --- EXISTING PRODUCTS ---
    {
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "Premium noise cancelling wireless headphones",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      categoryId: electronics?.id,
      images: [
        { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", altText: "Headphones front" },
        { url: "https://images.unsplash.com/photo-1484704849700-f032a568e944", altText: "Headphones side" },
        { url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b", altText: "Headphones closeup" },
      ],
      options: [
        { name: "Color", values: ["Black", "White"] },
        { name: "Connectivity", values: ["Wired", "Bluetooth"] },
      ],
      variants: [
        {
          name: "Black - Wired",
          sku: "HEAD-BLK-WRD",
          price: 3999,
          comparePrice: 4999,
          stock: 50,
          optionValues: [
            { name: "Color", value: "Black" },
            { name: "Connectivity", value: "Wired" },],
        },
        {
          name: "Black - Bluetooth",
          sku: "HEAD-BLK-BLT",
          price: 5499,
          comparePrice: 6999,
          stock: 50,
          optionValues: [
            { name: "Color", value: "Black" },
            { name: "Connectivity", value: "Bluetooth" },],
        },
        {
          name: "White - Wired",
          sku: "HEAD-WHT-WRD",
          price: 5499,
          comparePrice: 6999,
          stock: 50,
          optionValues: [
            { name: "Color", value: "White" },
            { name: "Connectivity", value: "Wired" },],
        },
        {
          name: "White - Bluetooth",
          sku: "HEAD-WHT-BLT",
          price: 5499,
          comparePrice: 6999,
          stock: 30,
          optionValues: [
            { name: "Color", value: "White" },
            { name: "Connectivity", value: "Bluetooth" },
          ]
        }
      ],
    },
    {
      name: "Smart Watch",
      slug: "smart-watch",
      description: "Fitness tracking smart watch",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          altText: "Smart watch",
        },
        {
          url: "https://images.unsplash.com/photo-1508685096489-7aacd7a91f4f",
          altText: "Watch display",
        },
      ],

      options: [
        {
          name: "Color",
          values: ["Silver", "Black"],
        },
        {
          name: "Size",
          values: ["42mm", "46mm"],
        },
      ],

      variants: [
        {
          name: "Silver - 42mm",
          sku: "WATCH-SIL-42",
          price: 7999,
          comparePrice: 9999,
          stock: 30,
          optionValues: [
            {
              name: "Color",
              value: "Silver",
            },
            {
              name: "Size",
              value: "42mm",
            },
          ],
        },
        {
          name: "Black - 46mm",
          sku: "WATCH-BLK-46",
          price: 8999,
          comparePrice: 10999,
          stock: 20,
          optionValues: [
            {
              name: "Color",
              value: "Black",
            },
            {
              name: "Size",
              value: "46mm",
            },
          ],
        },
      ],
    },

    {
      name: "Cotton T Shirt",
      slug: "cotton-t-shirt",
      description: "Comfortable premium cotton tshirt",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      categoryId: fashion?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
          altText: "T shirt",
        },
        {
          url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
          altText: "T shirt model",
        },
      ],

      options: [
        {
          name: "Color",
          values: ["Black", "White", "Blue"],
        },
        {
          name: "Size",
          values: ["Medium", "Large", "XL"],
        },
      ],

      variants: [
        {
          name: "Black - Large",
          sku: "TS-BLK-L",
          price: 799,
          comparePrice: 1299,
          stock: 100,
          optionValues: [
            {
              name: "Color",
              value: "Black",
            },
            {
              name: "Size",
              value: "Large",
            },
          ],
        },
        {
          name: "White - Medium",
          sku: "TS-WHT-M",
          price: 699,
          comparePrice: 1199,
          stock: 80,
          optionValues: [
            {
              name: "Color",
              value: "White",
            },
            {
              name: "Size",
              value: "Medium",
            },
          ],
        },
        {
          name: "Blue - XL",
          sku: "TS-BLU-XL",
          price: 899,
          comparePrice: 1399,
          stock: 60,
          optionValues: [
            {
              name: "Color",
              value: "Blue",
            },
            {
              name: "Size",
              value: "XL",
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
      images: [
        {
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          altText: "Running shoes",
        },
        {
          url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
          altText: "Shoes",
        },
      ],

      options: [
        {
          name: "Color",
          values: ["Red", "Black"],
        },
        {
          name: "Size",
          values: ["9", "10"],
        },
      ],

      variants: [
        {
          name: "Red - Size 9",
          sku: "SHOE-RED-9",
          price: 4999,
          comparePrice: 6999,
          stock: 40,
          optionValues: [
            {
              name: "Color",
              value: "Red",
            },
            {
              name: "Size",
              value: "9",
            },
          ],
        },
        {
          name: "Black - Size 10",
          sku: "SHOE-BLK-10",
          price: 5299,
          comparePrice: 7499,
          stock: 35,
          optionValues: [
            {
              name: "Color",
              value: "Black",
            },
            {
              name: "Size",
              value: "10",
            },
          ],
        },
      ],
    },

    // --- 10 NEW SEED PRODUCTS ---

    // Electronics
    {
      name: "Mechanical Gaming Keyboard",
      slug: "mechanical-gaming-keyboard",
      description: "Tactile RGB mechanical keyboard with customizable switches.",
      imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
      categoryId: electronics?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
          altText: "Keyboard Top View",
        },
        {
          url: "https://images.unsplash.com/photo-1595225476474-87563907a212",
          altText: "Keyboard RGB Glow",
        },
      ],

      options: [
        {
          name: "Switch Type",
          values: ["Red (Linear)", "Blue (Clicky)"],
        },
        {
          name: "Backlight",
          values: ["RGB"],
        },
      ],

      variants: [
        {
          name: "Red (Linear) - RGB",
          sku: "KEY-RED-RGB",
          price: 3499,
          comparePrice: 4500,
          stock: 45,
          optionValues: [
            {
              name: "Switch Type",
              value: "Red (Linear)",
            },
            {
              name: "Backlight",
              value: "RGB",
            },
          ],
        },
        {
          name: "Blue (Clicky) - RGB",
          sku: "KEY-BLU-RGB",
          price: 3699,
          comparePrice: 4700,
          stock: 25,
          optionValues: [
            {
              name: "Switch Type",
              value: "Blue (Clicky)",
            },
            {
              name: "Backlight",
              value: "RGB",
            },
          ],
        },
      ],
    },
    {
      name: "4K Ultra HD Action Camera",
      slug: "4k-action-camera",
      description: "Waterproof action camera for crystal clear outdoor recordings.",
      imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      categoryId: electronics?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
          altText: "Action Camera Front View",
        },
        {
          url: "https://images.unsplash.com/photo-1484788984921-03950022c9ef",
          altText: "Action Camera Outdoor Mount",
        },
      ],

      options: [
        {
          name: "Bundle",
          values: ["Standard", "Adventure Pack"],
        },
      ],

      variants: [
        {
          name: "Standard Bundle",
          sku: "CAM-4K-STD",
          price: 8999,
          comparePrice: 11999,
          stock: 15,
          optionValues: [
            {
              name: "Bundle",
              value: "Standard",
            },
          ],
        },
        {
          name: "Adventure Pack",
          sku: "CAM-4K-ADV",
          price: 10499,
          comparePrice: 13999,
          stock: 20,
          optionValues: [
            {
              name: "Bundle",
              value: "Adventure Pack",
            },
          ],
        },
      ],
    },

    // Fashion
    {
      name: "Denim Jacket",
      slug: "denim-jacket",
      description: "Classic rugged denim jacket perfect for layering.",
      imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0",
      categoryId: fashion?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0",
          altText: "Blue Denim Jacket",
        },
        {
          url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e",
          altText: "Black Denim Jacket",
        },
      ],

      options: [
        {
          name: "Color",
          values: ["Classic Blue", "Washed Black"],
        },
        {
          name: "Size",
          values: ["Medium", "Large"],
        },
      ],

      variants: [
        {
          name: "Classic Blue - Medium",
          sku: "DEN-BLU-M",
          price: 2499,
          comparePrice: 3499,
          stock: 30,
          optionValues: [
            {
              name: "Color",
              value: "Classic Blue",
            },
            {
              name: "Size",
              value: "Medium",
            },
          ],
        },
        {
          name: "Washed Black - Large",
          sku: "DEN-BLK-L",
          price: 2699,
          comparePrice: 3699,
          stock: 25,
          optionValues: [
            {
              name: "Color",
              value: "Washed Black",
            },
            {
              name: "Size",
              value: "Large",
            },
          ],
        },
      ],
    },

    // Home & Living
    {
      name: "Scented Soy Candle Set",
      slug: "scented-soy-candle-set",
      description: "Relaxing hand-poured soy wax candles infused with natural essential oils.",
      imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59",
      categoryId: home?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1603006905003-be475563bc59",
          altText: "Candles Lit",
        },
        {
          url: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed",
          altText: "Candle Gift Box",
        },
      ],

      options: [
        {
          name: "Scent Profile",
          values: ["Calming", "Energizing"],
        },
      ],

      variants: [
        {
          name: "Calming",
          sku: "CNDL-LAV-VAN",
          price: 899,
          comparePrice: 1499,
          stock: 60,
          optionValues: [
            {
              name: "Scent Profile",
              value: "Calming",
            },
          ],
        },
        {
          name: "Energizing",
          sku: "CNDL-SND-CTR",
          price: 899,
          comparePrice: 1499,
          stock: 45,
          optionValues: [
            {
              name: "Scent Profile",
              value: "Energizing",
            },
          ],
        },
      ],
    },
    {
      name: "Ergonomic Office Chair",
      slug: "ergonomic-office-chair",
      description: "High-back mesh office chair with lumbar support and adjustable armrests.",
      imageUrl: "https://images.unsplash.com/photo-1505797149-43b0069ec26b",
      categoryId: home?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1505797149-43b0069ec26b",
          altText: "Office Chair Profile",
        },
        {
          url: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27",
          altText: "Chair Mesh Detail",
        },
      ],

      options: [
        {
          name: "Color",
          values: ["Black", "Grey"],
        },
      ],

      variants: [
        {
          name: "Black",
          sku: "CHR-ERG-BLK",
          price: 12499,
          comparePrice: 17999,
          stock: 15,
          optionValues: [
            {
              name: "Color",
              value: "Black",
            },
          ],
        },
        {
          name: "Grey",
          sku: "CHR-ERG-GRY",
          price: 12999,
          comparePrice: 18499,
          stock: 12,
          optionValues: [
            {
              name: "Color",
              value: "Grey",
            },
          ],
        },
      ],
    },
    {
      name: "Ceramic Coffee Mug",
      slug: "ceramic-coffee-mug",
      description: "Minimalist handmade ceramic mug.",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
      categoryId: home?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
          altText: "Mug on Desk",
        },
        {
          url: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18",
          altText: "Mugs Array",
        },
      ],

      options: [
        {
          name: "Color",
          values: ["Matte White", "Terracotta"],
        },
        {
          name: "Capacity",
          values: ["350ml", "450ml"],
        },
      ],

      variants: [
        {
          name: "Matte White - 350ml",
          sku: "MUG-WHT-350",
          price: 499,
          comparePrice: 799,
          stock: 120,
          optionValues: [
            {
              name: "Color",
              value: "Matte White",
            },
            {
              name: "Capacity",
              value: "350ml",
            },
          ],
        },
        {
          name: "Terracotta - 450ml",
          sku: "MUG-TER-450",
          price: 599,
          comparePrice: 899,
          stock: 90,
          optionValues: [
            {
              name: "Color",
              value: "Terracotta",
            },
            {
              name: "Capacity",
              value: "450ml",
            },
          ],
        },
      ],
    },

    // Sports & Fitness
    {
      name: "Stainless Steel Shaker Bottle",
      slug: "steel-shaker-bottle",
      description:
        "Double-wall insulated 304 stainless steel shaker bottle with leak-proof flip lid, built-in whisk ball for clump-free mixes, and measurement markings. BPA-free and odor-resistant — ideal for protein shakes, pre-workout, and smoothies.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      categoryId: sports?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
          altText: "Stainless steel shaker bottle product shot",
        },
        {
          url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
          altText: "Shaker bottle in gym environment",
        },
      ],

      options: [
        {
          name: "Finish",
          values: ["Stainless Silver", "Matte Black"],
        },
        {
          name: "Capacity",
          values: ["500ml", "750ml"],
        },
      ],

      variants: [
        {
          name: "Stainless Silver - 500ml",
          sku: "SHK-STEEL-SLV-500",
          price: 1199,
          comparePrice: 1899,
          stock: 70,
          optionValues: [
            {
              name: "Finish",
              value: "Stainless Silver",
            },
            {
              name: "Capacity",
              value: "500ml",
            },
          ],
        },
        {
          name: "Matte Black - 500ml",
          sku: "SHK-STEEL-BLK-500",
          price: 1299,
          comparePrice: 1999,
          stock: 85,
          optionValues: [
            {
              name: "Finish",
              value: "Matte Black",
            },
            {
              name: "Capacity",
              value: "500ml",
            },
          ],
        },
        {
          name: "Matte Black - 750ml",
          sku: "SHK-STEEL-BLK-750",
          price: 1499,
          comparePrice: 2299,
          stock: 50,
          optionValues: [
            {
              name: "Finish",
              value: "Matte Black",
            },
            {
              name: "Capacity",
              value: "750ml",
            },
          ],
        },
      ],
    },
    {
      name: "Non-Slip Yoga Mat",
      slug: "yoga-mat-eco",
      description: "Eco-friendly, thick cushioning mat with alignment lines.",
      imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
      categoryId: sports?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
          altText: "Rolled Yoga Mat",
        },
        {
          url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
          altText: "Yoga Mat Pattern",
        },
      ],

      options: [
        {
          name: "Color",
          values: ["Emerald Green", "Ocean Blue"],
        },
        {
          name: "Thickness",
          values: ["6mm"],
        },
      ],

      variants: [
        {
          name: "Emerald Green - 6mm",
          sku: "YGA-GRN-6MM",
          price: 1899,
          comparePrice: 2999,
          stock: 40,
          optionValues: [
            {
              name: "Color",
              value: "Emerald Green",
            },
            {
              name: "Thickness",
              value: "6mm",
            },
          ],
        },
        {
          name: "Ocean Blue - 6mm",
          sku: "YGA-BLU-6MM",
          price: 1899,
          comparePrice: 2999,
          stock: 55,
          optionValues: [
            {
              name: "Color",
              value: "Ocean Blue",
            },
            {
              name: "Thickness",
              value: "6mm",
            },
          ],
        },
      ],
    },
    // Beauty & Personal Care
    {
      name: "Hydrating Hyaluronic Serum",
      slug: "hyaluronic-acid-serum",
      description: "Intense moisture boost skincare serum for glowing skin.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
      categoryId: beauty?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
          altText: "Serum Bottle Dropper",
        },
        {
          url: "https://images.unsplash.com/photo-1608248597481-496100c80836",
          altText: "Skincare Setup",
        },
      ],

      options: [
        {
          name: "Volume",
          values: ["30ml", "50ml"],
        },
      ],

      variants: [
        {
          name: "30ml",
          sku: "SRM-HA-30",
          price: 899,
          comparePrice: 1299,
          stock: 110,
          optionValues: [
            {
              name: "Volume",
              value: "30ml",
            },
          ],
        },
        {
          name: "50ml",
          sku: "SRM-HA-50",
          price: 1399,
          comparePrice: 1999,
          stock: 65,
          optionValues: [
            {
              name: "Volume",
              value: "50ml",
            },
          ],
        },
      ],
    },
    {
      name: "Organic Coconut Hair Oil",
      slug: "organic-coconut-hair-oil",
      description: "Deep conditioning cold-pressed oil for hair growth and shine.",
      imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050",
      categoryId: beauty?.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1617897903246-719242758050",
          altText: "Coconut Oil Jar",
        },
        {
          url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f",
          altText: "Coconut and Oil",
        },
      ],

      options: [
        {
          name: "Size",
          values: ["100ml", "250ml"],
        },
      ],

      variants: [
        {
          name: "100ml",
          sku: "OIL-COC-100",
          price: 449,
          comparePrice: 699,
          stock: 150,
          optionValues: [
            {
              name: "Size",
              value: "100ml",
            },
          ],
        },
        {
          name: "250ml",
          sku: "OIL-COC-250",
          price: 899,
          comparePrice: 1299,
          stock: 80,
          optionValues: [
            {
              name: "Size",
              value: "250ml",
            },
          ],
        },
      ],
    },
  ];

  for (const product of products) {
    await seedProduct(product);
  }

}

async function seedProduct(product: SeedProduct) {
  // Create Product
  const createdProduct = await prisma.product.create({
    data: {
      name: product.name,
      slug: product.slug,
      description: product.description,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,

      isActive: true,

      minPrice: Math.min(...product.variants.map((v) => v.price)),

      images: {
        create: product.images,
      },
    },
  });

  // Create Options + Values
  const optionValueMap = new Map<string, string>();

  for (const option of product.options) {
    const createdOption = await prisma.productOption.create({
      data: {
        name: option.name,
        productId: createdProduct.id,

        values: {
          create: option.values.map((value) => ({
            value,
          })),
        },
      },

      include: {
        values: true,
      },
    });

    for (const value of createdOption.values) {
      optionValueMap.set(
        `${createdOption.name}:${value.value}`,
        value.id
      );
    }
  }

  // Create Variants
  for (const variant of product.variants) {
    await prisma.productVariant.create({
      data: {
        name: variant.name,
        sku: variant.sku,
        price: variant.price,
        comparePrice: variant.comparePrice,
        stock: variant.stock,

        productId: createdProduct.id,

        optionValues: {
          create: variant.optionValues.map((option) => ({
            optionValueId: optionValueMap.get(
              `${option.name}:${option.value}`
            )!,
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
