import {
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import { User } from "../../redux/user/model";

export const AuthorCard = (props: User) => {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "#e8f5e9",
        alignContent: "center",
        margin: "10px",
        width: { md: "23vw", xs: "100vw" },
      }}
    >
      <CardHeader title="About the Author"></CardHeader>
      <CardMedia
        component="img"
        height="200px"
        image={props.profileImageUrl}
        alt={`${props.lastname} ${props.firstname}`}
      ></CardMedia>
      <CardContent>
        <Typography component="p" variant="subtitle2">
          Name: {props.lastname} {props.firstname}
        </Typography>
        <Typography component="p" variant="subtitle2">
          Email: {props.email}
        </Typography>
        <Typography component="p" variant="subtitle2">
          Occupation: Writer
        </Typography>
      </CardContent>
      <Divider />
      <CardContent
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IconButton disableRipple>
          <Link to={props.facebookHandle || ""} target="_blank">
            <FacebookIcon color="primary" />
          </Link>
        </IconButton>
        <IconButton disableRipple>
          <Link to={props.twitterHandle || ""} target="_blank">
            <TwitterIcon color="info" />
          </Link>
        </IconButton>
        <IconButton disableRipple>
          <Link to={props.linkedInHandle || ""} target="_blank">
            <LinkedInIcon color="primary" />
          </Link>
        </IconButton>
      </CardContent>
    </Card>
  );
};
