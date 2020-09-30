import React from 'react'
import ReactDOM from 'react-dom'
import EventsList from './EventsList'
import EventForm from './EventForm'
import axios from 'axios'


class Eventlite extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            events: this.props.events,
            title: '',
            start_datetime: '',
            location: ''
        }
    }

    handleSubmit = e => {
        let newEvent = { title: this.state.title, start_datetime: this.state.start_datetime, location: this.state.location}
        axios({
          method: 'POST',
          url: '/events',
          data: { event: newEvent },
          headers: {
            'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
          }
        })
        .then(response => {
          this.addNewEvent(response.data)
        })
        .catch(error => {
          console.log(error)
        })
        e.preventDefault()
      }

    handleInput = (event) => {

        const newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState)
        event.preventDefault();
      }

    addNewEvent = (event) => {
        const events = [event, ...this.state.events].sort(function(a, b){
            return new Date(a.start_datetime) - new Date(b.start_datetime)
          })
        this.setState({events: events})
    }
    
    render() {
      return (
        <div>
          <EventForm title={this.state.title} location={this.state.location} start_datetime={this.state.start_datetime} handleSubmit={this.handleSubmit} handleInput={this.handleInput} handleNewEvent={this.addNewEvent} />
          <EventsList events={this.state.events} />
        </div>
      )
    }
  }

document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('events_data')
    const data = JSON.parse(node.getAttribute('data'))
    ReactDOM.render(
        <Eventlite events={data}/>,
        document.body.appendChild(document.createElement('div'))
    )
})