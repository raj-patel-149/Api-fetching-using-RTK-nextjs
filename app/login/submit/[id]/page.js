"use client";

import { Button } from "@mui/material";
import { useParams } from "next/navigation";

const ProductPage = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div>
      <center>
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: 20, height: 77, fontWeight: 700 }}
        >
          Product Id : {id}
        </Button>
      </center>
    </div>
  );
};

export default ProductPage;
