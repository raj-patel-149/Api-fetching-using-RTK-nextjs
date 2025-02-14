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

const AddDialog = ({ open, onClose, onConfirm }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
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

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (open) {
      reset();
      setImagePreview(null);
    }
  }, [open, reset]);

  const onSubmit = (data) => {
    if (!data.image) {
      console.error("No image selected");
      return;
    }

    const newProduct = {
      ...data,
      image: data.image,
    };

    console.log("Uploaded File:", newProduct.image);
    console.log("Preview URL:", URL.createObjectURL(newProduct.image));

    onConfirm(newProduct);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="bg-black text-white text-center w-[97%]">
        Add New Product
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
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
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
            rules={{ required: "Image is required" }}
            render={({ field: { onChange, value, ...field } }) => (
              <Input
                {...field}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setValue("image", file, { shouldValidate: true });
                    setImagePreview(URL.createObjectURL(file));
                    trigger("image");
                    onChange(file);
                  } else {
                    setValue("image", null, { shouldValidate: true });
                    setImagePreview(null);
                    trigger("image");
                  }
                }}
                style={{ marginTop: "10px" }}
              />
            )}
          />

          {errors.image && (
            <p style={{ color: "red" }}>{errors.image.message}</p>
          )}

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" autoFocus>
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
