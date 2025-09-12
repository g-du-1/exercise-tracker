import Typography from "@mui/material/Typography";

export const SubHeader = ({ text }: { text: string }) => {
  return (
    <Typography variant={"h3"} fontSize={18} my={1}>
      {text}
    </Typography>
  );
};
