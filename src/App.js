import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import AvailabilityCalendar from './components/AvailabilityCalendar';

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    minHeight: '100vh'
  },
  calendarContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    padding: '15px 0'
  },
  subTitle: {
    padding: '15px 0'
  }
}));

const App = () => {
  const classes = styles();

  return (
    <CssBaseline>
      <div className={classes.root}>
        <AppBar position="relative">
          <Container>
            <Typography variant="h5" component="h1" className={classes.title}>
              Guide Availability Calendar
            </Typography>
          </Container>
        </AppBar>
        <Container className={classes.calendarContainer}>
          <Typography variant="subtitle1" className={classes.subTitle} gutterBottom>
            Book your teaching availability.
          </Typography>

          <AvailabilityCalendar />
        </Container>
      </div>
    </CssBaseline>
  );
}

export default App;
