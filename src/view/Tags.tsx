import {
  Container,
  Typography,
  MenuList,
  MenuItem,
  Badge,
} from "@mui/material";
import { Tags } from "../Utilities/support";


export const TagsPage = () => {
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
