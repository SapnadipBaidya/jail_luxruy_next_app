import  { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Card, TextField, styled } from "@mui/material";

// ✅ Neumorphic Styled Pagination Container (No Borders)
const StyledPaginationContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "8vh",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  margin:theme.spacing(1),
  flexDirection: "row",
  borderRadius: "50px",
  background: theme.palette.mode === "dark" ? "#252525" : "#f0f0f0",
  boxShadow: theme.palette.mode === "dark"
    ? "15px 15px 30px #1a1a1a, -15px -15px 30px #3a3a3a"
    : "20px 20px 60px #c8c8c8, -20px -20px 60px #ffffff",
  transition: "all 0.3s ease-in-out",
  border: "none", // ✅ Removed border

  "&:hover": {
    boxShadow: theme.palette.mode === "dark"
      ? "5px 5px 15px #121212, -5px -5px 15px #3d3d3d"
      : "10px 10px 30px #d1d1d1, -10px -10px 30px #ffffff",
  },

  [theme.breakpoints.down("md")]: {
    minHeight: "10vh",
    flexDirection: "column",
  },
}));

// ✅ Styled Input Box (No Borders, Seamless)
const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: "5vw",
  maxWidth: "10vw",
  textAlign: "center",
  borderRadius: "10px",
  fontWeight: "bold",
  background: theme.palette.mode === "dark" ? "#252525" : "#f5f5f5",
  boxShadow: theme.palette.mode === "dark"
    ? "inset 4px 4px 8px #1a1a1a, inset -4px -4px 8px #3d3d3d"
    : "inset 6px 6px 12px #dcdcdc, inset -6px -6px 12px #ffffff",
  border: "none",
  outline: "none", 

  "& input": {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "600",
    color: theme.palette.mode === "dark" ? "#ddd" : "#333",
  },
  "&:hover, &:focus": {
    boxShadow: theme.palette.mode === "dark"
      ? "inset 2px 2px 6px #121212, inset -2px -2px 6px #3d3d3d"
      : "inset 4px 4px 8px #bcbcbc, inset -4px -4px 8px #ffffff",
  },
}));

// ✅ Custom Pagination Styling (No Borders, Soft Look)
const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "10px",
    padding: "0.6rem",
    transition: "all 0.3s ease-in-out",
    background: "transparent",
    boxShadow: "none", // ✅ Removed border & shadow
    color:theme.custom.primaryButtonFontColor,
    "&:hover": {
      background: theme.palette.primary.main,
      color: "#fff",
      transform: "scale(1.1)",
    },

    "&.Mui-selected": {
      background: theme.palette.primary.main,
      color: "#fff",
      transform: "scale(1.1)",
      boxShadow: "none",
    },
  },
}));

export default function PaginationComponent({ page, setPage, count = 10 }) {
  const [inputValue, setInputValue] = useState(page);

  // ✅ Handle Page Change from Pagination Clicks
  const handleChange = (event, value) => {
    event.stopPropagation();
    setPage(value);
    setInputValue(value);
  };

  // ✅ Update Input Value but Don't Change Page Immediately
  const handleInputChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let value = event.target.value.replace(/[^0-9]/g, "");
    setInputValue(value);
  };

  // ✅ Change Page Only When Enter is Pressed
  const handleKeyDown = (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      let value = inputValue ? Math.min(Math.max(parseInt(inputValue, 10), 1), count) : 1;
      setPage(value);
    }
  };

  return (
    <StyledPaginationContainer>
      <Stack spacing={2} direction="row" alignItems="center">
        {/* ✅ Page Input Box */}
        <StyledTextField
          variant="standard" // ✅ Removes MUI border
          size="small"
          value={inputValue}
          onChange={(e)=>handleInputChange(e)}
          onKeyDown={handleKeyDown}
          InputProps={{
            disableUnderline: true, // ✅ Removes underline border
          }}
        />

        {/* ✅ Pagination Component */}
        <StyledPagination
          count={count}
          page={Number(page) || 1}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
    </StyledPaginationContainer>
  );
}
