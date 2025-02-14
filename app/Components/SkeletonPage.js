"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Card, CardActions, CardContent } from "@mui/material";

const SkeletonPage = () => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <div className="grid grid-cols-3 gap-4 mt-10 mb-30 text-center relative">
      {data.map((i) => (
        <Card sx={{ maxWidth: 445, padding: "10px", boxShadow: 3 }} key={i}>
          <Skeleton variant="rectangular" width="100%" height={220} />
          <CardContent>
            <Skeleton variant="text" height={30} width="80%" />
            <Skeleton variant="text" height={20} width="60%" />
            <Skeleton variant="text" height={20} width="90%" />
          </CardContent>
          <CardActions>
            <Skeleton variant="rectangular" width={80} height={30} />
            <Skeleton variant="rectangular" width={80} height={30} />
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonPage;
