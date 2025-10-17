"use client";

import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Dashboard,
  Inventory,
  Add,
  ListAlt,
  Assessment,
  ShoppingCart,
  People,
  Settings,
  BarChart,
} from "@mui/icons-material";

const pages = [
  { name: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { name: "Products", icon: <Inventory />, path: "/products" },
  { name: "Add Product", icon: <Add />, path: "/add-product" },
  { name: "Inventory", icon: <ListAlt />, path: "/inventory" },
  { name: "Orders", icon: <ShoppingCart />, path: "/orders" },
  { name: "Reports", icon: <Assessment />, path: "/reports" },
  { name: "Customers", icon: <People />, path: "/customers" },
  { name: "Settings", icon: <Settings />, path: "/settings" },
  { name: "Analytics", icon: <BarChart />, path: "/analytics" },
];

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f9fafb 0%, #eef2f6 100%)",
        py: 8,
        px: 2,
      }}
    >
      {/* Heading Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#1976d2",
              textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
              letterSpacing: 1,
            }}
          >
            Welcome Back!
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#555",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Explore your account, manage your orders, and discover new deals —
            all in one place.
          </Typography>
        </motion.div>
      </Box>

      {/* Grid Section - use CSS Grid to avoid Unstable_Grid2 import */}
      <Box
        component="section"
        sx={{
          display: "grid",
          gap: 4, // theme spacing(4)
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          alignItems: "start",
        }}
      >
        {pages.map((page, index) => (
          <Box key={page.name}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                sx={{
                  height: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  color: "#333",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box sx={{ fontSize: 50, mb: 1, color: "#1976d2" }}>
                      {page.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {page.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#666", mt: 1, fontSize: "0.9rem" }}
                    >
                      {`Go to ${page.name}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
