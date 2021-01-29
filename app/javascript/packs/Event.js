import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const formatDate = datetime =>
  new Date(datetime).toDateString()


function Event(props) {

const deleteEvent = () => {
  axios({
    method: 'DELETE',
    url: `/events/${props.event.id}`,
    data: { id: props.event.id },
    headers: {
      'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
    }
  }).then(() => location.reload());
}


  return  (
    <div className="event">
      <h2 className="event-title">{props.event.title}</h2>
      <div className="event-datetime">{formatDate(props.event.start_datetime)}</div>
      <div className="event-location">{props.event.location}</div>
      <button onClick={deleteEvent}>X</button>
    </div>
    );
}

  Event.propTypes = {
    event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      start_datetime: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired
    })
  }

export default Event
