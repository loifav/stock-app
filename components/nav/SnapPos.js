import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledTypography = styled(Typography)({
  color: "#1976d2",
  fontSize: "2.5rem",
  fontWeight: "bold",
  letterSpacing: "0.05em",
});

const SnapPOS = () => {
  const logoText = "Inventra";
  return (
    <Box display="flex" alignItems="center">
      <StyledTypography>{logoText}</StyledTypography>
    </Box>
  );
};

export default SnapPOS;
