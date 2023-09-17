import {
  Grid,
  InputLabel,
  Box,
  Paper,
  Avatar,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";

export const UserPage = () => {
  return (
    <>
      <Grid m={2} container gap={2} textAlign="center">
        <Grid item xs={12} md={3} spacing={3}>
          <Paper elevation={6} sx={{ padding: "10px", height: "350px" }}>
            <Box>
              <Avatar
                sx={{
                  width: "150px",
                  height: "150px",
                  border: "50%",
                  objectFit: "cover",
                  margin: "5px",
                }}
                src=""
              ></Avatar>
              <TextField
                type="file"
                helperText="Upload your avatar"
                inputProps={{ accept: "image/*" }}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              ></TextField>
              <Button color="warning" variant="contained" size="small">
                Upload New Photo
              </Button>
              <Typography
                component="p"
                m={1}
                p={1}
                sx={{ border: "1px solid grey" }}
                variant="caption"
              >
                Upload a new avatar, large size will be resize automatically
                Maximum upload size is 1MB
              </Typography>
              <Typography component="p" variant="caption" m={1}>
                Member since: Date
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={6} sx={{ padding: "5px", height: "500px" }}>
            <Typography component="p" variant="h6">
              Edit Profile
            </Typography>
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <p>
                  <InputLabel>Firstname</InputLabel>
                  <TextField type="text" placeholder="firstname"></TextField>
                </p>
                <p>
                  <InputLabel>Lastname</InputLabel>
                  <TextField type="text" placeholder="lastname"></TextField>
                </p>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <p>
                  <InputLabel>Password</InputLabel>
                  <TextField type="password" placeholder="password"></TextField>
                </p>
                <p>
                  <InputLabel>Confirm Password</InputLabel>
                  <TextField
                    type="password"
                    placeholder="confrim Password"
                  ></TextField>
                </p>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <p>
                  <InputLabel>Email</InputLabel>
                  <TextField type="email" placeholder="email"></TextField>
                </p>
                <p>
                  <InputLabel>Phone Number</InputLabel>
                  <TextField
                    type="number"
                    placeholder="phone number"
                  ></TextField>
                </p>
              </Stack>
            </Box>

            <Box m={2}>
              <Typography component="p" variant="h6">
                Social Profile
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <TextField placeholder="facebook"></TextField>
                <TextField placeholder="twitter"></TextField>
              </Stack>
            </Box>
            <Button
              variant="contained"
              sx={{ margin: "5px" }}
              size="small"
              color="warning"
            >
              Update Info
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
