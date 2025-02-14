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
import Chip from "@mui/material/Chip";

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

  // Wrap fetchAddresses in useCallback to make it stable and callable on demand
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
        // Instead of router.refresh(), simply re-fetch the addresses.
        fetchAddresses();
      }
    } catch (err) {
      setError("Failed to save address");
    }
  };

  const handleEditAddress = (address) => {
    setFormData({
      addressLine1: address.address_line1,
      addressLine2: address.address_line2,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
      addressName: address.address_name,
      isDefault: address.is_default,
    });
    setEditingAddressId(address.address_id);
    setIsEditing(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteUserAddress({ addressId });
      // Option 1: Update local state immediately
      setSavedAddresses((prev) =>
        prev.filter((addr) => addr.address_id !== addressId)
      );
      // Option 2: Re-fetch addresses to ensure consistency:
      // fetchAddresses();
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
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThreeDotLoader />
      </div>
    );
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Saved Addresses ({savedAddresses?.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {savedAddresses?.map((address) => (
              <Paper
                key={address.address_id}
                sx={{ p: 2, position: "relative" }}
              >
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => handleDeleteAddress(address.address_id)}
                  aria-label="delete address"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 40 }}
                  onClick={() => handleEditAddress(address)}
                  aria-label="edit address"
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <Chip
                  label={`${address.address_name} ${
                    address.is_default ? "(Default)" : ""
                  }`}
                />

                <Typography>{address.address_line1}</Typography>
                {address.adress_line2 && (
                  <Typography>{address.adress_line2}</Typography>
                )}
                <Typography>
                  {address.state}, {address.country} - {address.pincode}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Paper sx={{ p: 3, borderRadius: 2, position: "relative" }}>
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

          <TextField
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Address Line 2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "1fr 1fr",
              mt: 2,
            }}
          >
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Box>
          <TextField
            label="Postal Code"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mt: 2 }}
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

          <Button
            onClick={handleSaveAddress}
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            {editingAddressId ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
          </Button>
        </Box>
      </Paper>

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
