import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavHeader from "@/components/NavHeader";
import EverywhereStrategy from "@/components/EverywhereStrategy";
import NotFound from "@/pages/NotFound";

describe("landing page regressions", () => {
  it("renders only anchors that exist on the page", () => {
    render(
      <MemoryRouter>
        <NavHeader />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute("href", "/#features");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    expect(screen.queryByRole("link", { name: "Pricing" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Integrations" })).not.toBeInTheDocument();
  });

  it("updates mobile menu accessibility attributes when toggled", () => {
    render(
      <MemoryRouter>
        <NavHeader />
      </MemoryRouter>,
    );

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-controls", "mobile-nav-menu");
    expect(screen.getAllByRole("link", { name: "Features" }).length).toBeGreaterThan(0);
  });

  it("switches preview image when the feature tab changes", () => {
    render(<EverywhereStrategy />);

    const homepageImage = screen.getByRole("img", { name: "Homepage grid with wishlist" });
    expect(homepageImage.getAttribute("src")).toContain("Homepage");

    fireEvent.click(screen.getByRole("button", { name: "Collection Page" }));

    const collectionImage = screen.getByRole("img", { name: "Collection page with wishlist" });
    expect(collectionImage.getAttribute("src")).toContain("collection");

    fireEvent.click(screen.getByRole("button", { name: "Product Page" }));

    const productImage = screen.getByRole("img", { name: "Product page with wishlist" });
    expect(productImage.getAttribute("src")).toContain("3rd");
  });

  it("uses client-side navigation on the 404 page", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Return to Home" })).toHaveAttribute("href", "/");
  });
});
