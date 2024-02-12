export type LikeModel = {
    value: Boolean,
    article:string,
    who: string,
    whoId: string,
    when: string,
    articleId: string,
}

export type LikeType = {
     aLike: LikeModel,
     allLikes : LikeModel[]
}



export type LikePostModel = {
  value: Boolean;
  content: string;
  who: string;
  whoId: string;
  when: string;
  postId: string;
};

export type LikePostType = {
  aLike: LikePostModel;
  allLikes: LikePostModel[];
};