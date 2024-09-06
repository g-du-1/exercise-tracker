"use client";

import React, { FormEvent, useState } from "react";
import { signIn } from "../util/api/signIn";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setUsernameError(false);
    setPasswordError(false);

    if (username == "") {
      setUsernameError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }

    if (username && password) {
      await signIn(username, password);
      await router.push("/");
    }
  };

  return (
    <React.Fragment>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Login Form</h2>

        <TextField
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={username}
          error={usernameError}
        />

        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          error={passwordError}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button variant="outlined" color="secondary" type="submit">
          Login
        </Button>
      </form>

      <small>
        Need an account? <Link href="/sign-up">Register here</Link>
      </small>
    </React.Fragment>
  );
};

export default SignInPage;
