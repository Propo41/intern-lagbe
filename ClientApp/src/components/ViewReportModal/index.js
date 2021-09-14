import React from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "var(--body-color)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 6, 4),
    borderRadius: 10,
    margin: "0 7rem",
    position: "relative",
  },
}));

const ViewReportModal = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.paper}>
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        View report
      </Typography>
      <Typography variant="h4" gutterBottom>
        Report ID: {props.report.id}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Reporter Email: {props.report.contactEmail}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Company ID: {props.report.companyId}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Reported Job ID: {props.report.jobId}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Reason:
      </Typography>
      <Typography variant="h5" gutterBottom>
        {props.report.reason}
      </Typography>
    </Paper>
  );
};

export default ViewReportModal;
