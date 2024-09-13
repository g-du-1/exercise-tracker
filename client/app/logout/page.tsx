"use client";

import Button from "@mui/material/Button";
import { logout } from "../util/api/logout";

const LogoutPage = () => {
  return <Button onClick={logout}>Logout</Button>;
};

export default LogoutPage;
