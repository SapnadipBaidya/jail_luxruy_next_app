"use client";

import React from "react";
import TextAreaSkeleton from "./textAreaSkeleton";
import GenericBtns from "../buttons/GenericBtns";
import { Chip, Dialog, Paper, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

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
  backgroundColor:"red",
  padding:"1rem 0 1rem 0",
}));


const StyledPaper = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  color: theme.custom.primaryButtonFontColor,
  minWidth: "35vw",
  margin: theme.spacing(2),
  border: selected ? `2px solid ${theme.palette.primary.main}` : "none", // Add border if selected
  cursor: "pointer", // Add pointer cursor for better UX
  "&:hover": {
    border: `2px solid ${theme.palette.primary.main}`, // Add hover effect
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  color: theme.custom.primaryButtonFontColor,
}));

function ChooseAddress({
  savedAddresses,
  addressesLoading,
  toDeliverAddress,
  setToDeliverAddress,
}) {
  const [open, setOpen] = React.useState(false);

  const handleToDeliverAddressChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  const handleSelectAddress = (e, address) => {
    e.preventDefault();
    e.stopPropagation();
    setToDeliverAddress(address);
    handleClose(); // Close the dialog after selecting an address
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        fullWidth
        scroll="paper"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            minWidth: "80vw",
            maxWidth: "80vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            minHeight: "70vh",
            maxHeight: "70vh",
            overflow: "scroll",
          }}
        >
          {savedAddresses?.map((address) => (
            <StyledPaper
              key={address?.address_id}
              onClick={(e) => handleSelectAddress(e, address)}
              selected={toDeliverAddress?.address_id === address?.address_id} // Pass selected prop
            >
              <StyledChip
                label={`${address?.address_name} ${
                  address?.is_default ? "(Default)" : ""
                }`}
              />
              <Typography>{address?.adress_line1}</Typography>
              {address?.adress_line2 && (
                <Typography>{address?.adress_line2}</Typography>
              )}
              <Typography>
                {address?.state}, {address?.country} - {address?.pincode}
              </Typography>
            </StyledPaper>
          ))}
        </Stack>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GenericBtns
            type="secondary"
            btnText="ADD NEW ADDRESS"
            executableFunction={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push("/userContact");
            }}
            minWidth="10vw"
          />
        </div>
      </Dialog>

      {addressesLoading ? (
        <TextAreaSkeleton />
      ) : (
        <StyledDiv>
          <StyledText variant="h6">Choose Address to deliver</StyledText>
          <StyledText>
            <b>Deliver To -</b> {toDeliverAddress?.deliver_to}
          </StyledText>
          <StyledText>{toDeliverAddress?.adress_line1}</StyledText>
          <StyledText>{toDeliverAddress?.adress_line2}</StyledText>
          <StyledText>{toDeliverAddress?.state}</StyledText>
          <StyledText>{toDeliverAddress?.pincode}</StyledText>
          <StyledText>{toDeliverAddress?.phone_number}</StyledText>
          <GenericBtns
            className="changeaddressButton"
            type="secondary"
            btnText="Change Address"
            executableFunction={handleToDeliverAddressChange}
            minWidth="100%"
            
          />
        </StyledDiv>
      )}
    </div>
  );
}

export default ChooseAddress;