export type Post = {
  likesCount: number;
  sharesCount: number;
  commentsCount: number;
  viewsCount: number;
  content: string;
  author: string;
  userId: string;
  picture: string;
  video: string;
  event: string;
  timeCreated: string;
  dateCreated: string;
  profileImageUrl: string;
  email:string;
};

export type AppPosts = {
  allPosts: Post[];
  aPost: Post;
};
