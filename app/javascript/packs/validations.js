const validations = {
    checkMinLength: function(text, minLength) {
      if(text.length >= minLength) {
        return [true, ""]
      } else if(minLength === 1) {
          return [false, "can't be blank"]
      } else {
        return [false, `length should be at least ${minLength} characters`]
      }
    }
  }
  
  export default validations