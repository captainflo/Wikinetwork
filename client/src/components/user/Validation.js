const validate = values => {
  const errors = {};
  if (values.description && values.description.length <= 10) {
    errors.description = 'Must be 10 characters or More';
  }
  return errors;
};

export default validate;
