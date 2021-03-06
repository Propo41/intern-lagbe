import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ToggleAvailableButton from "./ToggleAvailableButton";
import ToggleAvailableButtonMobile from "../ToggleAvailableButtonMobile";
import ToggleAvailableLabel from "./ToggleAvailableLabel";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "@material-ui/core";
import { Link } from "react-router-dom";

const PrivateJobCard = (props) => {
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const jobUrl = `/job/${props.id}`;

  return (
    <Link to={jobUrl}>
      <Card className="rounded-card" style={{ cursor: "pointer" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <h1 className="sub-heading">{props.title}</h1>
              <h1 className="card-location sub-content">{props.location}</h1>
              <ToggleAvailableLabel status={props.status} />
            </Grid>
            <Grid item xs={5} className="vertical-align">
              {mobileViewBreakpoint ? (
                <ToggleAvailableButton
                  status={props.status}
                  id={props.id}
                  loadingBar={props.loadingBar}
                />
              ) : (
                <ToggleAvailableButtonMobile
                  status={props.status}
                  id={props.id}
                  loadingBar={props.loadingBar}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PrivateJobCard;
