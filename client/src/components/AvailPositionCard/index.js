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
              <h1 className="sub-heading">Software Engineer</h1>
              <h1 className="card-location sub-content">Dhaka, Dhanmondi</h1>
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className="vertical-align"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              className="circular-button"
              aria-label="FlagButton"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
            >
              <FlagIcon style={{ color: "#FEB8B8" }} />
            </Button>
            <Button
              variant="contained"
              aria-label="ApplyButton"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
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
        <h1 className="sub-heading">REQUIREMENTS</h1>
        <h1 className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id turpis a
          nulla id nisl. At urna non hendrerit feugiat aliquet. Proin at blandit
          ut pellentesque at in accumsan platea. Ridiculus ulla id nisl. At urna
          non hendrerit feugiat aliquet. Proin at blandit ut pellentesque at in
          accumsan platea. Ridiculus ulla id nisl. At urna non hendrerit feugiat
          aliquet. Proin at blandit ut pellentesque at in accumsan platea.
          Ridiculus ulla id nisl. At urna non hendrerit feugiat aliquet. Proin
          at blandit ut pellentesque at in accumsan platea. Ridiculus
        </h1>
        <Paper className="label vertical-align">
          <EmailIcon />
          <h1 className="label-font">microsoft@micro.comcccccccc ccccccccc</h1>
        </Paper>
        <Paper className="label vertical-align">
          <PhoneIcon />
          <h1 className="label-font">microsoft@micro.com</h1>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default AvailPositionCard;
