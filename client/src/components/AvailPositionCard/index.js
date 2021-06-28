import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlagIcon from "@material-ui/icons/Flag";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

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
}));

const AvailPositionCard = (props) => {
  const onApplyClick = (event) => {
    event.preventDefault();
    console.log("apply clicked");
  };

  const classes = useStyles();
  return (
    <Accordion expanded={props.expandable}>
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
            {props.expandable ? (
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
              style={{
                backgroundColor: "var(--purple)",
                color: "white",
                marginLeft: "10px",
              }}
            >
              APPLY
            </Button>
          </Grid>
        </Grid>
      </AccordionSummary>
      {props.expandable ? (
        <AccordionDetails>
          <h1 className="sub-heading">REQUIREMENTS</h1>
          <h1 className="content">{props.description}</h1>
          <Paper className="label vertical-align">
            <EmailIcon />
            <h1 className="label-font">{props.email}</h1>
          </Paper>
          <Paper className="label vertical-align">
            <PhoneIcon />
            <h1 className="label-font"> {props.contact}</h1>
          </Paper>
        </AccordionDetails>
      ) : (
        ""
      )}
    </Accordion>
  );
};

export default AvailPositionCard;
