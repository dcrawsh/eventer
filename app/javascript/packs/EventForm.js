import React, { Component } from 'react'

export default class EventForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            start_datetime: '',
            location: ''
        }
    
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
                <form>
                    <input onChange={this.handleInput} type='text' name='title' placeholder='Title' value={this.state.title} />
                    <input onChange={this.handleInput} type='text' name='start_datetime' placeholder='Date' value={this.state.start_datetime} />
                    <input onChange={this.handleInput} type='text' name='location' placeholder='Location' value={this.state.location} />
                    <button type="submit">Create Event</button>
                </form>
            </div>
        )
    }
}
