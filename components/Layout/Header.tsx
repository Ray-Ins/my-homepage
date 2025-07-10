"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [opacity, setOpacity] = useState(1);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Set scrolled state for shadow effect
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Calculate opacity based on scroll position
      // Start fading at 50px, become fully transparent (0.85) at 200px
      const scrollStart = 50;
      const scrollEnd = 200;
      const maxOpacity = 1;
      const minOpacity = 0.2;

      if (offset <= scrollStart) {
        setOpacity(maxOpacity);
      } else if (offset >= scrollEnd) {
        setOpacity(minOpacity);
      } else {
        // Linear interpolation between maxOpacity and minOpacity
        const ratio = (offset - scrollStart) / (scrollEnd - scrollStart);
        setOpacity(maxOpacity - ratio * (maxOpacity - minOpacity));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Custom styles for navigation links
  const linkStyle = (path: string) => {
    const isActive = pathname === path;
    return {
      color: "#e3d3a0",
      // fontWeight: isActive ? "600" : "500",
      // borderBottom: isActive ? "2px solid #e3d3a0" : "2px solid transparent",
      // paddingBottom: "4px",
    };
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/accounting-taxation", label: "Accounting & Taxation" },
    { href: "/finance-lending", label: "Finance and Lending" },
    { href: "/specialised-industries", label: "Specialised Industries" },
    { href: "/affiliate-services", label: "Affiliate Services" },
    { href: "/event-register", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`w-full border-b sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        backgroundColor: `rgba(0, 52, 71, ${opacity})`, // Changed from white to footer's color #003447
        backdropFilter: scrolled ? "blur(5px)" : "none",
      }}
    >
      <div className="px-4 md:px-0 md:container mx-auto flex items-center justify-between py-4">
        {/* Logo on the left */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo.png"
            alt="Company Logo"
            width={150}
            height={50}
            // Added invert to make logo visible on dark background
            // className="h-auto invert brightness-0 filter"
          />
        </Link>

        {/* Navigation on the right */}
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  style={linkStyle(link.href)}
                  className=" hover:border-[#e3d3a0] focus:border-2 focus:border-[#e3d3a0] focus:outline-none hover:bg-transparent focus:bg-transparent transition-all text-md "
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>

          {/* Mobile menu button */}
          <button
            className="md:hidden cursor-pointer focus:outline-none focus:border-2 focus:border-[#e3d3a0] focus:bg-transparent hover:bg-transparent rounded p-1"
            style={{ color: "#e3d3a0" }}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </NavigationMenu>
      </div>
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full border-b shadow-lg z-50"
          style={{ backgroundColor: "#003447" }}
        >
          <nav className="container mx-auto py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-2 hover:border-l-4 hover:border-[#e3d3a0] focus:border-l-4 focus:border-[#e3d3a0] focus:outline-none hover:bg-transparent focus:bg-transparent transition-all ${
                      pathname === link.href
                        ? "font-semibold border-l-4 border-[#e3d3a0]"
                        : "border-l-4 border-transparent"
                    }`}
                    style={{ color: "#e3d3a0" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
