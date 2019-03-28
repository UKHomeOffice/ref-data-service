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

export default class ItemFieldUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      itemObject: {},
      params: props.match.params,
    };
  }

  componentDidMount() {
    const entityDetailUrl = util.format(config.apiEntityDetailUrl, this.state.params.name, this.state.params.id);
    fetch(entityDetailUrl)
      .then(res => res.json())
      .then(obj => {
        this.setState({ itemObject: obj })
      });
  }

  onSubmit(values, form) {
    delete values.day;
    delete values.month;
    delete values.year;

    const entitiesUrl = util.format(config.apiEntityDetailUrl, this.state.params.name, this.state.params.id);
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
    const previousPage = `/entities/${this.state.params.name}/items/${this.state.params.id}`;
    const field = this.state.params.field;
    const data = this.state.itemObject.data;
    const entitySchema = this.state.itemObject.entitySchema;
    let fieldLabel = null;
    let fieldDescription = null;
    let fieldValue = null
    let fieldMaxLength = null;
    let idStyle = null;
    let classStyle = null;

    if (data && entitySchema.properties[field].description) {
      fieldLabel = entitySchema.properties[field].description.label;
      fieldDescription = entitySchema.properties[field].description.description;
      fieldValue = data[field];
      fieldMaxLength = entitySchema.properties[field].maxLength;
      idStyle = `width-${fieldMaxLength}`;
      classStyle = `govuk-input govuk-input--width-${fieldMaxLength}`;
    }

    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to={previousPage}>Back</Link>
        <main id="main-content" className="govuk-main-wrapper" role="main">
          <Form
            onSubmit={this.onSubmit}
            initialValues={{
              newValue: fieldValue,
              field: this.state.params.field,
              name: this.state.params.name,
              id: this.state.params.id
            }}
            validate={values => {
              const errors = {}
              return errors
            }}
            render={({ handleSubmit, submitting, values, reset }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div className="govuk-grid-row">
                    <div className="govuk-grid-column-two-thirds">
                      <h1 className="govuk-heading-xl">Change the data item</h1>
                      <p className="govuk-body-l">Once this form has been submitted, it will be sent for approval.</p>

                      <h1 className="govuk-heading-m">{fieldLabel}</h1>
                      <div className="govuk-form-group">
                        <label className="govuk-label">{fieldDescription}</label>
                        <Field id={idStyle} className={classStyle} name="newValue" component="input" maxLength={fieldMaxLength}/>
                      </div>
                    </div>
                  </div>

                  <div className="govuk-form-group">
                    <fieldset className="govuk-fieldset" aria-describedby="change-hint" role="group">
                      <legend className="govuk-fieldset__legend govuk-fieldset__legend--xl">
                        <h1 className="govuk-heading-m">Change effective from</h1>
                      </legend>
                      <span id="change-hint" className="govuk-hint">For example, 12 11 2019</span>
                      <span id="day-error" className="govuk-error-message">
                        <Error className="govuk-visually-hidden" name="day" />
                      </span>
                      <div className="govuk-date-input" id="change-issued">
                        <div className="govuk-date-input__item">
                          <div className="govuk-form-group">
                            <label className="govuk-label govuk-date-input__label" htmlFor="change-day">Day</label>
                            <Field
                              id="change-day"
                              className="govuk-input govuk-date-input__input govuk-input--width-2"
                              name="day"
                              component="input"
                              pattern="\d{2}"
                              maxLength="2"
                              required/>
                          </div>
                        </div>
                        <div className="govuk-date-input__item">
                          <div className="govuk-form-group">
                            <label className="govuk-label govuk-date-input__label" htmlFor="change-month">Month</label>
                            <Field
                              id="change-month"
                              className="govuk-input govuk-date-input__input govuk-input--width-2"
                              name="month"
                              component="input"
                              pattern="\d{2}"
                              maxLength="2"
                              required/>
                          </div>
                        </div>
                        <div className="govuk-date-input__item">
                          <div className="govuk-form-group">
                            <label className="govuk-label govuk-date-input__label" htmlFor="change-year">Year</label>
                            <Field
                              id="change-year"
                              className="govuk-input govuk-date-input__input govuk-input--width-4"
                              name="year"
                              component="input"
                              pattern="\d{4}"
                              maxLength="4"
                              required/>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <button className="govuk-button" type="submit">Submit change for approval</button>
                </form>
              )
            }}
          />
        </main>
      </div>
    );
  }
}
