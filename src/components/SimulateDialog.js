import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class SimulateDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    // if(this.props.playerName !== '') this.setState({ open: true });
    // TODO: check if all childStates !== '' to ensure that we have a full team
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAgree = () => {
    this.props.simulationCallback();
    this.handleClose();
  };

  handleDisagree = () => {
    this.handleClose();
  };

  render() {
    return (
      <div id="simulation-btn">
        {/* Button to trigger the opening of the dialog */}
        <Button onClick={() => this.handleClickOpen}>Simulate Match</Button>
        {/* Dialog that is displayed if the state open is true */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Would you like to simulate a match?`}
          </DialogTitle>

          <DialogActions>
            <Button onClick={this.handleDisagree} color="primary">
              No
            </Button>
            <Button onClick={this.handleAgree} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SimulateDialog;