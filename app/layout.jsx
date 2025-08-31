import "./globals.css";
import MuiTheme from "@/components/mui-theme";

export const metadata = {
  title: "FurniFlow - Adaptive Furniture UI",
  description: "Adaptive furniture storefront with parallax desktop and mobile-first bottom nav."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MuiTheme>{children}</MuiTheme>
      </body>
    </html>
  );
}
