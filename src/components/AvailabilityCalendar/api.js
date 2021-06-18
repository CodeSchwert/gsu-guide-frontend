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
  const { start, end } = event;
  // check event start/end properties are date objects
  if (
    !typeof start.toISOString === 'function' ||
    !typeof end.toISOString === 'function'
  ) {
    throw new Error('Event start/end properties must be Date objects.');
  }

  return {
    ...event,
    start: start.toISOString(),
    end: end.toISOString()
  }
};

const fetchAvailability = async (setEvents) => {
  try {
    const response = await fetch(`${API_SERVER}/availability`);

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

const updateAvailability = async (event) => {
  try {
    if (!event.start || !event.end) {
      throw new Error('Event missing start and/or end times.');
    }

    const castEvent = castToUTC(event);
    console.log(castEvent);

    const response = await fetch(`${API_SERVER}/availability/${event.id}`, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(castEvent)
    });

    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }

    const eventsJSON = await response.json();
    console.log(eventsJSON);
  } catch (e) {
    // TODO - better error handling
    console.error(e);
  }
};

export { fetchAvailability, updateAvailability };
