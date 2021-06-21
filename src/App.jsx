import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import AppTitle from './components/AppTitle';
import AvailabilityCalendar from './components/AvailabilityCalendar';

const styles = makeStyles({
  root: {
    backgroundColor: '#fff',
    minHeight: '100vh'
  },
  calendarContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  subTitle: {
    padding: '15px 0'
  }
});

const App = () => {
  const classes = styles();

  return (
    <CssBaseline>
      <div className={classes.root}>
        <AppTitle />

        <Container className={classes.calendarContainer}>
          <Typography
            variant="subtitle1"
            className={classes.subTitle}
            gutterBottom
          >
            Book your teaching availability.
          </Typography>

          <AvailabilityCalendar />
        </Container>
      </div>
    </CssBaseline>
  );
};

export default App;
