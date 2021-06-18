import { useState, useEffect, useReducer } from 'react';
import moment from 'moment-timezone';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import EventDialogue from './EventDialogue';
import { fetchAvailability, updateAvailability } from './api';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AvailbilityCalendar.css';

const localizer = momentLocalizer(moment);
// const localTimezone = moment.tz.guess();
// console.log(localTimezone);

const reducer = (state, action) => {
  console.log('reducer.state', state);
  console.log('reducer.action', action);
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
  const [selectedEvent, dispatch] = useReducer(reducer, {});

  const handleOpenDialogue = () => {
    setOpen(true);
  };

  const handleCloseDialogue = () => {
    setOpen(false);
    dispatch({ type: 'deselectEvent' });
  };

  const handleEventSelected = (data) => {
    console.log('handleEventSelected', data);
    dispatch({ type: 'selectEvent', value: data });
    handleOpenDialogue();
  };

  const handleStartChange = (time) => {
    console.log('handleStartChange', time);
    dispatch({ type: 'updateStart', value: time });
  };

  const handleEndChange = (time) => {
    console.log('handleEndChange', time);
    dispatch({ type: 'updateEnd', value: time });
  };

  const handleTitleChange = (e) => {
    console.log('handleTitleChange', e);
    dispatch({ type: 'updateTitle', value: e.target.value })
  }

  const handleSubmit = (data) => {
    console.log('handleSubmit', data);
    updateAvailability(selectedEvent);
  };

  useEffect(() => {
    fetchAvailability(setEvents);
  }, []);

  return (
    <div>
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
        onSelectSlot={(data) => {
          console.log(data);
          handleOpenDialogue();
        }}
        onSelectEvent={handleEventSelected}
      />
    </div>
  );
};

export default AvailbilityCalendar;
