import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button, Card, CardContent, Grid } from "@material-ui/core";
import { DELETE_AUTH, GET_AUTH, POST_AUTH } from "../../api/api.js";
import AlertDialog from "../AlertDialog";

const ApplicantCard = (props) => {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [toggleType, setToggleType] = React.useState(null);
  const [alertContent, setAlertContent] = React.useState(null);

  // delete the applicant
  const onDeleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAlertContent({
      title: "Are you sure?",
      subtitle:
        "This action is irreversible and will delete the applicant permanently.",
    });
    // open a confirm dialog
    // if the user clicks ok, delete the applicant
    setAlertOpen(true);
  };

  // function to delete job
  const deleteJob = async () => {
    console.log("deleting..");
    var form = new FormData();
    form.append("id", props.applicant.id);
    try {
      const { data } = await DELETE_AUTH(`api/company/applicant`, form);
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
    setToggleType(null);
  };

  const onAlertClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("alert closed");
    setAlertOpen(false);
  };

  const onAlertConfirm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAlertOpen(false);
    console.log("alert confirmed");
    const exe = async () => {
      await deleteJob();
    };
    exe();
  };

  return (
    <>
      <AlertDialog
        open={alertOpen}
        handleClose={onAlertClose}
        handleConfirm={onAlertConfirm}
        title={alertContent && alertContent.title}
        subtitle={alertContent && alertContent.subtitle}
      />
      <Card className="rounded-card">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={12} md={8}>
              <h1 className="sub-heading">{props.applicant.name}</h1>
              <h1 className="card-location sub-content">
                {props.applicant.contactEmail}
              </h1>
              <h1 className="card-location sub-content">
                {props.applicant.contactPhone}
              </h1>
            </Grid>
            <Grid
              item
              sm={12}
              md={4}
              className="vertical-align"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button className="circular-button" onClick={onDeleteClick}>
                <DeleteIcon style={{ color: "var(--red)" }} />
              </Button>
              <Button className="circular-button">
                <GetAppIcon style={{ color: "var(--purple)" }} />
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ApplicantCard;
