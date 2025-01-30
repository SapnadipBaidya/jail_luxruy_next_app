import { Checkbox, FormControlLabel, styled, Typography } from "@mui/material";
import React from "react";
import TextAreaSkeleton from "../textAreaSkeleton";


const FilterTitle = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: theme.typography.pxToRem(16),
    color: theme.custom.primaryButtonFontColor,
  }));

const CheckboxWrapper =   styled(Checkbox)(({ theme }) => ({
  color: theme.custom.primaryButtonFontColor,
    "&.Mui-checked": { color: theme.palette.ascentColor.main },
    

  }));

const StyledText = styled(Typography)(({ theme }) => ({
    color: theme.custom.primaryButtonFontColor,
  }));
  
function FilterSizeComponent({ sizeArr,sizeLoading ,selectedFilters,handleCheckboxChange}) {
    console.log("sizeArr",sizeArr)
  return (
    <>
      <FilterTitle>Size</FilterTitle>
      {  sizeArr?.data?.map((size) => (
        <FormControlLabel
          key={"size"+size?.pk_size_id}
          control={
            <CheckboxWrapper
              checked={selectedFilters?.size?.includes(size?.pk_size_id)}
              onChange={() => handleCheckboxChange("size", size?.pk_size_id)}
            />
          }
          label={<StyledText>{size?.size_name}</StyledText>}
        />
      ))}
    </>
  );
}

export default FilterSizeComponent;
