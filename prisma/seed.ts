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
      variants: [
        {
          name: "Black - Standard",
          sku: "HEAD-BLK",
          price: 4999,
          comparePrice: 5999,
          stock: 50,
          options: [{ name: "Color", value: "Black" }, { name: "Storage", value: "64GB" }],
        },
        {
          name: "White - Premium",
          sku: "HEAD-WHT",
          price: 5499,
          comparePrice: 6999,
          stock: 30,
          options: [{ name: "Color", value: "White" }, { name: "Storage", value: "128GB" }],
        },
      ],
    },
    {
      name: "Smart Watch",
      slug: "smart-watch",
      description: "Fitness tracking smart watch",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics?.id,
      images: [
        { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", altText: "Smart watch" },
        { url: "https://images.unsplash.com/photo-1508685096489-7aacd7a91f4f", altText: "Watch display" },
      ],
      variants: [
        {
          name: "Silver 42mm",
          sku: "WATCH-SIL-42",
          price: 7999,
          comparePrice: 9999,
          stock: 30,
          options: [{ name: "Color", value: "Silver" }, { name: "Size", value: "42mm" }],
        },
        {
          name: "Black 46mm",
          sku: "WATCH-BLK-46",
          price: 8999,
          comparePrice: 10999,
          stock: 20,
          options: [{ name: "Color", value: "Black" }, { name: "Size", value: "46mm" }],
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
        { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", altText: "T shirt" },
        { url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1", altText: "T shirt model" },
      ],
      variants: [
        {
          name: "Black Large",
          sku: "TS-BLK-L",
          price: 799,
          comparePrice: 1299,
          stock: 100,
          options: [{ name: "Color", value: "Black" }, { name: "Size", value: "Large" }],
        },
        {
          name: "White Medium",
          sku: "TS-WHT-M",
          price: 699,
          comparePrice: 1199,
          stock: 80,
          options: [{ name: "Color", value: "White" }, { name: "Size", value: "Medium" }],
        },
        {
          name: "Blue XL",
          sku: "TS-BLU-XL",
          price: 899,
          comparePrice: 1399,
          stock: 60,
          options: [{ name: "Color", value: "Blue" }, { name: "Size", value: "XL" }],
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
        { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", altText: "Running shoes" },
        { url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2", altText: "Shoes" },
      ],
      variants: [
        {
          name: "Red Size 9",
          sku: "SHOE-RED-9",
          price: 4999,
          comparePrice: 6999,
          stock: 40,
          options: [{ name: "Color", value: "Red" }, { name: "Size", value: "9" }],
        },
        {
          name: "Black Size 10",
          sku: "SHOE-BLK-10",
          price: 5299,
          comparePrice: 7499,
          stock: 35,
          options: [{ name: "Color", value: "Black" }, { name: "Size", value: "10" }],
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
        { url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef", altText: "Keyboard Top View" },
        { url: "https://images.unsplash.com/photo-1595225476474-87563907a212", altText: "Keyboard RGB Glow" },
      ],
      variants: [
        {
          name: "Linear Red Switches",
          sku: "KEY-RED-RGB",
          price: 3499,
          comparePrice: 4500,
          stock: 45,
          options: [{ name: "Switch Type", value: "Red (Linear)" }, { name: "Backlight", value: "RGB" }],
        },
        {
          name: "Tactile Blue Switches",
          sku: "KEY-BLU-RGB",
          price: 3699,
          comparePrice: 4700,
          stock: 25,
          options: [{ name: "Switch Type", value: "Blue (Clicky)" }, { name: "Backlight", value: "RGB" }],
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
        { url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f", altText: "Action Camera Front View" },
        { url: "https://images.unsplash.com/photo-1484788984921-03950022c9ef", altText: "Action Camera Outdoor Mount" },
      ],
      variants: [
        {
          name: "Standard Pack",
          sku: "CAM-4K-STD",
          price: 8999,
          comparePrice: 11999,
          stock: 15,
          options: [{ name: "Bundle", value: "Standard" }],
        },
        {
          name: "Adventure Bundle with Mounts",
          sku: "CAM-4K-ADV",
          price: 10499,
          comparePrice: 13999,
          stock: 20,
          options: [{ name: "Bundle", value: "Adventure Pack" }],
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
        { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0", altText: "Blue Denim Jacket" },
        { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e", altText: "Black Denim Jacket" }
      ],
      variants: [
        {
          name: "Classic Blue - Medium",
          sku: "DEN-BLU-M",
          price: 2499,
          comparePrice: 3499,
          stock: 30,
          options: [{ name: "Color", value: "Classic Blue" }, { name: "Size", value: "Medium" }]
        },
        {
          name: "Washed Black - Large",
          sku: "DEN-BLK-L",
          price: 2699,
          comparePrice: 3699,
          stock: 25,
          options: [{ name: "Color", value: "Washed Black" }, { name: "Size", value: "Large" }]
        }
      ]
    },

    // Home & Living
    {
      name: "Scented Soy Candle Set",
      slug: "scented-soy-candle-set",
      description: "Relaxing hand-poured soy wax candles infused with natural essential oils.",
      imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59",
      categoryId: home?.id,
      images: [
        { url: "https://images.unsplash.com/photo-1603006905003-be475563bc59", altText: "Candles Lit" },
        { url: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed", altText: "Candle Gift Box" }
      ],
      variants: [
        {
          name: "Lavender & Vanilla",
          sku: "CNDL-LAV-VAN",
          price: 899,
          comparePrice: 1499,
          stock: 60,
          options: [{ name: "Scent Profile", value: "Calming" }]
        },
        {
          name: "Sandalwood & Citrus",
          sku: "CNDL-SND-CTR",
          price: 899,
          comparePrice: 1499,
          stock: 45,
          options: [{ name: "Scent Profile", value: "Energizing" }]
        }
      ]
    },
    {
      name: "Ergonomic Office Chair",
      slug: "ergonomic-office-chair",
      description: "High-back mesh office chair with lumbar support and adjustable armrests.",
      imageUrl: "https://images.unsplash.com/photo-1505797149-43b0069ec26b",
      categoryId: home?.id,
      images: [
        { url: "https://images.unsplash.com/photo-1505797149-43b0069ec26b", altText: "Office Chair Profile" },
        { url: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27", altText: "Chair Mesh Detail" }
      ],
      variants: [
        {
          name: "Stealth Black",
          sku: "CHR-ERG-BLK",
          price: 12499,
          comparePrice: 17999,
          stock: 15,
          options: [{ name: "Color", value: "Black" }]
        },
        {
          name: "Slate Grey",
          sku: "CHR-ERG-GRY",
          price: 12999,
          comparePrice: 18499,
          stock: 12,
          options: [{ name: "Color", value: "Grey" }]
        }
      ]
    },
    {
      name: "Ceramic Coffee Mug",
      slug: "ceramic-coffee-mug",
      description: "Minimalist handmade ceramic mug.",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
      categoryId: home?.id,
      images: [
        { url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd", altText: "Mug on Desk" },
        { url: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18", altText: "Mugs Array" },
      ],
      variants: [
        {
          name: "Matte White 350ml",
          sku: "MUG-WHT-350",
          price: 499,
          comparePrice: 799,
          stock: 120,
          options: [{ name: "Color", value: "Matte White" }, { name: "Capacity", value: "350ml" }],
        },
        {
          name: "Terracotta 450ml",
          sku: "MUG-TER-450",
          price: 599,
          comparePrice: 899,
          stock: 90,
          options: [{ name: "Color", value: "Terracotta" }, { name: "Capacity", value: "450ml" }],
        },
      ],
    },

    // Sports & Fitness
    {
      name: "Stainless Steel Shaker Bottle",
      slug: "steel-shaker-bottle",
      description: "Double-wall insulated 304 stainless steel shaker bottle with leak-proof flip lid, built-in whisk ball for clump-free mixes, and measurement markings. BPA-free and odor-resistant — ideal for protein shakes, pre-workout, and smoothies.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      categoryId: sports?.id,
      images: [
        { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", altText: "Stainless steel shaker bottle product shot" },
        { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48", altText: "Shaker bottle in gym environment" },
      ],
      variants: [
        {
          name: "Metallic Silver – 500ml",
          sku: "SHK-STEEL-SLV-500",
          price: 1199,
          comparePrice: 1899,
          stock: 70,
          options: [{ name: "Finish", value: "Stainless Silver" }, { name: "Capacity", value: "500ml" }],
        },
        {
          name: "Matte Black – 500ml",
          sku: "SHK-STEEL-BLK-500",
          price: 1299,
          comparePrice: 1999,
          stock: 85,
          options: [{ name: "Finish", value: "Matte Black" }, { name: "Capacity", value: "500ml" }],
        },
        {
          name: "Matte Black – 750ml",
          sku: "SHK-STEEL-BLK-750",
          price: 1499,
          comparePrice: 2299,
          stock: 50,
          options: [{ name: "Finish", value: "Matte Black" }, { name: "Capacity", value: "750ml" }],
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
        { url: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2", altText: "Rolled Yoga Mat" },
        { url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f", altText: "Yoga Mat Pattern" }
      ],
      variants: [
        {
          name: "Emerald Green 6mm",
          sku: "YGA-GRN-6MM",
          price: 1899,
          comparePrice: 2999,
          stock: 40,
          options: [{ name: "Color", value: "Emerald Green" }, { name: "Thickness", value: "6mm" }]
        },
        {
          name: "Ocean Blue 6mm",
          sku: "YGA-BLU-6MM",
          price: 1899,
          comparePrice: 2999,
          stock: 55,
          options: [{ name: "Color", value: "Ocean Blue" }, { name: "Thickness", value: "6mm" }]
        }
      ]
    },

    // Beauty & Personal Care
    {
      name: "Hydrating Hyaluronic Serum",
      slug: "hyaluronic-acid-serum",
      description: "Intense moisture boost skincare serum for glowing skin.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
      categoryId: beauty?.id,
      images: [
        { url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be", altText: "Serum Bottle Dropper" },
        { url: "https://images.unsplash.com/photo-1608248597481-496100c80836", altText: "Skincare Setup" }
      ],
      variants: [
        {
          name: "Standard 30ml",
          sku: "SRM-HA-30",
          price: 899,
          comparePrice: 1299,
          stock: 110,
          options: [{ name: "Volume", value: "30ml" }]
        },
        {
          name: "Value Pack 50ml",
          sku: "SRM-HA-50",
          price: 1399,
          comparePrice: 1999,
          stock: 65,
          options: [{ name: "Volume", value: "50ml" }]
        }
      ]
    },
    {
      name: "Organic Coconut Hair Oil",
      slug: "organic-coconut-hair-oil",
      description: "Deep conditioning cold-pressed oil for hair growth and shine.",
      imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050",
      categoryId: beauty?.id,
      images: [
        { url: "https://images.unsplash.com/photo-1617897903246-719242758050", altText: "Coconut Oil Jar" },
        { url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f", altText: "Coconut and Oil" },
      ],
      variants: [
        {
          name: "Regular 100ml",
          sku: "OIL-COC-100",
          price: 449,
          comparePrice: 699,
          stock: 150,
          options: [{ name: "Size", value: "100ml" }],
        },
        {
          name: "Family Pack 250ml",
          sku: "OIL-COC-250",
          price: 899,
          comparePrice: 1299,
          stock: 80,
          options: [{ name: "Size", value: "250ml" }],
        },
      ],
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        imageUrl: product.imageUrl,
        description: product.description,

        categoryId: product.categoryId,

        images: {
          create: product.images.map((image) => ({
            url: image.url,
            altText: image.altText,
          })),
        },

        variants: {
          create: product.variants.map((variant) => ({
            name: variant.name,
            sku: variant.sku,

            price: variant.price,
            comparePrice: variant.comparePrice,

            stock: variant.stock,

            options: {
              create: variant.options.map((option) => ({
                name: option.name,
                value: option.value,
              })),
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
