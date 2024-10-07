import { Avatar, Box, Button, Paper, Typography } from "@mui/material";

type ProfileCardType = {
  profileImg: string;
  author: string;
  email: string;
};

export const ProfileCard = ({ profileImg, author, email }: ProfileCardType) => {
  return (
    <Paper
      elevation={5}
      sx={{
        height: "260px",
        width: "200px",
        borderRadius: "10px",
        backgroundColor: "#4caf50",
        color: "black",
        padding: "10px",
      }}
    >
      <Box mt={2} sx={{ display: "grid", placeItems: "center" }}>
        <Box component="div" sx={{ textAlign: "center" }}>
          <Avatar
            src={profileImg}
            title={author}
            alt={`${author} picture`}
            sx={{ width: "100px", height: "100px" }}
          ></Avatar>
        </Box>
        <Typography
          variant="subtitle2"
          sx={{ margin: "2px", fontWeight: "bolder" }}
        >
          Name:
        </Typography>
        <Typography> {author}</Typography>
        {email ? (
          <>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bolder" }}
            >
              Email:
            </Typography>
            <Typography> {email}</Typography>
          </>
        ) : null}

        <Button
          sx={{
            margin: "5px",
            textTransform: "capitalize",
            backgroundColor: "whitesmoke",
            color: "black",
            borderRadius: "5px",
          }}
          onClick={()=>console.log("profile card clicked")}
        >
          Follow
        </Button>
      </Box>
    </Paper>
  );
};
