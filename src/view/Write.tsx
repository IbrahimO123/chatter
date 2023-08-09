//import { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  Button,
  IconButton,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
  TextField,
  Chip,
  OutlinedInput,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PublishIcon from "@mui/icons-material/Publish";

import { Tags } from "../Utilities/support";

import { RootState } from "../redux/store";
import { updateArticle } from "../redux/articles/slice";
import { useSelector, useDispatch } from "react-redux";

import { updateOtherState } from "../redux/Others/slice";
import EditorMarkdown from "../components/Editors";
import { addArticletoDatabase } from "../Utilities/AddData";
import { useState } from "react";
import { UploadImage } from "../Utilities/UploadImage";

export const WriteArticle = () => {
  const dispatch = useDispatch();
  const { anArticle } = useSelector((state: RootState) => state.articles);
  const aUser = useSelector((state: RootState) => state.users.aUser);
  const others = useSelector((state: RootState) => state.others);
  const { email, firstname, lastname } = aUser;
  const { categories, title, text } = anArticle;
  const [selectedImage, setSelectedImage] = useState<File>();

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target!.files![0]);
    if (selectedImage === undefined) {
      console.log("No selected image");
    }
  };

  const handleCategory = (e: SelectChangeEvent<typeof Tags>) => {
    const {
      target: { value },
    } = e;
    if (categories.length < 2) {
      dispatch(
        updateArticle({
          ...anArticle,
          categories: typeof value === "string" ? value.split(",") : value,
        })
      );
    } else {
      dispatch(
        updateOtherState({
          ...others,
          message: "You can only select two tags ",
          open: true,
          severity: "error",
        })
      );
      dispatch(
        updateArticle({
          ...anArticle,
          categories: [],
        })
      );
    }
    return;
  };
  const saveArticle = async () => {
    const photoUrl = await UploadImage(selectedImage, title);
    await addArticletoDatabase({ ...anArticle, coverImage: photoUrl }, title);
    console.log(anArticle);
    dispatch(
      updateOtherState({
        ...others,
        severity: "success",
        open: true,
        message: "article added successfully",
      })
    );
    return;
  };

  const handleArticle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateArticle({
        ...anArticle,
        [e.target.name]: e.target.value,
        authorEmail: email,
        authorName: `${firstname} ${lastname}`,
      })
    );
  };
  // useEffect(() => {
  //   console.log("The article : ", anArticle);
  //   console.log("What is the title: ", title);
  // }, [text]);
  return (
    <Box sx={{ margin: { xs: "10px", md: "5px" } }}>
      <Typography textAlign="center" component="h1" variant="h6" m={1}>
        Write an Article
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={2.4}>
          <Paper
            elevation={4}
            sx={{
              height: "80vh",
              marginLeft: "10px",
              display: { md: "grid", xs: "none" },
            }}
          >
            <Typography component="h1" variant="h6" p={1}>
              <IconButton>
                <EditNoteIcon />
              </IconButton>
              Articles
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={9.5}>
          <Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography sx={{ padding: "5px" }} variant="h5" component="h6">
                Title
              </Typography>
              <TextField
                placeholder="Write the title here...."
                sx={{ width: "50vw" }}
                name="title"
                type="text"
                value={title}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={handleArticle}
              ></TextField>
            </Box>

            <Box sx={{ display: { xs: "block", md: "flex" } }}>
              <Box>
                <TextField
                  sx={{ marginRight: "10px" }}
                  type="file"
                  helperText="Upload cover image"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleSelectImage}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                ></TextField>
              </Box>

              <Box>
                <Select
                  value={categories}
                  multiple
                  sx={{
                    width: { xs: "50vw", md: "25vw" },
                    
                  }}
                  disabled={
                    text.length < 200 ? true : false || title.length === 0
                  }
                  onChange={handleCategory}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Placeholder</em>;
                    }
                    return (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    );
                  }}
                  inputProps={{
                    "aria-label": "Without label",
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Select the Category</em>
                  </MenuItem>
                  {Tags.map((tag) => (
                    <MenuItem value={tag} key={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Select the category for the article
                </FormHelperText>
                <Box sx={{ lineHeight: "0.5" }}>
                  <small style={{ fontSize: "10px", color: "red" }}>
                    select maximum of two tags
                  </small>
                </Box>
              </Box>
            </Box>
          </Box>

          <Paper sx={{ marginTop: "15px" }} elevation={4}>
            <EditorMarkdown />
            <FormHelperText sx={{ marginLeft: "5px" }}>
              At least 200 characters
            </FormHelperText>
          </Paper>

          <Box m={2} component="div">
            <Box pb={1}>
              <Button
                sx={{ margin: "5px" }}
                variant="contained"
                disabled={
                  text.length < 200
                    ? true
                    : false ||
                      title.length === 0 ||
                      categories.length === 0 ||
                      selectedImage === undefined
                }
                size="small"
                endIcon={<PublishIcon />}
                color="success"
              >
                Publish
              </Button>
              <Button
                color="warning"
                variant="contained"
                disabled={
                  text.length < 200
                    ? true
                    : false ||
                      title.length === 0 ||
                      categories.length === 0 ||
                      selectedImage === undefined
                }
                size="small"
                endIcon={<SaveIcon />}
                onClick={saveArticle}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
