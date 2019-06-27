import { Field } from "react-final-form";
import React from 'react';

const ErrorSummaryField = name => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) => (
      touched && error ? <li className='error-field'><a href='#'>{name} is {error}</a></li> : null
    )}
  />
);

const ErrorSummary = ({ fieldProperties }) => {
  let fieldElements = [];

  for (const field in fieldProperties) {
    if (field != 'id') {
      fieldElements.push(ErrorSummaryField(field))
    }
  }
  return fieldElements;
}

export default ErrorSummary;
