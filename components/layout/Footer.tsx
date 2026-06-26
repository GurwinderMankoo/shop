import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.7fr_0.7fr_1fr] md:grid-cols-2 ">
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              ShopSphere
            </h3>

            <p className="text-sm text-muted-foreground">
              Premium products with fast delivery and
              excellent customer service.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Company</h4>

            <div className="flex flex-col gap-2">
              <Link href="/about">About</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Support</h4>

            <div className="flex flex-col gap-2">
              <Link href="/contact">Contact</Link>
              <Link href="/shipping">Shipping</Link>
              <Link href="/returns">Returns</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-medium">
              Newsletter
            </h4>

            <div className="flex gap-2">
              <input
                placeholder="Email address"
                className="h-10 flex-1 min-w-0 rounded-md border px-3"
              />

              <button className="shirink-0 rounded-md bg-black px-4 text-white">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © 2026 ShopSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}