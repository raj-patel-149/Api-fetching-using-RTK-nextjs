"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const UpdateDialog = ({ open, product, onClose, onConfirm }) => {
  const [updatedData, setUpdatedData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    imagePreview: "",
  });

  useEffect(() => {
    if (product) {
      setUpdatedData({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        image: product.image || "",
        imagePreview: product.image || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedData({
        ...updatedData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="bg-black text-white text-center w-[97%]">
        Update Product
      </DialogTitle>
      <DialogContent className="mt-2">
        <TextField
          label="Title"
          name="title"
          value={updatedData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={updatedData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={updatedData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        {updatedData.imagePreview && (
          <img
            src={updatedData.imagePreview}
            alt="Preview"
            style={{ width: "150px", maxHeight: "150px", marginTop: "10px" }}
          />
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: "10px" }}
          className="border-2 border-black p-2 cursor-pointer"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onConfirm(updatedData)} autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
