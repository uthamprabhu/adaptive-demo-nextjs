"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import MobileHome from "@/components/shells/mobile-home";
import DesktopHome from "@/components/shells/desktop-home";

export default function ResponsiveHome({ initialIsMobile }) {
  const isMobileViewport = useMediaQuery("(max-width: 900px)", { noSsr: true });
  const isMobile = isMobileViewport ?? initialIsMobile;

  return isMobile ? <MobileHome /> : <DesktopHome />;
}
