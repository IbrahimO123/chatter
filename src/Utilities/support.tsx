import { useMediaQuery, useTheme, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";


export const linkStyle = {
  textDecoration: "none",
  color: "#76ff03",
};

export const gridStyle = {
  display: "grid",
  placeContent: "center",
  height: "87vh",
};

export const Tags = [
  "Technology",
  "Development",
  "Education",
  "Games",
  "Graphics",
  "Music",
  "Network",
  "Programs",
  "Policies",
  "Machine Learning",
  "Artifical Intelligence",
  "Art",
  "Science",
  "Politics",
  "Software",
  "Economics",
];

export const MobileView = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return sm;
};

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  textAlign: "center",
};



export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));


export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));


export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
