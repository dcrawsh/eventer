import React, { Component } from 'react'
import axios from 'axios'

export default class EventForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            start_datetime: '',
            location: ''
        }
    
    }

    handleSubmit = e => {
        axios({
          method: 'POST',
          url: '/events',
          data: { event: this.state },
          headers: {
            'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
          }
        })
        .then(response => {
          this.props.handleNewEvent(response.data)
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
    


    render() {
        return (
            <div>
                <h4>Create an Event</h4>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleInput} type='text' name='title' placeholder='Title' value={this.state.title} />
                    <input onChange={this.handleInput} type='text' name='start_datetime' placeholder='Date' value={this.state.start_datetime} />
                    <input onChange={this.handleInput} type='text' name='location' placeholder='Location' value={this.state.location} />
                    <button type="submit">Create Event</button>
                </form>
            </div>
        )
    }
}
