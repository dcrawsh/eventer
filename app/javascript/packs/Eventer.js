import React from 'react'
import ReactDOM from 'react-dom'
import EventsList from './EventsList'
import EventForm from './EventForm'
import axios from 'axios'
import FormErrors from './FormErrors'
import validations from './validations'
import PropTypes from 'prop-types'


class Eventer extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            events: this.props.events,
            title: {value: '', valid: false},
            start_datetime: {value: '', valid: false},
            location: {value: '', valid: false},
            formErrors: {},
            formValid: false
        }
        this.logo = React.createRef()
    }

    componentDidMount() {
      this.changeLogoColor()
    }

    

    static formValidations = {
        title: [
          (value) => { return(validations.checkMinLength(value, 3)) }
        ],
        start_datetime: [
          (value) => { return(validations.checkMinLength(value, 1)) },
          (value) => { return(validations.timeShouldBeInFuture(value)) }
        ],
        location: [
          (value) => { return(validations.checkMinLength(value, 1)) }
        ]
      }
    

    resetFormErrors = () => this.setState({formErrors: {}})


    
    handleSubmit = e => {
        let newEvent = { title: this.state.title.value, start_datetime: this.state.start_datetime.value, location: this.state.location.value}
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
          this.resetFormErrors()
        })
        .catch(error => {
            this.setState({formErrors: error.response.data})
          console.log(error.response.data)
        })
        e.preventDefault()
        this.setState({ title: {value: '', valid: false},
        start_datetime: {value: '', valid: false},
        location: {value: '', valid: false},
        formErrors: {},
        formValid: false})

      }

      validateField(fieldName, fieldValue, fieldValidations) {
        let fieldValid = true
        let errors = fieldValidations.reduce((errors, validation) => {
          let [valid, fieldError] = validation(fieldValue)
          if(!valid) {
            errors = errors.concat([fieldError])
          }
          return(errors);
        }, []);
    
        fieldValid = errors.length === 0
    
        const newState = {formErrors: {...this.state.formErrors, [fieldName]: errors}}
        newState[fieldName] = {...this.state[fieldName], valid: fieldValid}
        this.setState(newState, this.validateForm)
      }
        
        

      validateForm() {
        this.setState({formValid: this.state.title.valid && this.state.location.valid && this.state.start_datetime.valid})
      }

      changeLogoColor = () => {
        const colors = ["red", "blue", "green", "violet","aqua","lime","crimson","royalblue","khaki","firebrick","orangered","yellow","indigo","darkmagenta"]
        this.logo.current.style.color = colors[Math.floor(Math.random() * colors.length)]
      }
    
    
    
      handleInput = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        const newState = {}
        newState[name] = {...this.state[name], value: value}
        this.setState(newState, () => this.validateField(name, value, Eventer.formValidations[name]))
      }

    addNewEvent = (event) => {
        const events = [event, ...this.state.events].sort(function(a, b){
            return new Date(a.start_datetime) - new Date(b.start_datetime)
          })
        this.setState({events: events}, this.changeLogoColor)
    }
    
    render() {
      return (
        <div>
          <h1 className="logo" ref={this.logo}>Portland Eventer</h1>
          <FormErrors formErrors={this.state.formErrors}/>
          <EventForm title={this.state.title.value} location={this.state.location.value} start_datetime={this.state.start_datetime.value} handleSubmit={this.handleSubmit} handleInput={this.handleInput} 
          handleNewEvent={this.addNewEvent} formValid={this.state.formValid}/>
          <EventsList changeLogoColor={this.changeLogoColor} events={this.state.events} />
        </div>
      )
    }
  }

  Eventer.propTypes = {
    events: PropTypes.array.isRequired
}

document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('events_data')
    const data = JSON.parse(node.getAttribute('data'))
    ReactDOM.render(
        <Eventer events={data}/>,
        document.body.appendChild(document.createElement('div'))
    )
})