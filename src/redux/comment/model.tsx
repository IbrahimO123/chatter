export type CommentModel = {
  id: string;
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
