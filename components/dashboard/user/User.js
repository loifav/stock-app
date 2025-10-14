"use client";

import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
} from "@mui/material";

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import { useRouter } from "next/navigation";
import SnapPOS from "@/components/nav/SnapPos";

const drawerWidth = 280;

// Drawer ouvert
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#111",
});

// Drawer fermé
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
  backgroundColor: "#111",
});

// Header du Drawer
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

// AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#151521",
  color: "#fff",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Drawer stylé
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? { ...openedMixin(theme), "& .MuiDrawer-paper": openedMixin(theme) }
    : { ...closedMixin(theme), "& .MuiDrawer-paper": closedMixin(theme) }),
}));

// Style des boutons de la liste
const listItemStyles = (open) => ({
  minHeight: 48,
  justifyContent: open ? "initial" : "center",
  px: 2.5,
  borderRadius: 2,
  "&:hover": {
    background: "linear-gradient(90deg, #4facfe, #00f2fe)",
    color: "#fff",
    "& .MuiListItemIcon-root": {
      color: "#fff",
    },
  },
  transition: "all 0.3s ease",
  color: "#ccc",
});

export default function UserSidenav({ children }) {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handleNavigation = (path) => {
    router.push(`/dashboard/user/${path}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" open={open} elevation={2}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {"User Dashboard"}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <SnapPOS />
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "#fff" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: "#333" }} />

        {/* Dashboard */}
        <List>
          <Tooltip title={!open ? "Dashboard" : ""} placement="right" arrow>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => router.push("/dashboard/user")}
                sx={listItemStyles(open)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#4facfe",
                  }}
                >
                  <InboxIcon />
                </ListItemIcon>
                {open && (
                  <ListItemText primary="Dashboard" sx={{ color: "#fff" }} />
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>

        <Divider sx={{ borderColor: "#333" }} />

        {/* Transactions section */}
        <List>
          <Tooltip title={!open ? "Transactions" : ""} placement="right" arrow>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setTransactionOpen(!transactionOpen)}
                sx={listItemStyles(open)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#4facfe",
                  }}
                >
                  <MailIcon />
                </ListItemIcon>
                {open && (
                  <ListItemText primary="Transactions" sx={{ color: "#fff" }} />
                )}
                {open &&
                  (transactionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          <Collapse in={transactionOpen} timeout="auto" unmountOnExit>
            {["All Transactions", "Pending", "Completed"].map((text) => (
              <Tooltip
                key={text}
                title={!open ? text : ""}
                placement="right"
                arrow
              >
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 40,
                      justifyContent: open ? "initial" : "center",
                      px: open ? 4 : 2,
                      "&:hover": {
                        background: "#222",
                        color: "#4facfe",
                        borderRadius: 2,
                      },
                      transition: "all 0.3s ease",
                      color: "#ccc",
                    }}
                    onClick={() =>
                      router.push(
                        `/dashboard/transactions/${text
                          .toLowerCase()
                          .replace(" ", "-")}`
                      )
                    }
                  >
                    {open && <ListItemText primary={text} />}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ))}
          </Collapse>
        </List>

        {/* Manage Category */}
        <List>
          <Tooltip
            title={!open ? "Manage Category" : ""}
            placement="right"
            arrow
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleCollapse}
                sx={listItemStyles(open)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#4facfe",
                  }}
                >
                  <MailIcon />
                </ListItemIcon>
                {open && (
                  <>
                    <ListItemText
                      primary="Manage Category"
                      sx={{ color: "#fff" }}
                    />
                    {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </>
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            {["all-category"].map((text) => (
              <Tooltip
                key={text}
                title={!open ? text : ""}
                placement="right"
                arrow
              >
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => handleNavigation(text)}
                    sx={{
                      minHeight: 40,
                      justifyContent: open ? "initial" : "center",
                      px: open ? 4 : 2,
                      "&:hover": {
                        background: "#222",
                        color: "#4facfe",
                        borderRadius: 2,
                      },
                      transition: "all 0.3s ease",
                      color: "#ccc",
                    }}
                  >
                    {open && <ListItemText primary={text} />}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ))}
          </Collapse>
        </List>

        <Divider sx={{ borderColor: "#333" }} />
      </Drawer>

      {/* Contenu principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f4f5fa",
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
