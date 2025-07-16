import Typography from "@mui/material/Typography";

export const MainHeader = ({ text }: { text: string }) => {
  return (
    <Typography variant={"h2"} fontSize={22} my={2}>
      {text}
    </Typography>
  );
};