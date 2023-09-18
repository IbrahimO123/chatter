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

type UserProps = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
  profileImageUrl: string;
  facebookHandle: string;
  twitterHandle: string;
  linkedInHandle: string;
  dateCreated: string;
};

export const UserPage = ({
  firstname,
  lastname,
  email,
  phoneNumber,
  password,
  confirmPassword,
  profileImageUrl,
  facebookHandle,
  twitterHandle,
  linkedInHandle,
  dateCreated,
}: UserProps) => {
  return (
    <Box>
      <Grid container gap={2} m={2}>
        <Grid item xs={11} md={3}>
          <Paper elevation={0} sx={{ padding: "10px" }}>
            <Box>
              <Avatar
                sx={{
                  width: "100px",
                  height: "100px",
                  border: "50%",
                  objectFit: "cover",
                  margin: "5px",
                }}
                src={profileImageUrl}
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
                Member since: {dateCreated || ""}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={11} md={8}>
          <Paper
            elevation={0}
            sx={{
              padding: "5px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyItems: "center",
            }}
          >
            <Typography component="p" variant="h6">
              Edit Profile
            </Typography>
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                m={1}
              >
                <div>
                  <InputLabel>Firstname</InputLabel>
                  <TextField
                    name="firstname"
                    value={firstname}
                    type="text"
                    placeholder="firstname"
                  ></TextField>
                </div>
                <div>
                  <InputLabel>Lastname</InputLabel>
                  <TextField
                    name="lastname"
                    value={lastname}
                    type="text"
                    placeholder="lastname"
                  ></TextField>
                </div>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                m={1}
              >
                <div>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                  ></TextField>
                </div>
                <div>
                  <InputLabel>Confirm Password</InputLabel>
                  <TextField
                    type="password"
                    placeholder="confrim Password"
                    name="confirmPassword"
                    value={confirmPassword}
                  ></TextField>
                </div>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                m={1}
              >
                <div>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    type="email"
                    value={email}
                    name="email"
                    placeholder="email"
                  ></TextField>
                </div>
                <div>
                  <InputLabel>Phone Number</InputLabel>
                  <TextField
                    type="number"
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="phone number"
                  ></TextField>
                </div>
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
                <TextField
                  name="facebookHandle"
                  value={facebookHandle}
                  placeholder="facebook"
                ></TextField>
                <TextField
                  name="twitterHandle"
                  value={twitterHandle}
                  placeholder="twitter"
                ></TextField>
                <TextField
                  name="linkedInHandle"
                  value={linkedInHandle}
                  placeholder="linkedIn"
                ></TextField>
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
    </Box>
  );
};
