import { headers } from "next/headers";
import { isMobileUA } from "@/lib/is-mobile";
import MobileHome from "@/components/shells/mobile-home";
import DesktopHome from "@/components/shells/desktop-home";

export default async function Page() {
  const ua = await headers().get("user-agent") || "";
  const isMobile = isMobileUA(ua);

  return isMobile ? <MobileHome /> : <DesktopHome />;
}
