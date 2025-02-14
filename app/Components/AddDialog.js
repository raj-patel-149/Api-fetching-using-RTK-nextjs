"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddDialog = ({ open, onClose, onConfirm }) => {
  const initialProductState = {
    title: "",
    price: "",
    description: "",
    image: "",
  };
  const [newProduct, setNewProduct] = useState(initialProductState);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (open) {
      setNewProduct(initialProductState);
    }
  }, [open]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({
        ...newProduct,
        image: URL.createObjectURL(file),
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="bg-black text-white text-center w-[97%]">
        Add New Product
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={newProduct.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        {newProduct.image && (
          <img
            src={newProduct.image}
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
        <Button onClick={() => onConfirm(newProduct)} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
