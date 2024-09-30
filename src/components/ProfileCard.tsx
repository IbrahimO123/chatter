import { Avatar, Box, Typography } from "@mui/material";

type ProfileCardType = {
  profileImg: string;
  author: string;
  email: string;
};

export const ProfileCard = ({ profileImg, author, email }: ProfileCardType) => {
  return (
    <section>
      <Box  m={4} >
        <Box component="div" sx={{ textAlign: "center" }}>
          <Avatar
            src={profileImg}
            title={author}
            alt={`${author} picture`}
          ></Avatar>
        </Box>
        <Typography>Name: {author}</Typography>
        <Typography>Email: {email} </Typography>
      </Box>
    </section>
  );
};
