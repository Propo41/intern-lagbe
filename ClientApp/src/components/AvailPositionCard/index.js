import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlagIcon from "@material-ui/icons/Flag";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Grid,
} from "@material-ui/core";

import Label from "../Label";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ApplyJobModal from "../ApplyJobModal";
import ReportModal from "../ReportModal";
import MarkdownViewer from "../MarkdownViewer";
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
  jobContainer: {
    paddingLeft: "0px",
  },
}));

const AvailPositionCard = (props) => {
  const classes = useStyles();
  const [openApplyModal, setOpenApplyModal] = React.useState(false);
  const [openReportModal, setOpenReportModal] = React.useState(false);

  const onApplyClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.expandable && setOpenApplyModal(true);
  };

  const onReportClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.expandable && setOpenReportModal(true);
  };

  const handleClose = () => {
    setOpenApplyModal(false);
    setOpenReportModal(false);
  };

  return (
    <Accordion
      className="rounded-card"
      onClick={() => {
        console.log(props.id);
      }}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} className={classes.flex}>
            <Container className={classes.jobContainer}>
              <h1 className="sub-heading">{props.title}</h1>
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
            {!props.disabledButton && (
              <Button
                className="circular-button"
                aria-label="FlagButton"
                onClick={onReportClick}
                onFocus={(event) => event.stopPropagation()}
              >
                <FlagIcon style={{ color: "var(--red)" }} />
              </Button>
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
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openApplyModal}
              onClose={handleClose}
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              closeAfterTransition
              BackdropComponent={Backdrop}
              hideBackdrop={false}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openApplyModal}>
                <>
                  <ApplyJobModal
                    jobId={props.id}
                    companyId={props.companyId}
                    title={props.title}
                  />
                </>
              </Fade>
            </Modal>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openReportModal}
              onClose={handleClose}
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              closeAfterTransition
              BackdropComponent={Backdrop}
              hideBackdrop={false}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openReportModal}>
                <>
                  <ReportModal
                    jobId={props.id}
                    companyId={props.companyId}
                    title={props.title}
                  />
                </>
              </Fade>
            </Modal>
          </Grid>
        </Grid>
      </AccordionSummary>
      {props.expandable && (
        <AccordionDetails>
          <h1 className="sub-heading">REQUIREMENTS</h1>
          <MarkdownViewer content={props.more.requirements} />
          <Label text={props.more.contactEmail} icon={"mail"} color={"black"} />
          <Label
            text={props.more.contactPhone}
            icon={"phone"}
            color={"black"}
          />
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default AvailPositionCard;
