import React from 'react'
import ReactDOM from 'react-dom'
import EventLists from './EventList'

const Eventlite = props => (
    <div>
        <EventLists events={props.events}/>
    </div>
)

document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('events_data')
    const data = JSON.parse(node.getAttribute('data'))
    ReactDOM.render(
        <Eventlite events={data}/>,
        document.body.appendChild(document.createElement('div'))
    )
})