export type Post = {
  id: number;
  likesCount: number;
  sharesCount: number;
  commentsCount: number;
  viewsCount: number;
  content: string;
  author: string;
  userId: number;
  title: string;
  picture: string;
  video: string;
};

export type AppPosts = {
  allPosts: Post[];
  aPost: Post;
};
