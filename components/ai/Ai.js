"use client";
import React, { useState } from "react";
import {
  Button,
  Box,
  Modal,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import Markdown from "react-markdown";
import { runAi } from "@/ai/ai";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "80%",
  bgcolor: "#121212",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  color: "#fff",
};

export default function AiPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(response?.text || "")
      .then(() => alert("Content copied to clipboard!"))
      .catch((err) => console.log("Could not copy text:", err));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await runAi(query);
      setResponse(data);
      handleOpen();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
        backgroundColor: "#f9fafb",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
          Generate Content with AI
        </Typography>

        <form onSubmit={handleClick}>
          <TextField
            fullWidth
            label="Enter your prompt"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0, #1e88e5)",
              },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Generate"
            )}
          </Button>
        </form>

        {/* AI Response Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              AI Response
            </Typography>
            <Box sx={{ maxHeight: "65%", overflowY: "auto", mb: 3 }}>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Markdown>{response?.text || ""}</Markdown>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={copyToClipboard}
                sx={{
                  background: "linear-gradient(135deg, #42a5f5, #1976d2)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1e88e5, #1565c0)",
                  },
                }}
              >
                Copy to Clipboard
              </Button>
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#42a5f5",
                  "&:hover": { borderColor: "#1976d2" },
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
