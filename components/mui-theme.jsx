"use client";

import * as React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Create Emotion cache with a key for MUI
const muiCache = createCache({ key: "mui", prepend: true });

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6576ff" },
    secondary: { main: "#3643b3" },
  },
  shape: { borderRadius: 16 },
});

export default function MuiTheme({ children }) {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
