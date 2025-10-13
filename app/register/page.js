"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import SnapPOS from "@/components/nav/SnapPos";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !password) {
      setSnackbarMessage("Please fill in all fields");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    console.log({ name, phone, email, password });

    // Save in database (replace with your API)
    try {
      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSnackbarMessage(data?.msg || "Registered successfully");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage(data.err || "Registration failed");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("An error occurred, please try again");
      setSnackbarSeverity("error");
    }
    setOpenSnackbar(true);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box
      sx={{
        backgroundColor: "#f9fafb", // same as homepage
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        component="form"
        onSubmit={handleRegister}
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
          sx={{ mb: 3, display: "flex", justifyContent: "center" }}
        >
          <SnapPOS />
        </Typography>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Register
        </Typography>

        <TextField
          label="Name"
          fullWidth
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Phone"
          fullWidth
          variant="outlined"
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <TextField
          label="Email"
          fullWidth
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 2,
            background: "linear-gradient(135deg, #1976d2, #42a5f5)",
            "&:hover": {
              background: "linear-gradient(135deg, #1565c0, #1e88e5)",
            },
          }}
        >
          Register
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link
            href="/login"
            sx={{
              textDecoration: "none",
              color: "inherit", // keeps it the same color as the surrounding text
              fontWeight: 500,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                color: "#1976d2",
              },
            }}
          >
            Already have an account? Login
          </Link>
        </Typography>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterPage;
