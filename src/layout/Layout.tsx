import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NavHeader from "@/components/NavHeader";
import FooterCTA from "@/components/FooterCTA";
import { getNavbar } from "@/lib/strapi";

const getEntityData = (entry: any) => {
  if (!entry) return null;
  return entry.attributes ? entry.attributes : entry;
};

const Layout = () => {
  const { data: navbarData } = useQuery({
    queryKey: ["navbar"],
    queryFn: getNavbar,
  });

  // ✅ SAME FIX AS INDEX PAGE
  const navbar = useMemo(
    () => getEntityData(navbarData?.data ?? navbarData),
    [navbarData]
  );

  return (
    <>
      <NavHeader navbar={navbar} />
      <Outlet />
      <FooterCTA />
    </>
  );
};

export default Layout;