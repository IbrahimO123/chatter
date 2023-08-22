import parse from "html-react-parser";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
  TextField,
  Chip,
  OutlinedInput,
  Container,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";

import { Tags } from "../Utilities/support";

import { RootState } from "../redux/store";
import { updateArticle } from "../redux/articles/slice";
import { useSelector, useDispatch } from "react-redux";
import { Draft } from "../components/Draft";

import { updateOtherState } from "../redux/Others/slice";
import EditorMarkdown from "../components/Editors";
import { addArticletoDatabase } from "../Utilities/AddData";
import { useState } from "react";
import { UploadImage } from "../Utilities/UploadImage";
import { MobileView } from "../Utilities/support";
import { mdParser } from "../components/Editors";
import { RetrieveAArticleOnce } from "../Utilities/RetrieveArticle";
import { updateSaveArticle } from "../redux/articles/slice";

export const WriteArticle = () => {
  const dispatch = useDispatch();
  const { anArticle } = useSelector((state: RootState) => state.articles);
  const save = useSelector((state: RootState) => state.saveArticles);
  const { heading, heading2 } = save;
  const aUser = useSelector((state: RootState) => state.users.aUser);
  const others = useSelector((state: RootState) => state.others);
  const { email, firstname, lastname } = aUser;
  const { categories, title, text, subtitle, coverImage } = anArticle;
  const [selectedImage, setSelectedImage] = useState<File>();
  const [saveButton, setSaveButton] = useState(false);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target!.files![0]);
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

  const handleNewPost = () => {
    dispatch(
      updateArticle({
        ...anArticle,
        title: "",
        subtitle: "",
        text: "",
        html: "",
        timeCreated: new Date().toLocaleTimeString(),
        dateCreated: new Date().toLocaleDateString(),
        likes: 0,
        comments: {
          numberOfComments: 0,
          text: [],
        },
        categories: [],
        repost: 0,
        readOnly: true,
        coverImage: "",
        published: false,
      })
    );
  };
  const saveArticle = async () => {
    setSaveButton((prev) => !prev);
    const photoUrl = await UploadImage(selectedImage, title);
    await addArticletoDatabase({ ...anArticle, coverImage: photoUrl }, title);
    const querySnapshot = await RetrieveAArticleOnce(title);
    const result = heading.find((item: string) => item === title);
    querySnapshot.forEach((doc) => {
      if (result === undefined)
        return dispatch(
          updateSaveArticle({
            ...save,
            heading: [...heading, doc.data().title],
            heading2: [...heading2, doc.data().subtitle],
            email,
            name: `${firstname} ${lastname}`,
          })
        );
    });

    dispatch(
      updateOtherState({
        ...others,
        severity: "success",
        open: true,
        message: "Article added successfully",
      })
    );
    return setSaveButton((prev) => !prev);
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

  useEffect(() => {
    document.title = "Chatter | Write";
  }, []);

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
              placeContent: "start",
              textAlign: "center",
            }}
          >
            <Draft />
          </Paper>
        </Grid>
        <Grid item md={9.6} xs={12}>
          <Paper elevation={4} sx={{ padding: "10px" }}>
            <Box
              sx={{
                marginBottom: "10px",
                display: { md: "flex", xs: "block" },
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography sx={{ padding: "5px" }} variant="h5" component="h6">
                  Title
                </Typography>
                <TextField
                  placeholder="Write the title here...."
                  sx={{ width: { md: "25vw", xs: "50vw" } }}
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

              <Box>
                <Typography sx={{ padding: "5px" }} variant="h5" component="h6">
                  Subtitle
                </Typography>
                <TextField
                  placeholder="What is the subtitle of your article...."
                  sx={{ width: { md: "25vw", xs: "50vw" } }}
                  name="subtitle"
                  type="text"
                  value={subtitle}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={handleArticle}
                ></TextField>
              </Box>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "block",
                  md: "flex",
                  justifyContent: "space-between",
                },
              }}
            >
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

              <Box sx={{}} mt={5} mr={3}>
                <Button
                  onClick={handleNewPost}
                  color="error"
                  variant="contained"
                >
                  New Post
                </Button>
              </Box>
            </Box>
          </Paper>

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
              <LoadingButton
                color="warning"
                variant="contained"
                loading={saveButton}
                disabled={
                  text.length < 200
                    ? true
                    : false ||
                      title.length === 0 ||
                      categories.length === 0 ||
                      selectedImage === undefined
                }
                size="small"
                loadingPosition="end"
                endIcon={<SaveIcon />}
                onClick={saveArticle}
              >
                <span>Save</span>
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Container sx={{ textAlign: "center", backgroundColor: "#fff" }}>
        <Typography p={3} textAlign="center" component="h1" variant="h6">
          Preview
        </Typography>

        <Typography m={3} component="h1" variant="h4">
          {title}
        </Typography>
        <Box>
          <img
            src={coverImage}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: MobileView() ? "15em" : "22em",
            }}
            alt={title}
          ></img>
        </Box>
        <Typography component="h1" variant="h6">
          {subtitle}
        </Typography>
        <Typography p={3} component="div" textAlign="left">
          {parse(mdParser.render(text))}
        </Typography>
        <Box component="div" p={3} textAlign="left">
          {categories.map((category: string) => (
            <Chip
              key={category}
              sx={{ margin: "10px" }}
              color="warning"
              label={category}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
