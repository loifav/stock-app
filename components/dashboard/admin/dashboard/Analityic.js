"use client";

import {
  Box,
  Typography,
  Grid,
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafb", py: 8, px: 2 }}>
      {/* Heading */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
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
            Welcome to Your Dashboard
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
              mb: 4,
              lineHeight: 1.5,
              color: "#555",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Manage your products, inventory, and orders efficiently with our
            intuitive dashboard.
          </Typography>
        </motion.div>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={4} justifyContent="center">
        {pages.map((page, index) => (
          <Grid item key={page.name} xs={12} sm={6} md={4}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                sx={{
                  height: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  color: "#333",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
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
                    <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                      {`Go to ${page.name} section`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
