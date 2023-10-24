import { Skeleton, Paper, Container } from "@mui/material";
export const MiniSkeleton = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "12px",
      }}
    >
      <Container>
        <Skeleton variant="text" sx={{ fontSize: "2.5rem", margin: "5px" }} />
        <Skeleton variant="text" sx={{ fontSize: "2.5rem", margin: "5px" }} />
        <Skeleton variant="rounded" height={300} sx={{ margin: "5px" }} />
        <Skeleton
          variant="rectangular"
          height={800}
          sx={{ margin: "5px", marginBottom: "5px" }}
        />
        <Skeleton variant="rounded" height={40} sx={{ margin: "5px" }} />
      </Container>
    </Paper>
  );
};
