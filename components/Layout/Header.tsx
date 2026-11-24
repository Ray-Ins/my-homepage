"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronDown, Menu } from "lucide-react";

const services = [
  { href: "/accounting-taxation", label: "Accounting & Taxation" },
  { href: "/finance-lending", label: "Finance and Lending" },
  { href: "/specialised-industries", label: "Specialised Industries" },
  { href: "/extended-services", label: "Extended Services" },
];

const navLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/event-register", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const clientLinks = [{ href: "/portal", label: "Upload documents" }];

const linkClass =
  "hover:border-b-2 hover:border-[#f5e5be] focus:outline-none hover:bg-transparent focus:bg-transparent transition-all text-md font-montaga whitespace-nowrap px-2 py-2";

const triggerClass =
  "h-auto rounded-none bg-transparent px-2 py-2 text-md font-montaga text-[#f5e5be] shadow-none hover:border-b-2 hover:border-[#f5e5be] hover:bg-transparent hover:text-[#f5e5be] focus:bg-transparent focus:text-[#f5e5be] data-[state=open]:bg-transparent data-[state=open]:text-[#f5e5be] data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const servicesActive = services.some((service) => isActive(service.href));
  const clientsActive = clientLinks.some((link) => isActive(link.href));

  useEffect(() => {
    if (servicesActive) setServicesOpen(true);
  }, [servicesActive]);

  useEffect(() => {
    if (clientsActive) setClientsOpen(true);
  }, [clientsActive]);

  return (
    <header className="w-full border-b bg-[#052f46] sticky top-0 z-50">
      <div className="px-3 md:px-4 mx-auto flex w-full max-w-[1400px] items-center justify-between py-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Go to Inspire Partners homepage">
          <Image src="/Logo.png" alt="Inspire Partners Logo" width={120} height={40} />
        </Link>

        <div className="flex items-center gap-2">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="hidden lg:flex gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  style={{
                    color: "#f5e5be",
                    fontWeight: isActive("/about-us") ? "600" : "500",
                    borderBottom: isActive("/about-us")
                      ? "2px solid #f5e5be"
                      : "2px solid transparent",
                    paddingBottom: "4px",
                  }}
                  className={linkClass}
                >
                  <Link href="/about-us" style={{ color: "#f5e5be" }}>
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  style={{
                    color: "#f5e5be",
                    fontWeight: servicesActive ? "600" : "500",
                    borderBottom: servicesActive
                      ? "2px solid #f5e5be"
                      : "2px solid transparent",
                    paddingBottom: "4px",
                  }}
                  className={triggerClass}
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-60 bg-[#f7f3e8] p-2 text-[#052f46]">
                  <ul className="flex flex-col">
                    {services.map((service) => (
                      <li key={service.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className={`block rounded-md px-3 py-2 text-sm text-[#052f46] hover:bg-[#052f46]/10 hover:text-[#052f46] focus:bg-[#052f46]/10 focus:text-[#052f46] ${
                              isActive(service.href) ? "bg-[#052f46]/10 font-semibold" : ""
                            }`}
                          >
                            {service.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navLinks.slice(1).map((link) => (
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
                    className={linkClass}
                  >
                    <Link href={link.href} style={{ color: "#f5e5be" }}>
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  style={{
                    color: "#f5e5be",
                    fontWeight: clientsActive ? "600" : "500",
                    borderBottom: clientsActive
                      ? "2px solid #f5e5be"
                      : "2px solid transparent",
                    paddingBottom: "4px",
                  }}
                  className={triggerClass}
                >
                  Clients
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-auto right-0 min-w-52 bg-[#f7f3e8] p-2 text-[#052f46]">
                  <ul className="flex flex-col">
                    {clientLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className={`block rounded-md px-3 py-2 text-sm text-[#052f46] hover:bg-[#052f46]/10 hover:text-[#052f46] focus:bg-[#052f46]/10 focus:text-[#052f46] ${
                              isActive(link.href) ? "bg-[#052f46]/10 font-semibold" : ""
                            }`}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>

            <button
              className="lg:hidden cursor-pointer focus:outline-none focus:border-2 focus:border-[#f5e5be] focus:bg-transparent hover:bg-transparent rounded p-1"
              style={{ color: "#f5e5be" }}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </NavigationMenu>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full border-b shadow-lg z-50 bg-[#052f46]">
          <nav className="container mx-auto py-4">
            <ul className="flex flex-col space-y-1">
              <li>
                <Link
                  href="/about-us"
                  className={`block px-4 py-2 hover:border-l-4 hover:border-[#f5e5be] focus:border-l-4 focus:border-[#f5e5be] focus:outline-none ${
                    isActive("/about-us")
                      ? "font-semibold border-l-4 border-[#f5e5be]"
                      : "border-l-4 border-transparent"
                  }`}
                  style={{ color: "#f5e5be" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between px-4 py-2 text-left hover:border-l-4 hover:border-[#f5e5be] focus:outline-none ${
                    servicesActive
                      ? "font-semibold border-l-4 border-[#f5e5be]"
                      : "border-l-4 border-transparent"
                  }`}
                  style={{ color: "#f5e5be" }}
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((open) => !open)}
                >
                  Services
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {servicesOpen && (
                  <ul className="pb-1">
                    {services.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          className={`block py-2 pl-8 pr-4 text-sm hover:border-l-4 hover:border-[#f5e5be] focus:outline-none ${
                            isActive(service.href)
                              ? "font-semibold border-l-4 border-[#f5e5be]"
                              : "border-l-4 border-transparent"
                          }`}
                          style={{ color: "#f5e5be" }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-2 hover:border-l-4 hover:border-[#f5e5be] focus:border-l-4 focus:border-[#f5e5be] focus:outline-none ${
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
                <button
                  type="button"
                  className={`flex w-full items-center justify-between px-4 py-2 text-left hover:border-l-4 hover:border-[#f5e5be] focus:outline-none ${
                    clientsActive
                      ? "font-semibold border-l-4 border-[#f5e5be]"
                      : "border-l-4 border-transparent"
                  }`}
                  style={{ color: "#f5e5be" }}
                  aria-expanded={clientsOpen}
                  onClick={() => setClientsOpen((open) => !open)}
                >
                  Clients
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${clientsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {clientsOpen && (
                  <ul className="pb-1">
                    {clientLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block py-2 pl-8 pr-4 text-sm hover:border-l-4 hover:border-[#f5e5be] focus:outline-none ${
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
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
