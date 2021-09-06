import { makeStyles } from "@material-ui/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

/**
 * A component that returns an alert view
 * @param severity 'error'|'info'|'success'|'warning'
 * @param title title text
 * @param message subtitle text
 */

const _Alert = (props) => {
  const useStyles = makeStyles((theme) => ({
    alert: {
      marginTop: theme.spacing(3),
      borderRadius: theme.spacing(1),
      textAlign: "left",
      fontFamily: "Sen",
    },
    alertTitle: {
      fontFamily: "Sen",
      fontWeight: "bold",
    },
  }));

  const classes = useStyles();

  return (
    <Alert severity={props.severity} className={classes.alert}>
      <AlertTitle className={classes.alertTitle}>{props.title}</AlertTitle>
      {props.message.map((item, i) => {
        return <li key={i}>{item}</li>;
      })}
    </Alert>
  );
};
export default _Alert;
