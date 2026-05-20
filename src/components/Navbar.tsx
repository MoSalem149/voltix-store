import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 transition hover:opacity-80"
        >
          <Image
            src="/logo.svg"
            alt="Voltix Store Logo"
            width={120}
            height={40}
            className="h-auto w-[120px]"
            priority
          />
        </Link>

        <NavLink />
      </div>
    </nav>
  );
}
