import "./globals.css";
import MuiTheme from "@/components/mui-theme";
import PwaRegister from "@/components/pwa-register";

export const metadata = {
  title: "FurniFlow - Adaptive Furniture UI",
  description: "Adaptive furniture storefront with parallax desktop and mobile-first bottom nav.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FurniFlow"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6576ff"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MuiTheme>{children}</MuiTheme>
        <PwaRegister />
      </body>
    </html>
  );
}
