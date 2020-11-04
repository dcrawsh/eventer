import React from 'react'
import PropTypes from 'prop-types'

const FormErrors = (props) =>
  <div>
    {Object.keys(props.formErrors).map((formErrorField) => {
      return (
        props.formErrors[formErrorField].map((error, index) => {
          return (
            <p key={index}>{formErrorField} {error}</p>
          )
        })
      )
    })}
  </div>

  FormErrors.propTypes = {
      formErrors: PropTypes.object
  }

export default FormErrors

