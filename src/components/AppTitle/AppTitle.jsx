import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles({
  title: {
    flexGrow: 1,
    padding: '15px 0'
  }
});

const AppTitle = () => {
  const classes = styles();

  return (
    <AppBar position="relative">
      <Container>
        <Typography variant="h5" component="h1" className={classes.title}>
          Guide Availability Calendar
        </Typography>
      </Container>
    </AppBar>
  );
};

export default AppTitle;
