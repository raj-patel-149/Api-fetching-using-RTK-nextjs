"use client";
import { Alert, Button } from "@mui/material";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  return (
    <center>
      <h1>you have logged in successfully.</h1>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          router.push("/");
          setShow(true);
        }}
      >
        Go to Login page
      </Button>

      {show && <Alert severity="success">Log in successfully,</Alert>}
    </center>
  );
};

export default page;
