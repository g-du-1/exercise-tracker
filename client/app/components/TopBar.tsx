import AppBar from "@mui/material/AppBar";
import { StopWatch } from "./StopWatch";
import { SideMenu } from "./SideMenu";

export const TopBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        opacity: 0.9,
        color: "text.primary",
        background: "#fff",
      }}
    >
      <StopWatch />

      <SideMenu />
    </AppBar>
  );
};
