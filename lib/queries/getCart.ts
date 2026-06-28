// import { prisma } from "../prisma";


// export async function getCart() {
//     const user = await getCurrentUser();

//     if (!user) {
//         return {
//             items: [],
//             total: 0
//         }
//     }

//     return await prisma.cart.findUnique({
//         where: {
//             userId: user.id
//         },
//         include: {
//             variants: true
//         }
//     })

// }