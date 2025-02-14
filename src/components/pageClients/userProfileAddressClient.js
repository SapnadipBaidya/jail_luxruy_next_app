"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addOrEditUserAddress,
  getUserAddresses,
  deleteUserAddress,
} from "@/utils/API_lib";
import ThreeDotLoader from "../loaders/threeDotLoader";
import { useRouter } from "next/navigation";

// Styled Components
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  color:theme.custom.primaryButtonFontColor,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  color:theme.custom.primaryButtonFontColor,
}));

const StyledFormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  color:theme.custom.primaryButtonFontColor,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  color:theme.custom.primaryButtonFontColor,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  color:theme.custom.primaryButtonFontColor,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  color:theme.custom.primaryButtonFontColor,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  color:theme.custom.primaryButtonFontColor,
  
}));

const StyledEditIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 40,
  color:theme.custom.primaryButtonFontColor,
}));

const StyledLoaderContainer = styled("div")(({ theme }) => ({
  minHeight: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color:theme.custom.primaryButtonFontColor,
}));

export default function UserProfileAddressClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    state: "",
    country: "",
    pincode: "",
    addressName: "Home",
    isDefault: false,
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Fetch addresses
  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserAddresses();
      setSavedAddresses(response.data || []);
    } catch (err) {
      setError("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveAddress = async () => {
    try {
      const payload = {
        ...formData,
        addressId: editingAddressId,
        defaultAddress: formData.isDefault,
      };

      const response = await addOrEditUserAddress(payload);
      if (response.success) {
        resetForm();
        fetchAddresses();
      }
    } catch (err) {
      setError("Failed to save address");
    }
  };

  const handleEditAddress = (address) => {
    setFormData({
      addressLine1: address?.adress_line1,
      addressLine2: address?.adress_line2,
      state: address?.state,
      country: address?.country,
      pincode: address?.pincode,
      addressName: address?.address_name,
      isDefault: address?.is_default,
    });
    setEditingAddressId(address?.address_id);
    setIsEditing(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteUserAddress({ addressId });
      setSavedAddresses((prev) =>
        prev.filter((addr) => addr.address_id !== addressId)
      );
    } catch (err) {
      setError("Failed to delete address");
    }
  };

  const resetForm = () => {
    setFormData({
      addressLine1: "",
      addressLine2: "",
      state: "",
      country: "",
      pincode: "",
      addressName: "Home",
      isDefault: false,
    });
    setEditingAddressId(null);
    setIsEditing(false);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  if (loading)
    return (
      <StyledLoaderContainer>
        <ThreeDotLoader />
      </StyledLoaderContainer>
    );
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Saved Addresses ({savedAddresses?.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {savedAddresses?.map((address) => (
              <StyledPaper key={address?.address_id}>
                <StyledIconButton
                  onClick={() => handleDeleteAddress(address?.address_id)}
                  aria-label="delete address"
                >
                  <DeleteIcon fontSize="small" />
                </StyledIconButton>
                <StyledEditIconButton
                  onClick={() => handleEditAddress(address)}
                  aria-label="edit address"
                >
                  <EditIcon fontSize="small" />
                </StyledEditIconButton>

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
        </AccordionDetails>
      </StyledAccordion>

      <StyledFormContainer>
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={resetForm}
          aria-label="reset form"
        >
          {isEditing ? <CloseIcon /> : <EditIcon />}
        </IconButton>

        <Box>
          <Typography variant="h6" gutterBottom>
            {editingAddressId ? "Edit Address" : "Add New Address"}
          </Typography>

          <StyledTextField
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            required
            fullWidth
          />
          <StyledTextField
            label="Address Line 2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            fullWidth
          />
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "1fr 1fr",
              mt: 2,
            }}
          >
            <StyledTextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <StyledTextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Box>
          <StyledTextField
            label="Postal Code"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            fullWidth
          />

          <Typography sx={{ mt: 2 }}>Address Type</Typography>
          <RadioGroup
            row
            name="addressName"
            value={formData.addressName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
            <FormControlLabel value="Work" control={<Radio />} label="Work" />
            <FormControlLabel
              value="Other"
              control={<Radio />}
              label="Other"
              onClick={handleOpenDialog}
            />
          </RadioGroup>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isDefault}
                onChange={handleChange}
                name="isDefault"
              />
            }
            label="Set as default address"
            sx={{ mt: 1 }}
          />

          <StyledButton
            onClick={handleSaveAddress}
            variant="contained"
            fullWidth
          >
            {editingAddressId ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
          </StyledButton>
        </Box>
      </StyledFormContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Custom Address Type</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Custom Address Name"
            fullWidth
            value={formData.addressName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                addressName: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}