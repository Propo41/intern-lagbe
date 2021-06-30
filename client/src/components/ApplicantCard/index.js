import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import {Button, Card, CardContent, Grid,} from "@material-ui/core";

const ApplicantCard = (props) => {
  return (
    <Card className="rounded-card">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <h1 className="sub-heading">{props.name}</h1>
            <h1 className="card-location sub-content">{props.mail}</h1>
            <h1 className="card-location sub-content">{props.contact}</h1>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className="vertical-align"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button className="circular-button">
              <DeleteIcon style={{ color: "var(--red)" }} />
            </Button>
            <Button className="circular-button">
              <GetAppIcon style={{ color: "var(--purple)" }} />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicantCard;
