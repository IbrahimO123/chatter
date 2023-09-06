import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container  gap={2} >
          <Grid xs={12} md={5}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button
              onClick={() => navigate("/", { replace: true })}
              variant="contained"
              color="success"
            >
              Back Home
            </Button>
          </Grid>
          <Grid  xs={12} md={5} >
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width="100%"
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default NotFound;
