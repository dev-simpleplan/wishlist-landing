import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/wishlistsuite-logo.svg";

const NavHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    {
      label: "Help Docs",
      href: "https://wishlistsuite.gitbook.io/wishlistsuite-docs",
      external: true,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="WishlistSuite logo" className="w-9 h-9 object-contain" />
          <span className="font-heading text-xl font-bold text-foreground">
            WishlistSuite
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <a href="https://calendar.app.google/GSETSTRMgj7eVL7e6" target="_blank" rel="noreferrer">
              Book Demo
            </a>
          </Button>
          <Button asChild size="sm">
            <a href="https://apps.shopify.com/wishlistsuite" target="_blank" rel="noreferrer">
              Install App
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-card border-t border-border px-4 py-4 space-y-4 animate-fade-in"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="block text-sm font-medium text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <a href="https://calendar.app.google/GSETSTRMgj7eVL7e6" target="_blank" rel="noreferrer">
                Book Demo
              </a>
            </Button>
            <Button asChild size="sm" className="flex-1">
              <a href="https://apps.shopify.com/wishlistsuite" target="_blank" rel="noreferrer">
                Install App
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavHeader;
