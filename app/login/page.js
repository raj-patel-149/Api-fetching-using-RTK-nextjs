"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { setCookie } from "cookies-next/client";

export default function Home() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Formate")
      .required("Email is required"),
    password: Yup.string()
      .min(10, "Password must  be at least 10 characters")
      .matches(/[a-z]/, "Must contail at least one lowercase letter")
      .matches(/[A-Z]/, "Must contail at least one Capital letter")
      .matches(/\d/, "Must contail at least one number")
      .matches(/[@$!%*?&]/, "Must contail at least one special character")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setCookie("authToken", "123456", { maxAge: 60 * 60 * 24 });
      alert(JSON.stringify(values, null, 2));
      router.push("/homePage");
    },
  });

  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div>
          <img
            src="/loginimage.PNG"
            alt="Login Image"
            className={styles.image}
          />
        </div>
        <div className={styles.field}>
          <h1 className={styles.heading}>Login Page</h1>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                name="email"
                id="input-with-sx"
                label="Enter Email"
                variant="standard"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                marginTop: 2,
                marginBottom: 0.8,
              }}
            >
              <VisibilityIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Enter Password"
                variant="standard"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>

            <p
              className={styles.forgot}
              onClick={() => {
                router.push("/login/forgotpassword");
              }}
            >
              Forgot Your Password
            </p>

            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                // alert("You have Login Successfully");
                // setShow(true);
              }}
            >
              Submit
            </Button>
          </form>

          {/* {show && <Alert severity="success">Log in successfully,</Alert>} */}

          <hr className={styles.line} />
          <p className={styles.or}>Or</p>
          <p className={styles.register}>
            Don't have account ? <b>Register Now</b>
          </p>
        </div>
      </div>
    </div>
  );
}
