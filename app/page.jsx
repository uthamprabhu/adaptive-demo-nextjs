import { headers } from "next/headers";
import { isMobileUA } from "@/lib/is-mobile";
import ResponsiveHome from "@/components/shells/responsive-home";

export default async function Page() {
  const ua = await headers().get("user-agent") || "";
  const initialIsMobile = isMobileUA(ua);

  return <ResponsiveHome initialIsMobile={initialIsMobile} />;
}
