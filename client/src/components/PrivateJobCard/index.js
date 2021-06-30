import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ToggleAvailableButton from "./ToggleAvailableButton";
import ToggleAvailableButtonMobile from "../ToggleAvailableButtonMobile";
import ToggleAvailableLabel from "./ToggleAvailableLabel";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "@material-ui/core";

const PrivateJobCard = (props) => {
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  return (
    <Card className="rounded-card">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <h1 className="sub-heading">{props.title}</h1>
            <h1 className="card-location sub-content">{props.location}</h1>
            <ToggleAvailableLabel status={props.status} />
          </Grid>
          <Grid item xs={5} className="vertical-align">
            {mobileViewBreakpoint ? (
              <ToggleAvailableButton status={props.status} />
            ) : (
              <ToggleAvailableButtonMobile status={props.status} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PrivateJobCard;
