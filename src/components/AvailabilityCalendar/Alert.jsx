import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />;
};

const Alert = ({ open, alert, handleClose }) => {
  return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={TransitionUp}
        key={TransitionUp ? TransitionUp.name : ''}
      >
        <MuiAlert
          onClose={handleClose}
          severity="error"
          variant="filled"
          elevation={6}
        >
          {alert}
        </MuiAlert>
      </Snackbar>
  );
};

export default Alert;
