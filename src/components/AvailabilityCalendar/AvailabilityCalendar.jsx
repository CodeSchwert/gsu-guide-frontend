import { useState, useEffect, useReducer } from 'react';
import moment from 'moment-timezone';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Alert from './Alert';
import EventDialogue from './EventDialogue';
import { addAvailability, fetchAvailability, updateAvailability } from './api';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AvailbilityCalendar.css';

const localizer = momentLocalizer(moment);

const reducer = (state, action) => {
  switch (action.type) {
    case 'selectEvent':
      return action.value;
    case 'deselectEvent':
      return {};
    case 'updateTitle':
      return { ...state, title: action.value };
    case 'updateStart':
      return { ...state, start: action.value };
    case 'updateEnd':
      return { ...state, end: action.value };
    default:
      throw new Error('Dispatch missing action type.');
  }
};

const AvailbilityCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false); // open dialogue box
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState('');
  const [selectedEvent, dispatch] = useReducer(reducer, {});

  const handleOpenDialogue = () => {
    setOpen(true);
  };

  const handleCloseDialogue = () => {
    setOpen(false);
    dispatch({ type: 'deselectEvent' });
  };

  const handleEventSelected = (data) => {
    dispatch({ type: 'selectEvent', value: data });
    handleOpenDialogue();
  };

  const handleTimeSlotSelected = (data) => {
    console.log('handleTimeSlotSelected', data);
    dispatch({ type: 'selectEvent', value: data });
    handleOpenDialogue();
  };

  const handleStartChange = (time) => {
    dispatch({ type: 'updateStart', value: time });
  };

  const handleEndChange = (time) => {
    dispatch({ type: 'updateEnd', value: time });
  };

  const handleTitleChange = (e) => {
    dispatch({ type: 'updateTitle', value: e.target.value });
  };

  const handleSubmit = async () => {
    if (!selectedEvent.id) {
      await addAvailability(selectedEvent, handleOpenAlert);
    } else {
      await updateAvailability(selectedEvent, handleOpenAlert);
    }
    handleCloseDialogue();
    await fetchAvailability(setEvents, handleOpenAlert);
  };

  const handleOpenAlert = (alertMessage) => {
    setAlert(alertMessage);
    setOpenAlert(true);
  };

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    fetchAvailability(setEvents, handleOpenAlert);
  }, []);

  return (
    <div>
      <Alert open={openAlert} alert={alert} handleClose={handleCloseAlert} />

      <EventDialogue
        open={open}
        title={selectedEvent.title}
        start={selectedEvent.start}
        end={selectedEvent.end}
        handleStartChange={handleStartChange}
        handleEndChange={handleEndChange}
        handleTitleChange={handleTitleChange}
        handleClose={handleCloseDialogue}
        handleSubmit={handleSubmit}
      />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        step={30}
        selectable
        onSelectSlot={handleTimeSlotSelected}
        onSelectEvent={handleEventSelected}
      />
    </div>
  );
};

export default AvailbilityCalendar;
