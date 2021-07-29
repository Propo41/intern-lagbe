import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

/**
 * @param {bool} open
 * @param {string} severity success, error, warning
 * @param {string} message
 */

const SnackbarCustom = (props) => {
  const vertical = "top";
  const horizontal = "center";
  return (
    <Snackbar
      open={props.snackbar}
      autoHideDuration={6000}
      key={vertical + horizontal}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
};

export default SnackbarCustom;
