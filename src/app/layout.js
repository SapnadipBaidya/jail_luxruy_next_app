"use client"; // Ensure this runs on the client

import { useThemeContext } from "@/context/themeContext"; // Import theme context
import Navbar from "@/components/NavBar";
import { ThemeProviderWrapper } from "@/context/themeContext";
import { StyledEngineProvider } from "@mui/material";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";
// Wrapper to dynamically update the background color based on theme
function ThemeBackgroundWrapper({ children }) {
  const { themeMode } = useThemeContext(); // Get current theme dynamically

  return (
    <div
      style={{
        backgroundColor: themeMode === "dark" ? "#121212" : "#ffffff",
        minHeight: "100vh",
        minWidth: "100vw",
        
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

export default async function RootLayout({ children }) {
  return (
    <ErrorBoundary>
    <html lang="en">
      <body>

       <StyledEngineProvider injectFirst>
        <ThemeProviderWrapper>
          <ThemeBackgroundWrapper> {/* Apply background color here */}
            <Navbar />
            {children}
            <Footer/>
          </ThemeBackgroundWrapper>
        </ThemeProviderWrapper>
        </StyledEngineProvider>

      </body>
    </html>
    </ErrorBoundary>
  );
}
