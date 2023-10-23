//import { addCommentToDatabase } from "../../Utilities/AddComments";
import { useGeneral } from "./useGeneral";
import { updateComment } from "../../redux/comment/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useComment = () => {
  const { dispatch } = useGeneral();
  const { user, firstname, lastname, profileImageUrl } = useGeneral();
  const { aComment, allComments } = useSelector(
    (state: RootState) => state.comment
  );
  const { text } = aComment.comment;

  const addComment = (
    e: React.ChangeEvent<HTMLInputElement>,
    articleId: string
  ) => {
    dispatch(
      updateComment({
        ...aComment,
        id: articleId,
        comment: {
          authorName: `${lastname} ${firstname}`,
          userId: user?.uid!,
          text: e.target.value,
          dateCreated: new Date().toLocaleDateString(),
          timeCreated: new Date().toLocaleTimeString(),
          profileImageUrl: profileImageUrl,
          replies: [],
          commentLikes: [],
        },
      })
    );
    return "comment added";
  };

  const editComment = () => {};

  const showComment = () => {};
  const likeComment = () => {
    dispatch(
      updateComment({
        ...aComment,
        comment: {
          ...aComment.comment,
          commentLikes: [...aComment.comment.commentLikes, user?.uid!],
        },
      })
    );
  };

  return {
    addComment,
    editComment,
    showComment,
    updateComment,
    likeComment,
    aComment,
    allComments,
    text,
  };
};
