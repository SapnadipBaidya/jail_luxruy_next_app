"use client";

import React from "react";
import TextAreaSkeleton from "./textAreaSkeleton";
import GenericBtns from "../buttons/GenericBtns";
import { Dialog, styled, Typography } from "@mui/material";

const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.custom.primaryButtonFontColor,
}));

const StyledDiv = styled("div")(({ theme }) => ({
  color: theme.custom.primaryButtonFontColor,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "flex-start",
  minHeight: theme.typography.pxToRem(100),
}));
function ChooseAddress({ savedAddresses, addressesLoading, toDeliverAddress }) {
  console.log(
    "savedAddresses",
    savedAddresses,
    "toDeliverAddress",
    toDeliverAddress
  );
  const [open, setOpen] = React.useState(false);

  const handleToDeliverAddressChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        hello
      </Dialog>
      {addressesLoading ? (
        <TextAreaSkeleton />
      ) : (
        <StyledDiv>
          <StyledText variant="h5">Choose Address to deliver</StyledText>
          <StyledText><b>Deliver To -</b> {toDeliverAddress?.deliver_to}</StyledText>
          <StyledText>{toDeliverAddress?.adress_line1}</StyledText>
          <StyledText>{toDeliverAddress?.adress_line2}</StyledText>
          <StyledText>{toDeliverAddress?.state}</StyledText>
          <StyledText>{toDeliverAddress?.pincode}</StyledText>
          <StyledText>{toDeliverAddress?.phone_number}</StyledText>
          <StyledText>{}</StyledText>
          <GenericBtns
            type="secondary"
            btnText="Change Address"
            executableFunction={handleToDeliverAddressChange}
            minWidth="10vw"
          />
        </StyledDiv>
      )}
    </div>
  );
}

export default ChooseAddress;
