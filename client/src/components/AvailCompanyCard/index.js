import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlagIcon from "@material-ui/icons/Flag";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
} from "@material-ui/core";

import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  disabledButton: {
    backgroundColor: "var(--light-purple)",
    color: "white",
    marginLeft: "10px",
  },
  enabledButton: {
    backgroundColor: "var(--purple)",
    color: "white",
    marginLeft: "10px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AvailCompanyCard = (props) => {
  const classes = useStyles();

  const onApplyClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Card
      className="rounded-card"
      onClick={() => {
        console.log(props.id);
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} className={classes.flex}>
            <Avatar
              variant="rounded"
              src="/dummy_logo.png"
              className={classes.large}
            />
            <Container>
              <h1 className="sub-heading">{props.company}</h1>
              <h1 className="card-location sub-content">{props.address}</h1>
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className="vertical-align"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {!props.disabledButton ? (
              <Button
                className="circular-button"
                aria-label="FlagButton"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
              >
                <FlagIcon style={{ color: "var(--red)" }} />
              </Button>
            ) : (
              ""
            )}

            <Button
              variant="contained"
              aria-label="ApplyButton"
              onClick={onApplyClick}
              onFocus={(event) => event.stopPropagation()}
              disabled={props.disabledButton}
              className={
                props.disabledButton
                  ? classes.disabledButton
                  : classes.enabledButton
              }
            >
              <Link
                to={{
                  pathname: `/company/${props.id}`,
                }}
              >
                APPLY
              </Link>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AvailCompanyCard;
