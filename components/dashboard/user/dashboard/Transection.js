"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { green, orange } from "@mui/material/colors";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "@mui/material/styles";

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
    startDate: "01 March, 2021",
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
        overflowX: "auto",
        mb: 3,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Table sx={{ minWidth: 250 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600} color="#333">
                Name
              </Typography>
            </TableCell>
            {!isSmallScreen && (
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color="#333">
                  Position
                </Typography>
              </TableCell>
            )}
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600} color="#333">
                Status
              </Typography>
            </TableCell>
            {!isSmallScreen && (
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color="#333">
                  Age
                </Typography>
              </TableCell>
            )}
            {!isSmallScreen && (
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600} color="#333">
                  Start Date
                </Typography>
              </TableCell>
            )}
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600} color="#333">
                Salary
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={index}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  cursor: "pointer",
                },
                transition: "background-color 0.3s",
              }}
            >
              <TableCell>
                <Typography variant="body2" color="#222">
                  {transaction.name}
                </Typography>
              </TableCell>
              {!isSmallScreen && (
                <TableCell>
                  <Typography variant="body2" color="#555">
                    {transaction.position}
                  </Typography>
                </TableCell>
              )}
              <TableCell>
                <Box display="flex" alignItems="center">
                  <CircleIcon
                    sx={{
                      color: transaction.statusColor,
                      mr: 1.2,
                      fontSize: 12,
                    }}
                  />
                  <Typography variant="body2" color="#555">
                    {transaction.status}
                  </Typography>
                </Box>
              </TableCell>
              {!isSmallScreen && (
                <TableCell>
                  <Typography variant="body2" color="#555">
                    {transaction.age}
                  </Typography>
                </TableCell>
              )}
              {!isSmallScreen && (
                <TableCell>
                  <Typography variant="body2" color="#555">
                    {transaction.startDate}
                  </Typography>
                </TableCell>
              )}
              <TableCell>
                <Typography variant="body2" color="#555">
                  {transaction.salary}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LatestTransactions;
