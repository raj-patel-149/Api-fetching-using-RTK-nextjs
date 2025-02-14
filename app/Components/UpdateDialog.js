"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";

const UpdateDialog = ({ open, product, onClose, onConfirm }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      image: null,
    },
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        image: product.image || null,
      });

      setImagePreview(product.image || ""); // Set preview if image exists
    }
  }, [product, reset]);

  const onSubmit = (data) => {
    if (!data.image) {
      console.warn("No image selected");
    }

    const updatedProduct = {
      ...data,
      image: data.image instanceof File ? data.image : product.image, // Keep original if not changed
    };

    console.log("Updated Data:", updatedProduct);
    onConfirm(updatedProduct);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="bg-black text-white text-center w-[97%]">
        Update Product
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title"
            {...register("title", { required: "Title is required" })}
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Price"
            type="number"
            {...register("price", { required: "Price is required" })}
            fullWidth
            margin="normal"
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <TextField
            label="Description"
            {...register("description", {
              required: "Description is required",
            })}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "150px", maxHeight: "150px", marginTop: "10px" }}
            />
          )}

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <Input
                {...field}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setValue("image", file, { shouldValidate: true });
                    setImagePreview(URL.createObjectURL(file)); // Update preview
                    trigger("image");
                    onChange(file);
                  }
                }}
                style={{ marginTop: "10px" }}
              />
            )}
          />

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" autoFocus>
              Update
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
