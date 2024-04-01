import Box from "@mui/material/Box";

export const CardComments = ({ comments }: { comments: string }) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: comments }}
      sx={{
        fontSize: "12px",
        borderTop: "1px solid #e8e8e8",
        mt: 0.5,
        pt: 0.5,
        lineHeight: 1.5,
      }}
    />
  );
};
