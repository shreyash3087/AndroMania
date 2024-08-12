"use client";
import React from "react";
import Contest from "@/components/Contest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext } from 'react';
import { TeamContext } from '../../../../context/TeamContext';
const theme = createTheme();

function page() {
  let {teamName} = useContext(TeamContext);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Contest teamName={teamName}/>
      </ThemeProvider>
    </div>
  );
}

export default page;
