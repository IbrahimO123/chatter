import { Menu, MenuItem, Fade, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGeneral } from "../custom/hooks/useGeneral";
type MenuProps = {
  handleClose: () => void;
  open: boolean;
  data: {
    value: string;
    logo: any;
    link?: any;
    change?: boolean;
  }[];
  anchorEl: null | HTMLElement;
  action?: () => void;
  uid?: string;
};

export const MenuComponent = ({
  handleClose,
  open,
  anchorEl,
  data,
  action,
  uid,
}: MenuProps) => {
  const navigate = useNavigate();
  const { user } = useGeneral();
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
        <MenuItem
          sx={{
            display: !item.change
              ? "flex"
              : user?.uid === uid
              ? "flex"
              : "none",
          }}
          key={index}
          onClick={() => handleMenuRoute(item.link)}
        >
          {item.logo}
          <Typography sx={{ fontSize: "13px" }} ml={1}>
            {item.value}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
