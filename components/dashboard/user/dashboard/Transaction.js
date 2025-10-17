"use client";

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { green, orange } from "@mui/material/colors";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "@mui/material/styles";

// 🔹 Données d’exemple (identiques à Admin)
const transactions = [
  {
    name: "Charles Casey",
    position: "Web Developer",
    status: "Active",
    age: 23,
    startDate: "04 Apr, 2021",
    salary: "$42,450",
    statusColor: green[500],
  },
  {
    name: "Alex Adams",
    position: "Python Developer",
    status: "Deactivate",
    age: 28,
    startDate: "01 Aug, 2021",
    salary: "$25,060",
    statusColor: orange[500],
  },
  {
    name: "Prezy Kelsey",
    position: "Senior Javascript Developer",
    status: "Active",
    age: 35,
    startDate: "15 Jun, 2021",
    salary: "$59,350",
    statusColor: green[500],
  },
  {
    name: "Ruhi Fancher",
    position: "React Developer",
    status: "Active",
    age: 25,
    startDate: "01 Mar, 2021",
    salary: "$23,700",
    statusColor: green[500],
  },
];

const LatestTransactions = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer
      component={Paper}
      sx={{
        mb: 3,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 250 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <Typography fontWeight={600}>Name</Typography>
            </TableCell>
            {!isSmallScreen && (
              <TableCell>
                <Typography fontWeight={600}>Position</Typography>
              </TableCell>
            )}
            <TableCell>
              <Typography fontWeight={600}>Status</Typography>
            </TableCell>
            {!isSmallScreen && (
              <TableCell>
                <Typography fontWeight={600}>Age</Typography>
              </TableCell>
            )}
            {!isSmallScreen && (
              <TableCell>
                <Typography fontWeight={600}>Start Date</Typography>
              </TableCell>
            )}
            <TableCell>
              <Typography fontWeight={600}>Salary</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((t, idx) => (
            <TableRow
              key={idx}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  cursor: "pointer",
                },
                transition: "background-color 0.3s",
              }}
            >
              <TableCell>
                <Typography color="#222">{t.name}</Typography>
              </TableCell>
              {!isSmallScreen && (
                <TableCell>
                  <Typography color="#555">{t.position}</Typography>
                </TableCell>
              )}
              <TableCell>
                <Box display="flex" alignItems="center">
                  <CircleIcon
                    sx={{ color: t.statusColor, mr: 1.2, fontSize: 12 }}
                  />
                  <Typography color="#555">{t.status}</Typography>
                </Box>
              </TableCell>
              {!isSmallScreen && (
                <TableCell>
                  <Typography color="#555">{t.age}</Typography>
                </TableCell>
              )}
              {!isSmallScreen && (
                <TableCell>
                  <Typography color="#555">{t.startDate}</Typography>
                </TableCell>
              )}
              <TableCell>
                <Typography color="#555">{t.salary}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LatestTransactions;
