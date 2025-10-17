"use client";

import React from "react";
import Transection from "./Transaction";
import Analityic from "./Analityic";
import Ai from "@/components/ai/Ai";
import { Container, Typography, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Dashboard Heading */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          fontWeight: 800,
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          background: "linear-gradient(90deg, #4facfe, #00f2fe)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "1px",
          textShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        Dashboard Overview
      </Typography>

      {/* AI Section */}
      <Box
        sx={{
          my: { xs: 3, md: 5 },
          p: { xs: 2, md: 4 },
          bgcolor: "#f0f4f8",
          borderRadius: 3,
          textAlign: "center",
          color: "#555",
          boxShadow: 2,
          transition: "all 0.3s ease",
          "&:hover": { boxShadow: 4 },
        }}
      >
        <Ai />
      </Box>

      {/* Analytics Section */}
      <Box sx={{ my: { xs: 3, md: 5 } }}>
        <Analityic />
      </Box>

      {/* Recent Transactions Heading */}
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "#333",
        }}
      >
        Recent Transactions
      </Typography>

      {/* Transaction Table */}
      <Box sx={{ mb: 5 }}>
        <Transection />
      </Box>
    </Container>
  );
};

export default HomePage;
