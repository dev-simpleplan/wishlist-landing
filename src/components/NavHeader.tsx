import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/wishlistsuite-logo.svg";

type NavHeaderProps = {
  navbar?: any;
};

const NavHeader = ({ navbar }: NavHeaderProps) => {
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

  // ✅ Only API data
  const links = Array.isArray(navbar?.menu_items)
    ? navbar.menu_items
    : [];

  const bookDemo = navbar?.book_demo_cta;
  const installApp = navbar?.install_app_cta;

  // ❌ Optional: hide navbar if no data
  if (!navbar) return null;

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

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link: any, index: number) => (
            <a
              key={index}
              href={link.url}
              target={link.is_external ? "_blank" : undefined}
              rel={link.is_external ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.text}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {bookDemo?.url && (
            <Button asChild variant="outline" size="sm">
              <a
                href={bookDemo.url}
                target={bookDemo.is_external ? "_blank" : undefined}
                rel={bookDemo.is_external ? "noreferrer" : undefined}
              >
                {bookDemo.text}
              </a>
            </Button>
          )}

          {installApp?.url && (
            <Button asChild size="sm">
              <a
                href={installApp.url}
                target={installApp.is_external ? "_blank" : undefined}
                rel={installApp.is_external ? "noreferrer" : undefined}
              >
                {installApp.text}
              </a>
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 space-y-4">
          {links.map((link: any, index: number) => (
            <a
              key={index}
              href={link.url}
              target={link.is_external ? "_blank" : undefined}
              rel={link.is_external ? "noopener noreferrer" : undefined}
              className="block text-sm font-medium text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.text}
            </a>
          ))}

          <div className="flex gap-3 pt-2">
            {bookDemo?.url && (
              <Button asChild variant="outline" size="sm" className="flex-1">
                <a
                  href={bookDemo.url}
                  target={bookDemo.is_external ? "_blank" : undefined}
                >
                  {bookDemo.text}
                </a>
              </Button>
            )}

            {installApp?.url && (
              <Button asChild size="sm" className="flex-1">
                <a
                  href={installApp.url}
                  target={installApp.is_external ? "_blank" : undefined}
                >
                  {installApp.text}
                </a>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavHeader;