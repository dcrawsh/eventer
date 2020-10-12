import React from 'react'
import Event from './Event'
import validations from './validations'

const EventsList = props => (
  <div>
    {props.events.map(function(event,index){
      return(
        <Event key={event.id} event={event}/>
      )
    })}
  </div>
)

export default EventsList