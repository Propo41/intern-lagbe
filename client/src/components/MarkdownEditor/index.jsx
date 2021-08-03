import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";

const MarkdownEditor = (props) => {
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  return (
    <SimpleMDE
      options={autofocusNoSpellcheckerOptions}
      value={props.description}
      onChange={props.setDescription}
      className="markdown-area-style"
    />
  );
};
export default MarkdownEditor;
