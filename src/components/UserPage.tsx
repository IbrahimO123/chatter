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
  InputAdornment,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useGeneral } from "../custom/hooks/useGeneral";
import { useState } from "react";
import { updateOtherState } from "../redux/Others/slice";

export const UserPage = () => {
  const [profileImage, setProfileImage] = useState<File>();
  const { dispatch, others } = useGeneral();

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = e.target.files;
    if (!fileList) {
      e.target.value = "";
      return console.log("No image selected");
    }
    let imageObj = e.target!.files![0];
    const { size, type } = imageObj;
    const ext = type.split("/")[0];
    const mb = size / 1000000;
    if (mb > 2) {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Size exceeds the maximum allowed",
          severity: "error",
        })
      );
      e.target.value = "";
      setProfileImage(undefined);
      return false;
    } else if (ext !== "image") {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Please upload image only",
          severity: "error",
        })
      );
      e.target.value = "";
      setProfileImage(undefined);
      return false;
    } else {
      setProfileImage(e.target!.files![0]);
    }
  };

  const {
    handleUserChange,
    handleUpdateUser,
    handleProfilePhotoUpload,
    firstname,
    lastname,
    phoneNumber,
    email,
    password,
    confirmPassword,
    profileImageUrl,
    facebookHandle,
    twitterHandle,
    linkedInHandle,
    dateCreated,
  } = useGeneral();

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
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
                sx={{ padding: "2px" }}
                type="file"
                name="profileImage"
                onChange={handleSelectImage}
                helperText="Upload your avatar"
                inputProps={{ accept: "image/*" }}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              ></TextField>

              <Button
                color="warning"
                onClick={() => handleProfilePhotoUpload(profileImage!)}
                variant="contained"
                size="small"
                disabled={profileImage ? false : true}
              >
                Upload New Photo
              </Button>
              <Typography
                component="p"
                m={1}
                p={1}
                sx={{ border: "0.5px solid grey" }}
                color="grey"
                variant="caption"
              >
                Upload a new avatar, large size will be resize automatically.
                Maximum upload size is 2MB
              </Typography>
              <Typography component="p" variant="caption" m={1}>
                Member since: {dateCreated || ""}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
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
            <Box component="form" className="user-form">
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
                    onChange={handleUserChange}
                  ></TextField>
                </div>
                <div>
                  <InputLabel>Lastname</InputLabel>
                  <TextField
                    name="lastname"
                    value={lastname}
                    type="text"
                    onChange={handleUserChange}
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
                    autoComplete="on"
                  ></TextField>
                </div>
                <div>
                  <InputLabel>Confirm Password</InputLabel>
                  <TextField
                    type="password"
                    placeholder="confrim Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    autoComplete="on"
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
                    onChange={handleUserChange}
                    placeholder="email"
                  ></TextField>
                </div>
                <div>
                  <InputLabel>Phone Number</InputLabel>
                  <TextField
                    type="number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleUserChange}
                    placeholder="phone number"
                  ></TextField>
                </div>
              </Stack>
            </Box>
            <Box m={2} className="user-form-2">
              <Typography component="p" variant="h6">
                Social Profile
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <TextField
                  type="text"
                  name="facebookHandle"
                  value={facebookHandle || ""}
                  placeholder="facebook"
                  onChange={handleUserChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FacebookIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <TextField
                  type="text"
                  name="twitterHandle"
                  value={twitterHandle || ""}
                  placeholder="twitter"
                  onChange={handleUserChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TwitterIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <TextField
                  type="text"
                  name="linkedInHandle"
                  value={linkedInHandle || ""}
                  placeholder="linkedIn"
                  onChange={handleUserChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Stack>
            </Box>
            <Button
              variant="contained"
              sx={{ margin: "5px" }}
              size="small"
              color="warning"
              onClick={handleUpdateUser}
            >
              Update Info
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
