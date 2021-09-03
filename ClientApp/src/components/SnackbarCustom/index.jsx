import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: "var(--font-family-sen)",
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * @param {bool} open
 * @param {string} severity success, error, warning, info
 * @param {string} message
 * @param {func} setSnackbar
 * @param {int} duration
 */

const SnackbarCustom = (props) => {
  const classes = useStyles();

  const vertical = "bottom";
  const horizontal = "center";

  const handleClose = (event) => {
    props.setSnackbar({ open: false });
  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={props.duration || 3000}
      key={vertical + horizontal}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.severity}>
        <span className={classes.text}>{props.message}</span>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarCustom;
