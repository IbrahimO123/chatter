import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateArticle } from "../redux/articles/slice";

import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

type EditorChange = {
  html: string;
  text: string;
};

const EditorMarkdown = () => {
  const dispatch = useDispatch();
  const anArticle = useSelector((state: RootState) => state.session.articles.anArticle);
  const {text} = anArticle;

  const handleEditorChange = ({ html, text }: EditorChange) => {
    dispatch(updateArticle({ ...anArticle, text: text }));
  };

  return (
    <MdEditor
      style={{ height: "600px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
      value={text}
    />
  );
};
export default EditorMarkdown;
