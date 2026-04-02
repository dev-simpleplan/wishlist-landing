import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NavHeader from "@/components/NavHeader";
import FooterCTA from "@/components/FooterCTA";
import { getNavbar } from "@/lib/strapi";

const Layout = () => {
  const { data: navbar } = useQuery({
    queryKey: ["navbar"],
    queryFn: getNavbar,
    staleTime: 1000 * 60 * 10, // ✅ cache for 10 min
  });

  return (
    <>
      <NavHeader navbar={navbar} />
      <Outlet />
      <FooterCTA />
    </>
  );
};

export default Layout;