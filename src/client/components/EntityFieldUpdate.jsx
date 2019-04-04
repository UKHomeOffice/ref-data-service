import { Form, Field } from "react-final-form";
import React from 'react';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from 'Banner';
import config from '../../config/core';
import logger from '../../logger';

const ErrorField = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

const DateInput = ({ name, maxLength }) => {
  const idStyle = `change-${name}`;
  const classStyle = `govuk-input govuk-input--width-${maxLength}`;
  const pattern = `\\d{${maxLength}}`;
  const labelNames = ['Day', 'Month', 'Year'];
  const label = labelNames.filter(day => day.toLowerCase() === name).toString();

  return (
    <div className="govuk-date-input__item">
      <div className="govuk-form-group">
        <label className="govuk-label govuk-date-input__label">{label}</label>
        <Field
          id={idStyle}
          className={classStyle}
          name={name}
          component="input"
          pattern={pattern}
          required
        />
      </div>
    </div>
  )
}

const ChangeEffectiveFromContainer = () => (
  <div className="govuk-form-group">
    <fieldset className="govuk-fieldset" aria-describedby="change-hint" role="group">
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--xl">
        <h1 className="govuk-heading-m">Change effective from</h1>
      </legend>
      <span id="change-hint" className="govuk-hint">For example, 12 11 2019</span>
      <span id="day-error" className="govuk-error-message">
        <ErrorField className="govuk-visually-hidden" name="day" />
      </span>
      <div className="govuk-date-input" id="change-issued">
        <DateInput name="day" maxLength="2" />
        <DateInput name="month" maxLength="2" />
        <DateInput name="year" maxLength="4" />
      </div>
    </fieldset>
  </div>
)

export default class ItemFieldUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entityObject: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {name} = this.props.match.params;
    const entitiesUrl = util.format(config.apiEntitiesUrl, name);
    fetch(entitiesUrl)
      .then(res => res.json())
      .then(obj => {
        this.setState({ entityObject: obj })
      });
  }

  onSubmit(values, form) {
    // TODO: Update the API to accept dates
    delete values.day;
    delete values.month;
    delete values.year;

    const {name} = this.props.match.params;
    const entitiesUrl = util.format(config.apiEntitiesUrl, name);
    fetch(entitiesUrl, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values, 0, 2)
    })
    .then(res => res.json())
    .then(data => {
      logger.info(`PATCH: ${data.status}, ${data.code}`);
      this.props.history.push({
        pathname: '/change_request_submitted'
        // state: will carry the 'reference number'
      });
    })
    .catch(error => logger.error(error))
  }

  render() {
    let field, entityName, entityLabel, description;

    if (this.state.entityObject && this.state.entityObject.entitySchema) {
      ({field} = this.props.match.params);
      ({entityName, entityLabel} = this.state.entityObject);
      ({description} = this.state.entityObject.entitySchema);
    }

    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to="">Back</Link>
        <main id="main-content" className="govuk-main-wrapper" role="main">
          <div className="govuk-grid-row">
            {this.state.entityObject && this.state.entityObject.entitySchema &&
              <div className="govuk-grid-column-two-thirds">
                <h1 className="govuk-heading-xl">{entityLabel}</h1>
                <Form
                  onSubmit={this.onSubmit}
                  initialValues={{
                    name: entityName,
                    field: field,
                    newValue: description[field],
                  }}
                  validate={values => {
                    const errors = {};
                    return errors
                  }}
                  render={({ handleSubmit, submitting, values }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <div className="govuk-form-group">
                          <label className="govuk-label govuk-label--m" htmlFor="description">Description</label>
                          <Field className="govuk-textarea" name="newValue" rows="5" aria-describedby="description" component="textarea" />
                        </div>
                        <ChangeEffectiveFromContainer />
                        <button className="govuk-button" type="submit">Submit change for approval</button>
                      </form>
                    )
                  }}
                />
              </div>
            }
          </div>
        </main>
      </div>
    )
  }
}
