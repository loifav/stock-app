// pages/index.js
import React from "react";
import Transection from "./Transection";
import Analityic from "./Analityic";
import { Container, Typography, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* Dashboard Heading */}
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          color: "#0073e6",
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "2px solid #0073e6",
          display: "inline-block",
          px: 2,
          letterSpacing: "1px",
        }}
      >
        Dashboard Cards
      </Typography>

      {/* AI Section Placeholder */}
      <Box
        sx={{
          my: 4,
          p: 3,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
          textAlign: "center",
          color: "#555",
          boxShadow: 1,
        }}
      >
        Ai Component
      </Box>

      {/* Analytics Section */}
      <Box sx={{ my: 4 }}>
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

      {/* Transaction Table/Section */}
      <Box sx={{ mb: 5 }}>
        <Transection />
      </Box>
    </Container>
  );
};

export default HomePage;
