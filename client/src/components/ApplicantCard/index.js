import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";

const ApplicantCard = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <h2 className="sub-heading">Applicant name</h2>
            <h3 className="card-location sub-content">Dhaka, Dhanmondi</h3>
            <h3 className="card-location sub-content">+880 19661 84892</h3>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className="vertical-align"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button className="circular-button">
              <DeleteIcon style={{ color: "#FEB8B8" }} />
            </Button>
            <Button className="circular-button">
              <GetAppIcon style={{ color: "#54499E" }} />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicantCard;
