import { makeStyles } from "@material-ui/core";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
  markdown: {
    color: "var(--black)",
    fontFamily: "var(--font-family-sen)",
    fontSize: "var(--font-size-content)",
  },
}));

const MarkdownViewer = (props) => {
  const classes = useStyles();

  return (
    <ReactMarkdown children={props.content} className={classes.markdown} />
  );
};

export default MarkdownViewer;
