import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useGeneral } from "../custom/hooks/useGeneral";
import AppLogo from "../assets/images/circular_saw .png";
import { MobileView } from "../Utilities/Miscellaneous";

const ForgotPassword = () => {
  const { navigate } = useGeneral();
  return (
    <Box
      sx={{
        justifySelf: "center",
        alignSelf: "center",
        minHeight: "60vh",
        alignContent: "center",
        justifyItems: "center",
      }}
      m={4}
      p={4}
    >
      <img src={AppLogo} alt="App Logo" style={{ width: "120px" }} />
      <Typography variant={MobileView() ? "h5" : "h4"}>
        Forgot your password?
      </Typography>
      <Typography variant="caption">
        Enter your email so that we can send you a password reset link
      </Typography>

      <Box mt={3}>
        <Typography variant="h6" color="#000">
          Email
        </Typography>
        <TextField
          sx={{ width: { md: "30vw", xs: "90vw" } }}
          placeholder="e.g username@chatterton.com"
        ></TextField>
        <Box sx={{ display: "block" }}>
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              width: { md: "30vw", xs: "90vw" },
              mt: 1,
            }}
            size="large"
            color="error"
            disableElevation
          >
            Send Email
          </Button>
        </Box>
        <Box sx={{ justifySelf: "center" }} mt={2}>
          <IconButton
            disableTouchRipple
            disableFocusRipple
            disableRipple
            onClick={() => navigate("/login", { replace: true })}
          >
            <ArrowBackIosIcon />
            <Typography color="#000">Back to Login</Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
