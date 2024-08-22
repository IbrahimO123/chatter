import {
  Container,
  Typography,
  MenuList,
  MenuItem,
  Badge,
} from "@mui/material";
import { Tags } from "../Utilities/Miscellaneous";
import { MetaTags } from "../components/MetaTag";

const TagsPage = () => {
  return (
    <>
      <MetaTags
        description="Tags page, user can view the trending tags and click on them to see the article trending"
        title="Tags | Chatter "
        PageTitle="Tags Pag for the application"
        typeOfPlatform="website"
        url="/tags"
        href="/tags"
      />
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
    </>
  );
};

export default TagsPage;
