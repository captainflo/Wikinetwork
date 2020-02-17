const validate = values => {
  const errors = {};

  if (!values.message) {
    errors.message = 'Required';
  }

  return errors;
};

export default validate;
