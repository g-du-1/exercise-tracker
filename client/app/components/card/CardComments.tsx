import Box from "@mui/material/Box";

export const CardComments = ({ comments }: { comments: string }) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: comments }}
      sx={{
        fontSize: "12px",
        p: 1,
        lineHeight: 1.5,
      }}
    />
  );
};
