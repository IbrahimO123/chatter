export type Article = {
  text: string;
  html: string;
  title: string;
  subtitle: string;
  timeCreated: string;
  dateCreated: string;
  authorName: string;
  authorEmail: string;
  likes: number;
  comments: {
    text: Array<string>;
    numberOfComments: number;
  };
  categories: Array<string>;
  repost: number;
  readOnly: boolean;
  coverImage: string;
  published: boolean;
};

export type AppArticle = {
  allArticles: Article[];
  anArticle: Article;
};

export type SaveArticle = {
  heading: Array<string>;
  name: string;
  email: string;
  heading2: Array<string>;
};
