"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CardBox from "./CardBox";
import UpdateDialog from "./UpdateDialog";
import DeleteDialog from "./DeleteDialog";
import AddDialog from "./AddDialog";
import { Button } from "@mui/material";
import {
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductQuery,
} from "@/store/apiSlice";

const CardContainer = ({ category }) => {
  const { data: product = [], isLoading } = useGetProductQuery(category, {
    skip: !category,
  });

  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const [localProduct, setLocalProduct] = useState(product || []);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLocalProduct(product);
  }, [product.length]);

  const handleDeleteClick = (product) => {
    if (!product || !product.id) {
      console.error("Invalid product selected for deletion:", product);
      return;
    }
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct || !selectedProduct.id) {
      console.error("No valid product selected for deletion:", selectedProduct);
      return;
    }
    try {
      const id = selectedProduct.id;
      await deleteProduct(id).unwrap();
      setLocalProduct((prev) => prev.filter((p) => p.id !== id));
      setDeleteOpen(false);
      setSelectedProduct(null); // Reset after deletion
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleAddClick = () => {
    setAddOpen(true);
  };

  const handleConfirmAdd = (newProduct) => {
    const newProductWithID = {
      ...newProduct,
      id: Date.now(),
    };
    setLocalProduct((prevProducts) => [newProductWithID, ...prevProducts]);
    setAddOpen(false);
  };

  return (
    <div className="mt-5">
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: "10px" }}
      >
        Add Product
      </Button>
      <CardBox
        products={localProduct}
        onDeleteClick={(product) => handleDeleteClick(product)} // Pass the full product object
        loading={isLoading || deleting}
      />

      <DeleteDialog
        open={deleteOpen}
        product={selectedProduct}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <AddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onConfirm={handleConfirmAdd}
      />

      {/* <UpdateDialog
        open={updateOpen}
        product={updateProduct}
        onClose={() => setUpdateOpen(false)}
        onConfirm={handleUpdateConfirm}
      />
      

      */}
    </div>
  );
};

export default CardContainer;
