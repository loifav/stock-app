"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Switch,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
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

import SnapPOS from "@/components/nav/SnapPos";

// Page definitions
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

// Styled layout
const BackgroundBox = styled(Box)({
  backgroundColor: "#f9fafb",
  minHeight: "100vh",
  padding: "4rem 2rem",
  textAlign: "center",
});

const ContentBox = styled(Box)({
  maxWidth: "1200px",
  margin: "0 auto",
});

const Home = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();

  return (
    <BackgroundBox>
      <ContentBox>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <SnapPOS />
        </Box>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "#333",
            }}
          >
            Product Inventory Management
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#555",
              mb: 4,
            }}
          >
            Manage your products, inventory, and orders efficiently.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/login")}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              padding: "0.8rem 2.5rem",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Get Started
          </Button>
        </motion.div>

        {/* Subscription Toggle */}
        <Box sx={{ my: 8 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 500,
              color: "#333",
            }}
          >
            Choose Your Plan
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Typography>Monthly</Typography>
            <Switch
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <Typography>Annual</Typography>
          </Stack>

          <Typography
            sx={{
              mt: 2,
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "#1976d2",
            }}
          >
            {isAnnual ? "$99 / year" : "$10 / month"}
          </Typography>
        </Box>

        {/* Navigation Cards */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          {pages.map((page, index) => (
            <Grid
              key={page.name}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{ width: "100%", maxWidth: "300px" }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: 200,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={() => router.push(page.path)}
                >
                  <CardActionArea>
                    <CardContent
                      sx={{
                        textAlign: "center",
                        py: 4,
                      }}
                    >
                      <Box sx={{ fontSize: 48, color: "#1976d2", mb: 1 }}>
                        {page.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 500, color: "#333" }}
                      >
                        {page.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#666", mt: 0.5 }}
                      >
                        Go to {page.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </ContentBox>
    </BackgroundBox>
  );
};

export default Home;
