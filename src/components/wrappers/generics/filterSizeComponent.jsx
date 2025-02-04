import { Chip, styled, Typography } from "@mui/material";
import React from "react";

const FilterTitle = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: theme.typography.pxToRem(16),
    color: theme.custom.primaryButtonFontColor,
}));

const FilterWrapper = styled("div")(({ theme }) => ({
  padding:"1vh",
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
  overflowY: "scroll",
  scrollbarWidth: "thin", // For Firefox
  scrollbarColor: "transparent transparent", // Hide scrollbar track and thumb
  "&::-webkit-scrollbar": {
      width: "0px", // Hide scrollbar track for Webkit browsers
      background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
      background: "#aaa", // Visible thumb
      borderRadius: "5px"
  },
  "&::-webkit-scrollbar-thumb:hover": {
      background: "#888"
  }
}));



const StyledChip = styled(Chip)(({ theme }) => ({
  color:theme.custom.primaryButtonFontColor,
  border: `0.3vh solid ${theme.custom.primaryButtonFontColor}`,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: "bold",
  borderRadius: "50%", // Ensures a circular shape
  width: theme.typography.pxToRem(40),
  height: theme.typography.pxToRem(40),
  minWidth: theme.typography.pxToRem(40), // Prevents shrinking
  minHeight: theme.typography.pxToRem(40),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  overflow: "hidden", // Ensures no content overflows
  whiteSpace: "nowrap", // Prevents text from breaking
  '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
  },
}));


function FilterSizeComponent({ sizeArr, selectedFilters, handleCheckboxChange }) {
    return (
        <>
            <FilterTitle>Size</FilterTitle>
            <FilterWrapper>
                {sizeArr?.data?.map((size) => (
                    <StyledChip
                        key={size.pk_size_id}
                        label={size.size_name}
                        onClick={() => handleCheckboxChange("size", size.pk_size_id)}
                        className={selectedFilters?.size?.includes(size.pk_size_id) ? "Mui-selected" : ""}
                    />
                ))}
            </FilterWrapper>
        </>
    );
}

export default FilterSizeComponent;
