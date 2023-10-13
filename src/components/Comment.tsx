import { Stack, TextField, IconButton, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const style = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      border: " 0.5px solid black",
    },
  },
};
export const Comment = () => {
  return (
    <Stack textAlign="center" p={2}>
      <Box>
        <TextField
          sx={style}
          className="comment-text"
          multiline
          placeholder="Write your comment..."
        ></TextField>
        <IconButton disableFocusRipple>
          <SendIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};
