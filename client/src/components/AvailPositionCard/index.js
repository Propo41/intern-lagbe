import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlagIcon from "@material-ui/icons/Flag";

import {
  Avatar,
  Button,
  Container,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

import Label from "../Label";

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
}));

const AvailPositionCard = (props) => {
  const onApplyClick = (event) => {
    event.preventDefault();
    console.log("apply clicked");
  };

  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
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
              APPLY
            </Button>
          </Grid>
        </Grid>
      </AccordionSummary>
      {props.expandable ? (
        <AccordionDetails>
          <h1 className="sub-heading">REQUIREMENTS</h1>
          <h1 className="content">{props.more.requirements}</h1>
          <Label text={props.more.mail} icon={"mail"} color={"black"} />
          <Label text={props.more.contact} icon={"phone"} color={"black"} />
        </AccordionDetails>
      ) : (
        ""
      )}
    </Accordion>
  );
};

export default AvailPositionCard;
