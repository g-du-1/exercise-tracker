"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import { useSignIn } from "../hooks/useSignIn";

const SignInPage = () => {
  const signIn = useSignIn();

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
    try {
      const resp = await signIn.mutateAsync({ username, password });

      if (resp) {
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message);
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
        type="password"
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
