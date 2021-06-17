import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import { makeStyles } from '@material-ui/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AvailbilityCalendar.css';

const localizer = momentLocalizer(moment);

const AvailbilityCalendar = () => {
  return <Calendar localizer={localizer} events={[]} />;
};

export default AvailbilityCalendar;
