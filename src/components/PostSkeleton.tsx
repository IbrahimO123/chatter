import { Box, Skeleton, Paper } from "@mui/material";
export const PostSkeleton = () => {
  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box textAlign="center">
        <Skeleton variant="text" sx={{ fontSize: "2.5rem", margin: "5px" }} />
        <Skeleton variant="text" sx={{ fontSize: "2.5rem", margin: "5px" }} />
        <Skeleton
          variant="rounded"
          width={1120}
          height={300}
          sx={{ margin: "5px" }}
        />

        <Skeleton
          animation="wave"
          variant="rectangular"
          width={1120}
          height={800}
          sx={{ margin: "5px", marginBottom: "5px" }}
        />
        <Skeleton
          variant="rounded"
          width={300}
          height={40}
          sx={{ margin: "5px" }}
        />
      </Box>
    </Paper>
  );
};
