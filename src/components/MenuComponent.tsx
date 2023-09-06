import { Menu, MenuItem, Fade } from "@mui/material";

type MenuProps = {
  handleClose: () => void;
  open: boolean;
  data: {
    value: string;
    logo: any;
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
  return (
    <Menu
      sx={{ left: 0, right: 5, padding:"0" }}
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
        <MenuItem sx={{fontSize:"13px"}} onClick={action} key={index}>
          {item.logo} {item.value}
        </MenuItem>
      ))}
    </Menu>
  );
};
