export type Article = {
  text: string;
  title: string;
  timeCreated: string;
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
};

export type AppArticle = {
  allArticles: Article[];
  anArticle: Article;
};
