"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
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
import { motion } from "framer-motion";

const pages = [
  { name: "12", icon: <Dashboard />, path: "/dashboard" },
  { name: "32", icon: <Inventory />, path: "/products" },
  { name: "35", icon: <Add />, path: "/add-product" },
  { name: "63", icon: <ListAlt />, path: "/inventory" },
  { name: "65", icon: <ShoppingCart />, path: "/orders" },
  { name: "32", icon: <Assessment />, path: "/reports" },
  { name: "45", icon: <People />, path: "/customers" },
  { name: "35", icon: <Settings />, path: "/settings" },
  { name: "65", icon: <BarChart />, path: "/analytics" },
];

const BackgroundBox = styled(Box)({
  backgroundImage: 'url("/images/pos1.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  padding: "6rem 2rem",
  textAlign: "center",
  color: "#fff",
  overflow: "hidden",
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  zIndex: 1,
});

const ContentBox = styled(Box)({
  position: "relative",
  zIndex: 2,
});

const Home = () => {
  return (
    <BackgroundBox>
      <Overlay />
      <ContentBox>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welcome to the Product Inventory System
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Typography
                variant="h6"
                color="inherit"
                sx={{
                  mb: 4,
                  lineHeight: 1.5,
                  color: "#dcdcdc",
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                Manage your products, inventory, and orders efficiently with our
                intuitive dashboard.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {pages.map((page, index) => (
            <Grid item key={page.name} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <Card
                  sx={{
                    minHeight: 180,
                    borderRadius: 3,
                    backgroundColor: "#1e1e1e",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 25px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  <CardActionArea>
                    <CardContent sx={{ textAlign: "center", padding: "2rem" }}>
                      <Box sx={{ fontSize: 50, mb: 1, color: "#4facfe" }}>
                        {page.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 600 }}
                      >
                        {page.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
                        {`Go to ${page.path} section`}
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
