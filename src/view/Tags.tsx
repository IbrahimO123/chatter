import {
  Container,
  Typography,
  MenuList,
  MenuItem,
  Badge,
} from "@mui/material";
import { Tags } from "../Utilities/support";
import { useEffect } from "react";

export const TagsPage = () => {
  useEffect(() => {
    document.title = "Chatter | Tags";
  }, []);
  return (
    <Container className="tags">
      <Typography mt={3}>Tags</Typography>
      <MenuList>
        {Tags &&
          Tags.map((tags, index) => (
            <MenuItem key={index}>
              <Badge color="info" badgeContent={1}>
                #{tags}
              </Badge>
            </MenuItem>
          ))}
      </MenuList>
    </Container>
  );
};
