// export default async function CartPage() {
//     const cart = await getCart();

//     return (
//         <div className="container py-10">

//             <h1 className="mb-8 text-3xl font-bold">
//                 Shopping Cart
//             </h1>

//             <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

//                 <div className="space-y-4">
//                     {cart.items.map(item => (
//                         <CartItem
//                             key={item.id}
//                             item={item}
//                         />
//                     ))}
//                 </div>

//                 <CartSummary cart={cart} />

//             </div>

//         </div>
//     );
// }