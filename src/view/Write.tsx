import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrayColor } from "../components/support";
import parse from "html-react-parser";

export const WritePost = () => {
  const [value, setValue] = useState("");
  return (
    <Box>
      <Typography component="h1" variant="h6" m={1}>
        Write an Article
      </Typography>

      <Grid container spacing={2}>
        <Grid item md={2.4}>
          <Paper sx={{ height: "70vh", marginLeft: "10px" }} elevation={8}>
            <Typography component="h1" variant="h6" p={1}>
              Articles Writing
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={9.6}>
          <Paper
            elevation={8}
            sx={{ height: "70vh", marginRight: "10px", padding: "10px" }}
          >
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="Write out your magic words..."
              modules={{
                toolbar: {
                  container: [
                    [
                      { header: "1" },
                      { header: "2" },
                      { header: [3, 4, 5, 6] },
                      { font: [] },
                    ],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "video"],
                    ["link", "image"],
                    [
                      {
                        color: ArrayColor,
                      },
                    ],
                    ["clean"],
                    ["code-block"],
                  ],
                },
              }}
            />
            <Button variant="contained" disableRipple disabled size="large">
              Publish
            </Button>
          </Paper>
        </Grid>
        <Grid item md={12}>
          <Box>
            <Typography component="h1" variant="h6" m={1}>
              Preview
            </Typography>
            <Typography>{parse(value)}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
