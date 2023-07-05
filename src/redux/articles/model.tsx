export type Article = {
  text: string;
  title: string;
  timeCreated: string;
  authorName: string;
  authorEmail: string;
  likes: number;
  comments: {
    text: Array<string>,
    numberOfComments: number;
  };
  repost: number;
  readOnly: boolean;
};
