"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState } from "react";
import { signIn } from "../util/api/signIn";
import { useRouter } from "next/navigation";
import { SignInResponse } from "../types";
import { Alert } from "@mui/material";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const resp: SignInResponse = await signIn(username, password);

    if (resp.status === 200) {
      router.push("/");
    } else {
      setError("Login failed. Please try again.");
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
        onChange={handleUserNameChange}
        label="Username"
        variant="standard"
        sx={{ my: 1 }}
      />

      <TextField
        onChange={handlePasswordChange}
        label="Password"
        variant="standard"
        sx={{ my: 1 }}
      />

      <Button onClick={handleSubmit} sx={{ my: 1 }}>
        Submit
      </Button>

      {error && (
        <Alert severity="error" sx={{ my: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default SignInPage;
