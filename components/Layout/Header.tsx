"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/accounting-taxation", label: "Accounting & Taxation" },
    { href: "/finance-lending", label: "Finance and Lending" },
    { href: "/specialised-industries", label: "Specialised Industries" },
    { href: "/extended-services", label: "Extended Services" },
    { href: "/event-register", label: "Events" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="w-full border-b bg-[#052f46] sticky top-0 z-50">
      <div className="px-3 md:px-4 mx-auto flex w-full max-w-[1400px] items-center justify-between py-4">
        {/* Logo on the left */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="Go to Inspire Partners homepage">
          <Image src="/Logo.png" alt="Inspire Partners Logo" width={120} height={40} />
        </Link>

        {/* Navigation on the right */}
        <div className="flex items-center gap-2">
        <NavigationMenu>
          <NavigationMenuList className="hidden xl:flex gap-0">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  style={{
                    color: "#f5e5be",
                    fontWeight: isActive(link.href) ? "600" : "500",
                    borderBottom: isActive(link.href)
                      ? "2px solid #f5e5be"
                      : "2px solid transparent",
                    paddingBottom: "4px",
                  }}
                  className="hover:border-b-2 hover:border-[#f5e5be] focus:outline-none hover:bg-transparent focus:bg-transparent transition-all text-md font-montaga whitespace-nowrap px-1.5 py-2"
                >
                  <Link href={link.href} style={{ color: "#f5e5be" }}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>

          {/* Mobile menu button */}
          <button
            className="xl:hidden cursor-pointer focus:outline-none focus:border-2 focus:border-[#f5e5be] focus:bg-transparent hover:bg-transparent rounded p-1"
            style={{ color: "#f5e5be" }}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} />
          </button>
        </NavigationMenu>
        <Link
          href="/portal"
          className="hidden xl:inline-flex shrink-0 items-center whitespace-nowrap rounded-md border border-[#f5e5be] px-2.5 py-1 text-sm font-medium text-[#f5e5be] transition-colors hover:bg-[#f5e5be] hover:text-[#052f46]"
        >
          Upload
        </Link>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full border-b shadow-lg z-50 bg-[#052f46]">
          <nav className="container mx-auto py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-2 hover:border-l-4 hover:border-[#f5e5be] focus:border-l-4 focus:border-[#f5e5be] focus:outline-none hover:bg-transparent focus:bg-transparent transition-all ${
                      isActive(link.href)
                        ? "font-semibold border-l-4 border-[#f5e5be]"
                        : "border-l-4 border-transparent"
                    }`}
                    style={{ color: "#f5e5be" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/portal"
                  className="mx-4 mt-2 inline-flex rounded-md border border-[#f5e5be] px-3 py-2 text-sm font-medium"
                  style={{ color: "#f5e5be" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Upload documents
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
