import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ToggleAvailableButton from "./ToggleAvailableButton";
import ToggleAvailableLabel from "./ToggleAvailableLabel";
import Grid from "@material-ui/core/Grid";

const PrivateJobCard = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <h1 className="sub-heading">Software Engineer</h1>
            <h1 className="card-location sub-content">Dhaka, Dhanmondi</h1>
            <ToggleAvailableLabel />
          </Grid>
          <Grid item xs={12} sm={4} className="vertical-align">
            <ToggleAvailableButton />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PrivateJobCard;
