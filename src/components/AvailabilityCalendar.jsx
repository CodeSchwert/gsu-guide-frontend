import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AvailbilityCalendar.css';

const localizer = momentLocalizer(moment);
// const localTimezone = moment.tz.guess();
// console.log(localTimezone);

/**
 * @description Availability event returned from the API server
 * @typedef {Object} AvailabilityEvent
 * @property {String} id availability event id
 * @property {String} title availability title
 * @property {String} start availability start time as a UTC string
 * @property {String} end availability end time as a UTC string
 * @property {String} timezone timezone event was booked in
 */

/**
 * @description Availability event returned from the API server
 * @typedef {Object} LocalAvailabilityEvent
 * @property {String} id availability event id
 * @property {String} title availability title
 * @property {Date} start availability start time as a date object
 * @property {Date} end availability end time as a date object
 * @property {String} timezone timezone event was booked in
 */

/**
 * @description Convert UTC start/end strings to local datetime objects.
 * @param {AvailabilityEvent[]} events
 * @returns {LocalAvailabilityEvent[]}
 */
const castToLocalTz = (events) => {
  if (!events || !Array.isArray(events)) {
    throw new Error('Array of availability events required');
  }

  return events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));
}

const AvailbilityCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/availability`);

        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }

        const eventsJSON = await response.json();
        const localEvents = castToLocalTz(eventsJSON);
        setEvents(localEvents);
      } catch (e) {
        // TODO - better error handling
        console.error(e);
      }
    };

    fetchAvailability();
  }, []);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      defaultView="week"
      step={30}
      selectable
      onSelectSlot={(data) => {
        console.log(data);
      }}
      onSelectEvent={(data) => {
        console.log(data);
      }}
    />
  );
};

export default AvailbilityCalendar;
