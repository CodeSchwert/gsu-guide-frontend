import moment from 'moment-timezone';

/**
 * Data access module
 */

const API_SERVER = process.env.REACT_APP_API_SERVER;

/**
 * Availability event returned from the API server
 * @typedef {Object} AvailabilityEvent
 * @property {String} id availability event id
 * @property {String} title availability title
 * @property {String} start availability start time as a UTC string
 * @property {String} end availability end time as a UTC string
 * @property {String} timezone timezone event was booked in
 */

/**
 * Availability event returned from the API server
 * @typedef {Object} LocalAvailabilityEvent
 * @property {String} id availability event id
 * @property {String} title availability title
 * @property {Date} start availability start time as a date object
 * @property {Date} end availability end time as a date object
 * @property {String} timezone timezone event was booked in
 */

/**
 * Convert UTC start/end strings to local datetime objects.
 * @param {AvailabilityEvent[]} events
 * @returns {LocalAvailabilityEvent[]}
 */
const castToLocalTz = (events) => {
  if (!events || !Array.isArray(events)) {
    throw new Error('Array of availability events required');
  }

  return events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));
};

const castToUTC = (event) => {
  const { id, title, start, end } = event;
  // check event start/end properties are date objects
  if (
    !typeof start.toISOString === 'function' ||
    !typeof end.toISOString === 'function'
  ) {
    throw new Error('Event start/end properties must be Date objects.');
  }

  const utcEvent = {
    title,
    start: start.toISOString(),
    end: end.toISOString(),
    timezone: moment.tz.guess()
  };

  if (id) {
    utcEvent.id = id;
  }

  return utcEvent;
};

const fetchAvailability = async (setEvents, handleOpenAlert) => {
  try {
    const response = await fetch(`${API_SERVER}/availability`);

    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }

    const eventsJSON = await response.json();
    const localEvents = castToLocalTz(eventsJSON);
    setEvents(localEvents);
  } catch (e) {
    console.error(e);
    handleOpenAlert(e.message);
  }
};

const updateAvailability = async (event, handleOpenAlert) => {
  try {
    if (!event.start || !event.end) {
      throw new Error('Event missing start and/or end times.');
    }

    const castEvent = castToUTC(event);

    const response = await fetch(`${API_SERVER}/availability/${event.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(castEvent)
    });

    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  } catch (e) {
    console.error(e);
    handleOpenAlert(e.message);
  }
};

const addAvailability = async (event, handleOpenAlert) => {
  try {
    if (!event.start || !event.end) {
      throw new Error('Event missing start and/or end times.');
    }
    if (!event.title) {
      throw new Error('Event description missing.');
    }

    const castEvent = castToUTC(event);

    const response = await fetch(`${API_SERVER}/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(castEvent)
    });

    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  } catch (e) {
    console.error(e);
    handleOpenAlert(e.message);
  }
};

const deleteAvailability = async (event, handleOpenAlert) => {
  try {
    if (!event.id) {
      throw new Error('Event id missing.');
    }

    const response = await fetch(`${API_SERVER}/availability/${event.id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  } catch (e) {
    console.error(e);
    handleOpenAlert(e.message);
  }
};

export {
  addAvailability,
  fetchAvailability,
  updateAvailability,
  deleteAvailability
};
