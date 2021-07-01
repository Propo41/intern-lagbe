import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlagIcon from "@material-ui/icons/Flag";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Container,
  Grid,
} from "@material-ui/core";

import Label from "../Label";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ApplyJobModal from "../ApplyJobModal";
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

const AvailPositionCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const applyUrl = !props.expandable && `/company/${props.company}`;

  const onApplyClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.expandable && setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Accordion className="rounded-card">
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
              <Link to={applyUrl}>APPLY</Link>
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              hideBackdrop={false}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                {/* <div className={classes.paper}>
                  <Button>egeg</Button>
                  <h2 id="transition-modal-title">Transition modal</h2>
                  <p id="transition-modal-description">
                    react-transition-group animates me.
                  </p>
                </div> */}
                <ApplyJobModal />
              </Fade>
            </Modal>
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
