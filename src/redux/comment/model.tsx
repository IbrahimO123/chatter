export type CommentModel = {
  id: string;
  article:string;
  comment: {
    userId: string;
    text: string;
    dateCreated: string;
    timeCreated: string;
    profileImageUrl: string;
    authorName: string;
    replies: {
      userId: string;
      text: string;
      dateCreated: string;
      timeCreated: string;
      profileImageUrl: string;
      authorName: string;
    }[];
    commentLikes: string[];
  };
};

export type AppComment = {
  aComment: CommentModel;
  allComments: CommentModel[];
};


export type PostCommentModel = {
  id: string;
  post: string;
  comment: {
    userId: string;
    postText: string;
    dateCreated: string;
    timeCreated: string;
    profileImageUrl: string;
    authorName: string;
    replies: {
      userId: string;
      postText: string;
      dateCreated: string;
      timeCreated: string;
      profileImageUrl: string;
      authorName: string;
    }[];
    commentLikes: string[];
  };
};

export type PostComment = {
  singlePostComment: PostCommentModel;
  allPostComments: PostCommentModel[];
};
