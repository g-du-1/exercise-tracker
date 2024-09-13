"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const SignInPage = () => {
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

      <TextField label="Username" variant="standard" sx={{ my: 1 }} />
      <TextField label="Password" variant="standard" sx={{ my: 1 }} />

      <Button sx={{ my: 1 }}>Submit</Button>
    </Box>
  );
};

export default SignInPage;
