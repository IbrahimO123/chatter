import { Menu, MenuItem, Fade, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
type MenuProps = {
  handleClose: () => void;
  open: boolean;
  data: {
    value: string;
    logo: any;
    link?: any;
  }[];
  anchorEl: null | HTMLElement;
  action?: () => void;
};

export const MenuComponent = ({
  handleClose,
  open,
  anchorEl,
  data,
  action,
}: MenuProps) => {
  const navigate = useNavigate();
  const handleMenuRoute = (route: string) => {
    navigate(`${route}`);
  };
  return (
    <Menu
      sx={{ left: 0, right: 5, padding: "0" }}
      id="fade-menu"
      MenuListProps={{
        "aria-labelledby": "fade-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      {data.map((item, index) => (
        <MenuItem key={index} onClick={() => handleMenuRoute(item.link)}>
          {item.logo}
          <Typography sx={{ fontSize: "13px" }} ml={1}>
            {item.value}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
