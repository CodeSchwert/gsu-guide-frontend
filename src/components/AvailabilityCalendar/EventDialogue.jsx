import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
  spacer: {
    padding: '15px'
  },
  hidden: {
    visibility: 'hidden'
  },
  visibile: {
    visibility: 'visible'
  }
});

const EventDialogue = ({
  open,
  eventId,
  title,
  start,
  end,
  handleStartChange,
  handleEndChange,
  handleTitleChange,
  handleClose,
  handleSubmit,
  handleDelete
}) => {
  const classes = styles();

  const submitDisabled = !title || !start || !end ? true : false;
  const deleteVisible = eventId ? classes.visibile : classes.hidden;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Teaching Availability</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Submit your teaching availability for the selected period.
        </DialogContentText>
        <TextField
          margin="dense"
          id="teaching-description"
          label="Description (required)"
          type="text"
          value={title || ''} // workaround for stuck label
          onChange={handleTitleChange}
          fullWidth
          required
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            id="start-time-picker"
            label="Start Time"
            mask="__:__ _M"
            value={start}
            onChange={handleStartChange}
            KeyboardButtonProps={{
              'aria-label': 'change time'
            }}
            required
          />
          <span className={classes.spacer}></span>
          <KeyboardTimePicker
            margin="normal"
            id="end-time-picker"
            label="End Time"
            mask="__:__ _M"
            value={end}
            onChange={handleEndChange}
            KeyboardButtonProps={{
              'aria-label': 'change time'
            }}
            required
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDelete}
          color="secondary"
          className={deleteVisible}
        >
          Delete
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={submitDisabled}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialogue;
