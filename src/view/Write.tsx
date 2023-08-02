import { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  Button,
  IconButton,
  MenuItem,
  InputLabel,
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

export const WriteArticle = () => {
  const dispatch = useDispatch();
  const { anArticle } = useSelector((state: RootState) => state.session.articles);
  const aUser = useSelector((state: RootState) => state.users.aUser);
  const others = useSelector((state: RootState) => state.session.others);
  const { email, firstname, lastname } = aUser;
  const { categories, title, text } = anArticle;
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
    const res = await addArticletoDatabase(anArticle, email);
    console.log(res);
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
    <Box>
      <Paper elevation={4}>
        <Typography textAlign="center" component="h1" variant="h6" m={1}>
          Write an Article
        </Typography>

        <Grid container spacing={2}>
          <Grid item md={2.4}>
            <Paper
              sx={{
                height: "70vh",
                marginLeft: "10px",
                display: { md: "grid", xs: "none" },
              }}
              elevation={8}
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
            <Paper
              elevation={8}
              sx={{ marginBottom: "5px", padding: "0 5px 5px 5px" }}
            >
              <Typography sx={{ padding: "5px" }} variant="h5" component="h6">
                Title
              </Typography>
              <TextField
                placeholder="Write the title here...."
                variant="standard"
                fullWidth
                name="title"
                type="text"
                value={title}
                onChange={handleArticle}
              ></TextField>
            </Paper>
            <Paper elevation={8} sx={{ marginRight: "10px", padding: "10px" }}>
              <EditorMarkdown />
            </Paper>

            <Box m={2} component="div">
              <Box pb={1}>
                <Button
                  sx={{ margin: "5px" }}
                  variant="contained"
                  disabled={
                    text.length < 200
                      ? true
                      : false || title.length === 0 || categories.length === 0
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
                      : false || title.length === 0 || categories.length === 0
                  }
                  size="small"
                  endIcon={<SaveIcon />}
                  onClick={saveArticle}
                >
                  Save
                </Button>
              </Box>
              <InputLabel id="select-label">Category</InputLabel>
              <Select
                value={categories}
                multiple
                sx={{ width: { xs: "50vw", md: "25vw" } }}
                disabled={
                  text.length < 200 ? true : false || title.length === 0
                }
                onChange={handleCategory}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
                inputProps={{ "aria-label": "Without label" }}
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
              <p style={{ lineHeight: "0" }}>
                <small style={{ fontSize: "10px", color: "red" }}>
                  select maximum of two tags
                </small>
              </p>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
