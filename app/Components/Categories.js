"use client";
import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import CardContainer from "./CardContainer";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGetCategoriesQuery } from "@/store/apiSlice";
import { Skeleton } from "@mui/material";
import SkeletonPage from "./SkeletonPage";

const Categories = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

  const [selectedCategories, setSelectedCategories] = useState("");

  const handleChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  if (isLoading) return <SkeletonPage />;
  if (error) return <p>Error fetching categories.</p>;

  return (
    <div className="flex-col text-center">
      <Box>
        <FormControl sx={{ width: "250px" }}>
          <InputLabel id="demo-simple-select-label" value={selectedCategories}>
            Select Categories
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategories || ""}
            label="Select Categories"
            sx={{ color: "black" }}
            onChange={handleChange}
          >
            {categories.map((c, index) => (
              <MenuItem value={c} key={index}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className=" mt-7 text-2xl font-bold">
        Selected Categories :{"  "}
        <b className="hover:underline">{selectedCategories}</b>
      </div>
      <CardContainer category={selectedCategories} />
    </div>
  );
};

export default Categories;
