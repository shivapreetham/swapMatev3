const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };
  
  const validatePassword = (password) => {
    // Add your password validation logic here (e.g., minimum length, character types)
    return password.length >= 6;
  };
  
  module.exports = { validateEmail, validatePassword };
  