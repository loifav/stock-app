"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Modal,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  addCategory,
  fetchCategories,
  deleteCategory,
  updateCategory,
} from "@/reduxslice/categorySlice";
import { useSelector, useDispatch } from "react-redux";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editCategoryName, setEditCategoryName] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleOpenAddModal = () => setOpenAddModal(true);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    dispatch(addCategory({ name: newCategoryName }))
      .unwrap()
      .then(() => {
        setSnackbar({
          open: true,
          message: "Category added successfully",
          severity: "success",
        });
        setNewCategoryName("");
        handleCloseAddModal();
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: `Error ${error.error}`,
          severity: "error",
        });
      });
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleDeleteCategory = () => {
    dispatch(deleteCategory(selectedCategory?._id))
      .unwrap()
      .then(() => {
        setSnackbar({
          open: true,
          message: "Category deleted successfully",
          severity: "success",
        });
        handleCloseDeleteModal();
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: `Error ${error.error}`,
          severity: "error",
        });
      });
  };

  const handleOpenDeleteModal = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleOpenEditModal = (category) => {
    setOpenEditModal(true);
    setSelectedCategory(category);
    setEditCategoryName(category.name);
  };

  const handleEditCategory = () => {
    if (!editCategoryName.trim()) return;
    const updatedCategory = { ...selectedCategory, name: editCategoryName };
    dispatch(updateCategory(updatedCategory))
      .unwrap()
      .then(() => {
        setSnackbar({
          open: true,
          message: "Category updated successfully",
          severity: "success",
        });
        handleCloseEditModal();
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: `Error ${error.error}`,
          severity: "error",
        });
      });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const filteredCategories = categories.filter((category) =>
    category?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => setFilter(event.target.value);

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "primary.main",
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: "1px",
          borderBottom: 2,
          borderColor: "primary.main",
          pb: 1,
        }}
      >
        Categories
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search categories..."
            value={filter}
            onChange={handleFilterChange}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "primary.main" },
                "&:hover fieldset": { borderColor: "primary.main" },
                "&.Mui-focused fieldset": { borderColor: "primary.main" },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenAddModal}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 2,
              height: "100%",
              boxShadow: 2,
              ":hover": { bgcolor: "primary.dark" },
            }}
          >
            Add Category
          </Button>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", borderRadius: 3, boxShadow: 3 }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.light" }}>
              <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress color="primary" />
                    <Typography sx={{ ml: 2 }}>Loading...</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3}>Error: {error}</TableCell>
              </TableRow>
            ) : filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category, index) => (
                  <TableRow
                    key={category._id}
                    hover
                    sx={{
                      transition: "background 0.2s",
                      ":hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenEditModal(category)}>
                        <Edit
                          sx={{
                            color: "primary.main",
                            ":hover": { color: "primary.dark" },
                          }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(category)}
                      >
                        <Delete
                          sx={{
                            color: "error.main",
                            ":hover": { color: "error.dark" },
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ bgcolor: "background.paper", borderRadius: 2, mt: 1 }}
      />

      {/* Add Category Modal */}
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-category-modal"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography
            id="add-category-modal"
            variant="h6"
            fontWeight="bold"
            mb={2}
          >
            Add New Category
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            autoFocus
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "primary.main" },
                "&:hover fieldset": { borderColor: "primary.main" },
                "&.Mui-focused fieldset": { borderColor: "primary.main" },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              onClick={handleCloseAddModal}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-category-modal"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography
            id="edit-category-modal"
            variant="h6"
            fontWeight="bold"
            mb={2}
          >
            Edit Category
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Category Name"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            autoFocus
            sx={{
              mb: 3,
              bgcolor: "background.paper",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "primary.main" },
                "&:hover fieldset": { borderColor: "primary.main" },
                "&.Mui-focused fieldset": { borderColor: "primary.main" },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              onClick={handleCloseEditModal}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditCategory}
              disabled={!editCategoryName.trim()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Category Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-category-modal"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography
            id="delete-category-modal"
            variant="h6"
            fontWeight="bold"
            mb={2}
          >
            Delete Category
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Are you sure you want to delete <b>{selectedCategory?.name}</b>?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              onClick={handleCloseDeleteModal}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteCategory}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const modalBackdropStyle = {
  backdropFilter: "blur(5px)",
};

export default CategoryTable;
