import { Box, Button, TextField, Typography } from "@mui/material";
import AppLogo from "../assets/images/circular_saw .png";
const Reset = () => {
  return (
    <Box p={2} mt={6} sx={{ alignContent: "center", justifyItems: "center" }}>
      <img src={AppLogo} alt="App Logo" style={{ width: "120px" }} />
      <Typography variant="h6">Reset your password</Typography>
      <Box
        sx={{
          borderRadius: "5px",
          width: { md: "30vw", xs: "80vw" },
          alignItems: "center",
          justifyItems: "center",
        }}
        m={3}
        p={4}
      >
        <TextField
          sx={{ width: { md: "30vw", xs: "90vw" } }}
          placeholder="New password"
        ></TextField>
        <Box m={1}>
          <Button
            color="error"
            variant="contained"
            sx={{ width: { md: "30vw", xs: "90vw" } }}
            disableElevation
            size="large"
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Reset;
