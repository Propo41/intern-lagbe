import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ToggleAvailableButton from "./ToggleAvailableButton";
import ToggleAvailableLabel from "./ToggleAvailableLabel";
import Grid from "@material-ui/core/Grid";

const PrivateJobCard = (props) => {
  return (
    <Card className="rounded-card">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <h1 className="sub-heading">{props.title}</h1>
            <h1 className="card-location sub-content">{props.location}</h1>
            <ToggleAvailableLabel status={props.status} />
          </Grid>
          <Grid item xs={12} sm={4} className="vertical-align">
            <ToggleAvailableButton status={props.status} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PrivateJobCard;
