"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Paper,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import SnapPOS from "@/components/nav/SnapPos";

const LoginComponent = () => {
  const { data } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setSnackbar({
          open: true,
          message: result?.error || "Login failed!",
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        if (data) {
          router.push(`/dashboard/${data?.user?.role}`);
        }
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9fafb", // same as homepage
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 5,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          backgroundColor: "#fff",
          color: "#333",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SnapPOS />
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Login
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            background: "linear-gradient(135deg, #1976d2, #42a5f5)",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              background: "linear-gradient(135deg, #1565c0, #1e88e5)",
            },
          }}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 3, color: "#555" }}>
          <Link
            href="/register"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 500,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                color: "#1976d2",
              },
            }}
          >
            Don’t have an account? Sign Up
          </Link>
        </Typography>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginComponent;
