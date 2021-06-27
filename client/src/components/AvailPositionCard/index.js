import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import FlagIcon from "@material-ui/icons/Flag";
import { Button } from "@material-ui/core";

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

const AvailPositionCard = () => {
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
              <h2 className="sub-heading">Software Engineer</h2>
              <h3 className="card-location sub-content">Dhaka, Dhanmondi</h3>
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className="vertical-align"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button className="circular-button">
              <FlagIcon style={{ color: "#FEB8B8" }} />
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#54499E",
                color: "white",
                marginLeft: "10px",
              }}
            >
              APPLY
            </Button>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <h3 className="sub-heading">REQUIREMENTS</h3>
        <h4 className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id turpis a
          nulla id nisl. At urna non hendrerit feugiat aliquet. Proin at blandit
          ut pellentesque at in accumsan platea. Ridiculus
        </h4>
      </AccordionDetails>
    </Accordion>
  );
};

export default AvailPositionCard;
