import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink"; // 👈 your custom NavLink
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

  const links = Array.isArray(navbar?.menu_items)
    ? navbar.menu_items
    : [];

  const bookDemo = navbar?.book_demo_cta;
  const installApp = navbar?.install_app_cta;

  if (!navbar) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-9 h-9" />
          <span className="font-bold">WishlistSuite</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link: any, index: number) => {
            const isExternal = link?.is_external;

            return isExternal ? (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.text}
              </a>
            ) : (
              <NavLink
                key={index}
                to={link.url}
                className="text-sm text-muted-foreground"
                activeClassName="text-foreground font-semibold"
              >
                {link.text}
              </NavLink>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex gap-3">
          {bookDemo?.url && (
            <Button asChild variant="outline" size="sm">
              <a
                href={bookDemo.url}
                target={bookDemo.is_external ? "_blank" : undefined}
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
              >
                {installApp.text}
              </a>
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden p-4 space-y-4">
          {links.map((link: any, index: number) => {
            const isExternal = link?.is_external;

            return isExternal ? (
              <a key={index} href={link.url}>
                {link.text}
              </a>
            ) : (
              <NavLink key={index} to={link.url}>
                {link.text}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default NavHeader;