"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const CardBox = ({ products, onDeleteClick }) => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-10 mb-30 text-center relative">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 245,
                maxWidth: 345,
                border: "2px solid white",
                padding: "10px",
                paddingBottom: "0",
                transition: "border 0.3s",
                "&:hover": {
                  border: "2px solid #07dbd8",
                },
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
              }}
              className="relative hover:border-2 hover:border-yellow-300"
            >
              <div className=" mt-1 mb-3 absolute right-2">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    width: "80px",
                    height: "30px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    padding: "10px",
                  }}
                  onClick={() => onDeleteClick(product)}
                >
                  Delete
                </Button>
              </div>
              <div className=" mt-1 mb-3 absolute left-2">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "green",
                    width: "80px",
                    height: "30px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    padding: "10px",
                  }}
                >
                  Update
                </Button>
              </div>
              <CardMedia
                sx={{
                  objectFit: "contain",
                  width: "100%",
                  height: "220px",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  bgcolor: "white ",
                }}
                className="mt-10"
                image={product.image}
                title={product.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  component="div"
                  className="text-2xl font-bold"
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions className="flex justify-center">
                <Button size="small" sx={{ color: "black", fontSize: "20px" }}>
                  Price :
                  <b className="text-red-700 ml-2 border-2 p-2">
                    ${product.price}
                  </b>
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography
            variant="h6"
            className="text-gray-600 text-center w-[100%] absolute"
            sx={{ width: "100%" }}
          >
            No products found.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default CardBox;
