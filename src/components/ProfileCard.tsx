import { Avatar, Box, Button, Typography } from "@mui/material";

type ProfileCardType = {
  profileImg: string;
  author: string;
  email: string;
};

export const ProfileCard = ({ profileImg, author, email }: ProfileCardType) => {
  return (
    <section>
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
    </section>
  );
};
