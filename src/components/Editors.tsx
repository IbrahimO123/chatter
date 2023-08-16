import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateArticle } from "../redux/articles/slice";


import "react-markdown-editor-lite/lib/index.css";


export const mdParser = new MarkdownIt();

type EditorChange = {
  html: string;
  text: string;
};


const EditorMarkdown = () => {
 

  const dispatch = useDispatch();
  const anArticle = useSelector((state: RootState) => state.articles.anArticle);
  const { text , } = anArticle;

  const handleEditorChange = ({ html, text }: EditorChange) => {
    dispatch(updateArticle({ ...anArticle, text, html }));
  };

  return (
    <MdEditor
      style={{ height: "600px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
      placeholder="Write the body article here support markdown!"
      value={text}
      canView={{
        menu: true,
        md: true,
        html: false,
        fullScreen: true,
        hideMenu: false,
        both: false,
      }}
      view={{menu: true, md: true, html: false}}
      
    />
  );
};
export default EditorMarkdown;
