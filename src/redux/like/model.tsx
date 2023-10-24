export type LikeModel = {
    value: Boolean,
    who: string,
    whoId: string,
    when: string,
    articleId: string,
}

export type LikeType = {
     aLike: LikeModel,
     allLikes : LikeModel[]
}