export type Article = {
  text: string;
  html: string;
  title: string;
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
};

export type AppArticle = {
  allArticles: Article[];
  anArticle: Article;
};
