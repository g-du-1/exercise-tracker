"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { signIn } from "../util/api/signIn";
import { useRouter } from "next/router";
import { SignInResponse } from "../types";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    const resp: SignInResponse = await signIn(username, password);

    if (resp.status === 200) {
      await router.push("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "250px",
        margin: "auto",
        padding: 2,
      }}
    >
      <Typography variant="h6" component="h1" textAlign="center" mb={1}>
        Sign In
      </Typography>

      <TextField
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        variant="standard"
        sx={{ my: 1 }}
      />

      <TextField
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        variant="standard"
        sx={{ my: 1 }}
      />

      <Button onClick={handleSubmit} sx={{ my: 1 }}>
        Submit
      </Button>
    </Box>
  );
};

export default SignInPage;
