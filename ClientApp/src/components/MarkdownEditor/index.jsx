import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";
// https://github.com/RIP21/react-simplemde-editor
const MarkdownEditor = (props) => {
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
    };
  }, []);

  const onInputChange = (e) => {
    console.log(e);
    props.setDescription(e);
  };

  return (
    <SimpleMDE
      options={autofocusNoSpellcheckerOptions}
      value={props.description}
      onChange={onInputChange}
      className="markdown-area-style"
      placeholder={props.placeholder}
    />
  );
};
export default MarkdownEditor;
