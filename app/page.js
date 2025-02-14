"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="landing">
      <div className="loginButton">
        <Button
          variant="contained"
          onClick={() => {
            router.push("/login");
          }}
          style={{
            margin: "5px",
            fontSize: 15,
            backgroundColor: "Black",
          }}
        >
          Go to Login Page
        </Button>
      </div>
      <div style={{ marginLeft: 500 }}>
        <h2>This is the Landing Page</h2>
      </div>
    </div>
  );
};

export default LandingPage;
