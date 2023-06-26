import { Box, MenuList, MenuItem, Typography } from "@mui/material";
const menuStyle = {
  display: "flex",
  flexWrap: "wrap",
  fontWeight: "lighter",
  position: "static",
};
export const About = () => {
  return <Box>
    <MenuList sx={menuStyle}>
      <MenuItem>
        <small> Help Center</small>
      </MenuItem>
      <MenuItem>
        <small>Contact </small>
      </MenuItem>
      <MenuItem>
        <small> Accessibility </small>
      </MenuItem>
      <MenuItem>
        <small> About </small>
      </MenuItem>
      <MenuItem>
        <small> Advertising </small>
      </MenuItem>
      <MenuItem>
        <small> Privary and terms </small>
      </MenuItem>
      <Typography variant="caption" color="text.secondary">
        Chatter Corporation &copy; 2023
      </Typography>
    </MenuList>
  </Box>;
};
