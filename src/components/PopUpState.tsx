import React from "react";
import { IconButton, Badge, Menu, Typography } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export const PopUp = ({ Icon, message }: any) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={0} color="error">
              <Icon {...bindTrigger(popupState)} />
            </Badge>
          </IconButton>
          <Menu
            {...bindMenu(popupState)}
            slotProps={{
              paper: {
                style: {
                  width: "280px",
                  textAlign: "center",
                  marginTop: "5px",
                  minHeight: "600px",
                },
              },
            }}
          >
            {/* <MenuItem onClick={popupState.close}>
                            No new Notifications
                          </MenuItem> */}
            <Typography>{message} </Typography>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};
