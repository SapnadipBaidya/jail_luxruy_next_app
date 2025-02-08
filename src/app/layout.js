"use server"; // Ensure this runs on the client

import { StyledEngineProvider } from "@mui/material";

import dynamic from "next/dynamic";
const ChildComp = dynamic(()=>import("@/components/pageClients/layoutClientPage"))
// Wrapper to dynamically update the background color based on theme

export default async function RootLayout({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <ChildComp children={children} />
    </StyledEngineProvider>
  );
}
