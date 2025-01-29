
import { ThemeProviderWrapper } from "@/context/themeContext";
import Navbar from "@/components/NavBar";
import { getThemeFromCookies } from "@/lib/theme";

export default function RootLayout({ children }) {
  const themeMode = getThemeFromCookies(); // Get theme from cookies (SSR)

  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper initialTheme={themeMode}>
        <Navbar/>
          {children}</ThemeProviderWrapper>
      </body>
    </html>
  );
}
