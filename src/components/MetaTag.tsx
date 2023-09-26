import { Helmet } from "react-helmet-async";
import Logo from "../assets/images/circular-saw.svg";

type MetaTagsProps = {
  title: string;
  description: string;
  url: string;
  href: string;
  typeOfPlatform: string;
  PageTitle: string;
};

export const MetaTags = ({
  title,
  description,
  url,
  href,
  typeOfPlatform,
  PageTitle,
}: MetaTagsProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={PageTitle} />
      <meta property="og:type" content={typeOfPlatform} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={Logo} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={PageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={Logo} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={href} />
    </Helmet>
  );
};
