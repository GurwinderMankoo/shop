import { prisma } from "@/lib/prisma";


async function main() {

  await prisma.product.deleteMany();


  await prisma.product.create({
    data: {
      name: "Nike Air Max 90",
      slug: "nike-air-max-90",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      description: "Classic running shoes with comfortable cushioning.",

      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            altText: "Nike Air Max"
          },
          {
            url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
            altText: "Nike shoes side"
          }
        ]
      },

      variants: {
        create: [
          {
            name: "Black - Size 42",
            sku: "NIKE-AM90-BLK-42",
            price: 120,
            stock: 15,

            options: {
              create: [
                {
                  name: "Color",
                  value: "Black"
                },
                {
                  name: "Size",
                  value: "42"
                }
              ]
            }
          },

          {
            name: "White - Size 43",
            sku: "NIKE-AM90-WHT-43",
            price: 125,
            stock: 8,

            options: {
              create: [
                {
                  name: "Color",
                  value: "White"
                },
                {
                  name: "Size",
                  value: "43"
                }
              ]
            }
          }
        ]
      }
    }
  });



  await prisma.product.create({
    data: {
      name: "Apple MacBook Pro M4",
      slug: "apple-macbook-pro-m4",
      description: "Powerful laptop for developers and creators.",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",

      images:{
        create:[
          {
            url:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            altText:"MacBook Pro"
          }
        ]
      },

      variants:{
        create:[
          {
            name: "16GB RAM - 512GB Storage",
            sku:"MBP-M4-16-512",
            price:1999,
            stock:5,

            options:{
              create:[
                {
                  name:"RAM",
                  value:"16GB"
                },
                {
                  name:"Storage",
                  value:"512GB"
                }
              ]
            }
          }
        ]
      }
    }
  });



  await prisma.product.create({
    data:{
      name:"Sony WH-1000XM5 Headphones",
      slug:"sony-wh1000xm5-headphones",
      description:"Noise cancelling wireless headphones.",
      imageUrl:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",

      images:{
        create:[
          {
            url:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            altText:"Sony headphones"
          }
        ]
      },


      variants:{
        create:[
          {
            name:"Black Wireless",
            sku:"SONY-XM5-BLK",
            price:349,
            stock:20,

            options:{
              create:[
                {
                  name:"Color",
                  value:"Black"
                }
              ]
            }
          }
        ]
      }
    }
  });



  await prisma.product.create({
    data:{
      name:"Adidas Hoodie",
      slug:"adidas-hoodie",
      description:"Comfortable cotton hoodie.",
      imageUrl:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",

      images:{
        create:[
          {
            url:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
            altText:"Hoodie"
          }
        ]
      },

      variants:{
        create:[
          {
            name:"Black - Large",
            sku:"ADI-HOOD-BLK-L",
            price:80,
            stock:30,

            options:{
              create:[
                {
                  name:"Color",
                  value:"Black"
                },
                {
                  name:"Size",
                  value:"Large"
                }
              ]
            }
          }
        ]
      }
    }
  });


  console.log("Seed completed 🚀");
}


main()
  .catch(console.error)
  .finally(async()=>{
    await prisma.$disconnect();
  });