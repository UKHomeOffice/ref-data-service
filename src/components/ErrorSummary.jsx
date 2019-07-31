import { Field } from "react-final-form";
import React from 'react';

const ErrorSummaryField = (field, label) => (
  <Field
    key={field}
    name={field}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) => (
      touched && error ? <li className='error-field'><a href={'#' + field}>{label} is {error}</a></li> : null
    )}
  />
);

const ErrorSummary = ({ fieldProperties }) => {
  let fieldElements = [];

  for (const field in fieldProperties) {
    if (field != 'id') {
      const label = fieldProperties[field].description.label;
      fieldElements.push(ErrorSummaryField(field, label));
    }
  }
  return fieldElements;
}

export default ErrorSummary;
