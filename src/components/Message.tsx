import { Button, TextField } from "@mui/material";
export const sendMessage = async () => {
  return (
    <form>
      <label htmlFor="message">Enter Message</label>
      <TextField id="message"></TextField>
      <Button type="submit">Send</Button>
    </form>
  );
};
