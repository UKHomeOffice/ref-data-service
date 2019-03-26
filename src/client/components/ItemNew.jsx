import { Form, Field } from "react-final-form";
import React from 'react';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from 'Banner';
import config from '../../config/core';
import logger from '../../logger';

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }/>
)

export default class ItemNew extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {params: props.match.params};
  }

  handleSubmit(values, form) {
    const entitiesUrl = util.format(config.apiEntitiesUrl, this.state.params.name);
    fetch(entitiesUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values, 0, 2)
    })
    .then(res => res.json())
    .then(data => {
      this.props.history.push({
        pathname: `/entities/${this.state.params.name}/created`
        // state: will carry the 'reference number'
      });
    })
    .catch(error => logger.error(error))

    // reseting form values
    form.reset();
  }

  render() {
    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to={`/entities/${this.state.params.name}`}>Back</Link>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Add a new data item to the entity</h1>
              <p className="govuk-body-l">Please provide the following information. Once this form has been submitted, it will be sent to the data owner selected for approval.</p>
              <Form
                onSubmit={this.handleSubmit}
                validate={values => {
                  const errors = {}
                  const errorMessage = 'This field is required';
                  if (!values.id) {
                    errors.id = errorMessage
                  }
                  if (!values.iso31661alpha3) {
                    errors.iso31661alpha3 = errorMessage
                  }
                  if (!values.name) {
                    errors.name = errorMessage
                  }
                  if (!values.continent) {
                    errors.continent = errorMessage
                  }
                  if (!values.dial) {
                    errors.dial = errorMessage
                  }
                  if (!values.iso31661numeric) {
                    errors.iso31661numeric = errorMessage
                  }
                  return errors
                }}
                render={({ handleSubmit, submitting, values, reset}) => (
                  <form onSubmit={handleSubmit}>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="id">ID</label>
                      <span id="id-hint" className="govuk-hint">An identifier for the data item, for example TW</span>
                      <span id="id-error" className="govuk-error-message">
                        <Error className="govuk-visually-hidden" name="id" />
                      </span>
                      <Field className="govuk-input" name="id" component="input"/>
                    </div>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="iso31661alpha3">ISO 3166-1 Alpha</label>
                      <span id="iso31661alpha3-hint" className="govuk-hint">The 3 digit ISO alpha code for the country, for example TWN</span>
                      <span id="iso31661alpha3-error" className="govuk-error-message">
                        <Error className="govuk-visually-hidden" name="iso31661alpha3" />
                      </span>
                      <Field className="govuk-input" name="iso31661alpha3" component="input"/>
                    </div>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="name">Name</label>
                      <span id="name-hint" className="govuk-hint">The name of the country</span>
                      <span id="name-error" className="govuk-error-message">
                        <Error className="govuk-visually-hidden" name="name" />
                      </span>
                      <Field className="govuk-input" name="name" component="input"/>
                    </div>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="continent">Continent</label>
                      <span id="continent-hint" className="govuk-hint">The 2 digit ISO alpha code for the contninet the country is in, for exmaple AS</span>
                      <span id="continent-error" className="govuk-error-message">
                        <Error className="govuk-visually-hidden" name="continent" />
                      </span>
                      <Field className="govuk-input" name="continent" component="input"/>
                    </div>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="dial">Dialling Code</label>
                      <span id="dial-hint" className="govuk-hint">The international dialling code for the country, for example 886</span>
                      <span id="dial-error" className="govuk-error-message">
                        <Error className="govuk-visually-hidden" name="dial" />
                      </span>
                      <Field className="govuk-input" name="dial" component="input"/>
                    </div>
                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="iso31661numeric">ISO 3166-1 Numeric</label>
                      <span id="iso31661numeric-hint" className="govuk-hint">The 3 digit ISO numeric code for the country, for example 158</span>
                      <span id="iso31661numeric-error" className="govuk-error-message">
                        <Error className="govuk-visually-hidden" name="iso31661numeric" />
                      </span>
                      <Field className="govuk-input" name="iso31661numeric" component="input"/>
                    </div>
                    <button className="govuk-button" type="submit">Submit change for approval</button>
                  </form>
                )}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

