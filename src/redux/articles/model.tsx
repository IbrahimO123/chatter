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
  categories: Array<string>;
  repost: number;
  readOnly: boolean;
  coverImage: string;
  published: boolean;
  profileImageUrl: string;
};

export type AppArticle = {
  allArticles: Article[];
  anArticle: Article;
};

export type DraftModel = {
  drafts: [
    {
      id: string;
      data: [
        {
          text: string;
          html: string;
          title: string;
          subtitle: string;
          timeCreated: string;
          dateCreated: string;
          authorName: string;
          authorEmail: string;
          likes: number;
          categories: Array<string>;
          repost: number;
          readOnly: boolean;
          coverImage: string;
          published: boolean;
          profileImageUrl: string;
        }
      ];
    }
  ];
};
