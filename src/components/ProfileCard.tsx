import { Avatar, Box, Button, Paper, Typography } from "@mui/material";

type ProfileCardType = {
  profileImg: string;
  author: string;
  email: string;
};

export const ProfileCard = ({ profileImg, author, email }: ProfileCardType) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "220px",
        width: "250px",
        borderRadius: "10px",
        backgroundColor: "#4caf50",
        color: "black",
      }}
    >
      <Box m={4} mt={2} sx={{ display: "grid", placeItems: "center" }}>
        <Box component="div" sx={{ textAlign: "center" }}>
          <Avatar
            src={profileImg}
            title={author}
            alt={`${author} picture`}
            sx={{ width: "100px", height: "100px" }}
          ></Avatar>
        </Box>
        <Typography sx={{ margin: "2px" }}>Name: {author}</Typography>
        {email ? <Typography>Email: {email} </Typography> : null}

        <Button
          sx={{
            margin: "5px",
            textTransform: "capitalize",
            backgroundColor: "whitesmoke",
            color: "black",
            borderRadius: "5px",
          }}
        >
          Follow
        </Button>
      </Box>
    </Paper>
  );
};
