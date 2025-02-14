"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Forgot = () => {
  const router = useRouter();
  return (
    <center>
      <h2>Forgot Password Page</h2>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          router.push("/login");
        }}
      >
        Go to Login page
      </Button>
    </center>
  );
};

export default Forgot;
