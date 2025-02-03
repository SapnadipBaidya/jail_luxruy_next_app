"use client";

import React, { useState } from "react";
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

export default function UserProfileAddressClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    mobile: "",
    email: "",
    pinCode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    type: "Home",
    isDefault: false,
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [customAddressType, setCustomAddressType] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedAddresses((prev) => [...prev, formData]);
    setFormData({
      firstName: "",
      secondName: "",
      mobile: "",
      email: "",
      pinCode: "",
      address: "",
      locality: "",
      city: "",
      state: "",
      type: "Home",
      isDefault: false,
    });
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveCustomAddress = () => {
    if (customAddressType.trim() !== "") {
      setFormData((prev) => ({ ...prev, type: customAddressType }));
    }
    setCustomAddressType("");
    setOpenDialog(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      {savedAddresses.length > 0 && (
        <Accordion sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Saved Addresses</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              {savedAddresses.map((address, index) => (
                <Paper key={index} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {address.type} {address.isDefault && "(Default)"}
                  </Typography>
                  <Typography>
                    {address.firstName} {address.secondName}
                  </Typography>
                  <Typography>{address.address}</Typography>
                  <Typography>
                    {address.locality}, {address.city}, {address.state} - {address.pinCode}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}

      <Paper sx={{ p: 3, borderRadius: 2, position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={toggleEdit}
        >
          {isEditing ? <CloseIcon /> : <EditIcon />}
        </IconButton>

        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Contact Details
          </Typography>
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { sm: "1fr 1fr" } }}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="Second Name"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
              required
              fullWidth
              disabled={!isEditing}
            />
          </Box>
          <TextField
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isEditing}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isEditing}
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Address
          </Typography>
          <TextField
            label="Pin code"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
            fullWidth
            disabled={!isEditing}
          />
          <TextField
            label="Address (House No., Building, Street, Area)"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={2}
            sx={{ mt: 2 }}
            disabled={!isEditing}
          />
          <TextField
            label="Locality/Town"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isEditing}
          />
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { sm: "1fr 1fr" }, mt: 2 }}>
            <TextField
              label="City/District"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              fullWidth
              disabled={!isEditing}
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isDefault}
                onChange={handleChange}
                name="isDefault"
                disabled={!isEditing}
              />
            }
            label="Make this my default address"
            sx={{ mt: 2 }}
          />

          <Typography sx={{ mt: 2 }}>Save address as</Typography>
          <RadioGroup
            row
            name="type"
            value={formData.type}
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            <FormControlLabel value="Home" control={<Radio />} label="Home" disabled={!isEditing} />
            <FormControlLabel value="Work" control={<Radio />} label="Work" disabled={!isEditing} />
            <FormControlLabel
              value="Other"
              control={<Radio />}
              label="Other"
              disabled={!isEditing}
              onClick={handleOpenDialog}
            />
          </RadioGroup>

          {isEditing && (
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              SAVE DETAILS
            </Button>
          )}
        </form>
      </Paper>
    </Box>
  );
}
