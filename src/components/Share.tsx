import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Menu, MenuItem, Fade, Typography } from "@mui/material";

type ShareProps = {
  handleClose: () => void;
  open: boolean;
  data?: {
    value: string;
    logo: any;
    Button: any;
    link?: any;
    change?: boolean;
  }[];
  anchorEl: null | HTMLElement;
  action?: () => void;
  uid?: string;
};

type ShareType = {
  url: string;
  children: ReactNode;
};

const shareButtonsData = [
  {
    logo: <FacebookIcon size={20} round={true} />,
    value: "Facebook",
  },
  {
    logo: <WhatsappIcon size={20} round={true} />,
    value: "Whatsapp",
  },
  {
    logo: <TelegramIcon size={20} round={true} />,
    value: "Telegram",
  },
  {
    logo: <TwitterIcon size={20} round={true} />,
    value: "Twitter",
  },
  {
    logo: <LinkedinIcon size={20} round={true} />,
    value: "Linkedin",
  },
];

export const ShareComponent = ({ handleClose, open, anchorEl }: ShareProps) => {
  const url = window.location.href;
  return (
    <Menu
      sx={{
        left: 0,
        right: 5,
        padding: "0",
        display: "flex",
        justifyContent: "space-between",
      }}
      id="fade-menu"
      MenuListProps={{
        "aria-labelledby": "fade-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      {shareButtonsData.map((item, index) => (
        <MenuItem key={index}>
          {item.value === "Whatsapp" ? (
            <Stack>
              <WhatsappShareButton url={url} style={{ display: "flex" }}>
                {item.logo}
                <Typography sx={{ fontSize: "13px" }} ml={1}>
                  {item.value}
                </Typography>
              </WhatsappShareButton>
            </Stack>
          ) : item.value === "Facebook" ? (
            <FacebookShareButton url={url} style={{ display: "flex" }}>
              {item.logo}
              <Typography sx={{ fontSize: "13px" }} ml={1}>
                {item.value}
              </Typography>
            </FacebookShareButton>
          ) : item.value === "Twitter" ? (
            <TwitterShareButton url={url} style={{ display: "flex" }}>
              {item.logo}
              <Typography sx={{ fontSize: "13px" }} ml={1}>
                {item.value}
              </Typography>
            </TwitterShareButton>
          ) : item.value === "Linkedin" ? (
            <LinkedinShareButton url={url} style={{ display: "flex" }}>
              {item.logo}
              <Typography sx={{ fontSize: "13px" }} ml={1}>
                {item.value}
              </Typography>
            </LinkedinShareButton>
          ) : item.value === "Telegram" ? (
            <TelegramShareButton url={url} style={{ display: "flex" }}>
              {item.logo}
              <Typography sx={{ fontSize: "13px" }} ml={1}>
                {item.value}
              </Typography>
            </TelegramShareButton>
          ) : null}
        </MenuItem>
      ))}
    </Menu>
  );
};

export const Share = ({ url, children }: ShareType) => {
  return (
    <Box>
      <Stack>
        <EmailShareButton url={url}>{children}</EmailShareButton>
        <FacebookShareButton url={url}>{children}</FacebookShareButton>
        <LinkedinShareButton url={url}>{children}</LinkedinShareButton>
        <TelegramShareButton url={url}>{children}</TelegramShareButton>
        <TwitterShareButton url={url}>{children}</TwitterShareButton>
        <WhatsappShareButton url={url}>{children}</WhatsappShareButton>
      </Stack>
    </Box>
  );
};
