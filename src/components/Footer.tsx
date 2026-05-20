import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/logo.svg"
              alt="Voltix Store"
              width={110}
              height={36}
              className="h-auto w-[110px]"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              Modern electronics for the way you live. Quality products, fast shipping, unbeatable prices.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Twitter/X", icon: "𝕏", href: "#" },
                { label: "Instagram", icon: "📸", href: "#" },
                { label: "Facebook", icon: "f", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-700 text-sm text-gray-400 transition hover:border-cyan-500 hover:text-cyan-400"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-300">Shop</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/products", label: "All Products" },
                { href: "/category", label: "Categories" },
                { href: "/cart/0", label: "My Cart" },
                { href: "/wishlist", label: "Wishlist" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 transition hover:text-cyan-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-300">Account</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/profile", label: "My Profile" },
                { href: "/orders", label: "Order History" },
                { href: "/auth/login", label: "Sign In" },
                { href: "/auth/register", label: "Create Account" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 transition hover:text-cyan-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-300">Support</h3>
            <ul className="space-y-2.5">
              {[
                { href: "#", label: "Help Center" },
                { href: "#", label: "Shipping Info" },
                { href: "#", label: "Returns & Refunds" },
                { href: "#", label: "Contact Us" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 transition hover:text-cyan-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-lg border border-gray-700 bg-gray-900 p-3">
              <p className="text-xs text-gray-400">Need help?</p>
              <a
                href="mailto:support@voltix.store"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                support@voltix.store
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Voltix Store. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((t) => (
              <a key={t} href="#" className="text-xs text-gray-500 transition hover:text-gray-300">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
