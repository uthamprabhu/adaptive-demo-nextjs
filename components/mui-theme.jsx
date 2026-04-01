"use client";

import * as React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Create Emotion cache with a key for MUI
const muiCache = createCache({ key: "mui", prepend: true });

const ThemeModeContext = React.createContext({
  mode: "light",
  toggleMode: () => {}
});

function getPreferredMode() {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("theme-mode");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useThemeMode() {
  return React.useContext(ThemeModeContext);
}

export default function MuiTheme({ children }) {
  const [mode, setMode] = React.useState("light");

  React.useEffect(() => {
    setMode(getPreferredMode());
  }, []);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", mode);
    window.localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#6576ff" },
          secondary: { main: "#3643b3" },
          background: {
            default: mode === "dark" ? "#0a0f1f" : "#f7f8fc",
            paper: mode === "dark" ? "#121a2d" : "#ffffff"
          }
        },
        shape: { borderRadius: 16 }
      }),
    [mode]
  );

  const value = React.useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((prev) => (prev === "light" ? "dark" : "light"))
    }),
    [mode]
  );

  return (
    <CacheProvider value={muiCache}>
      <ThemeModeContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </CacheProvider>
  );
}
