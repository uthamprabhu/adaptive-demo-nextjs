"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import MobileHome from "@/components/shells/mobile-home";
import DesktopHome from "@/components/shells/desktop-home";

/**
 * Adaptive shell: viewport (max-width: 900px) is the source of truth after paint.
 *
 * MUI useMediaQuery defaults `defaultMatches` to false. With `noSsr: true`, that made
 * SSR + first paint always "desktop" until matchMedia ran — causing a flash of desktop
 * CSS on phones. We seed `defaultMatches` from the server UA hint so the first HTML
 * matches real phones; resize/desktop DevTools still update via matchMedia.
 */
export default function ResponsiveHome({ initialIsMobile }) {
  const isMobile = useMediaQuery("(max-width: 900px)", {
    noSsr: true,
    defaultMatches: initialIsMobile
  });

  return isMobile ? <MobileHome /> : <DesktopHome />;
}
