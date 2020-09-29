import React from 'react'

const EventsList = props => (
  <div>
    {props.events.map(function(event,index){
      return(
        <div key={index} className="event">{event.title}</div>
      )
    })}
  </div>
)

export default EventsList