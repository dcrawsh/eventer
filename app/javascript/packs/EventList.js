import React from 'react'
import Event from './Event'

const EventsList = props => (
  <div>
    {props.events.map(function(event,index){
      return(
        <Event key={index} event={event}/>
      )
    })}
  </div>
)

export default EventsList