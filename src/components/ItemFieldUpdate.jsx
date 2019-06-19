import { Form, Field } from "react-final-form";
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from 'Banner';
import config from '../../config/core';
import logger from '../../logger';

const {appUrls, apiUrls} = config;

const ErrorField = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

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
          required/>
      </div>
    </div>
  )
};

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
);

class ItemFieldUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      itemObject: {},
    };
  }

  componentDidMount() {
    const {name, id} = this.props.match.params;
    const item = util.format(apiUrls.item, name, id);
    fetch(item, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.kc.token}`,
      }
    })
    .then(res => res.json())
    .then(obj => {
      this.setState({ itemObject: obj })
    });
  }

  onSubmit(values, form) {
    delete values.day;
    delete values.month;
    delete values.year;

    const {name, id} = this.props.match.params;
    const item = util.format(apiUrls.item, name, id);
    fetch(item, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.kc.token}`,
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
    let data, description, fieldValue, fieldMaxLength, idStyle, classStyle;
    let {field} = this.props.match.params;
    const backLink = util.format(appUrls.item, this.props.match.params.name, this.props.match.params.id);

    if (this.state.itemObject && this.state.itemObject.entitySchema) {
      ({data} = this.state.itemObject);
      ({description} = this.state.itemObject.entitySchema.properties[field]);
      fieldValue = data[field];
      fieldMaxLength = this.state.itemObject.entitySchema.properties[field].maxLength;
      idStyle = `width-${fieldMaxLength}`;
      classStyle = `govuk-input govuk-input--width-${fieldMaxLength}`;
    }

    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to={backLink}>Back</Link>
        <main id="main-content" className="govuk-main-wrapper" role="main">
          {this.state.itemObject && this.state.itemObject.entitySchema &&
            <Form
              onSubmit={this.onSubmit}
              initialValues={{
                newValue: fieldValue,
                field: this.props.match.params.field,
                name: this.props.match.params.name,
                id: this.props.match.params.id
              }}
              validate={values => {
                const errors = {}
                return errors
              }}
              render={({ handleSubmit, submitting, values }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-two-thirds">
                        <h1 className="govuk-heading-xl">Change the data item</h1>
                        <p className="govuk-body">Once this form has been submitted, it will be sent for approval.</p>
                        <h1 className="govuk-heading-m">{description.label}</h1>
                        <div className="govuk-form-group">
                          <label className="govuk-label">{description.description}</label>
                          <Field id={idStyle} className={classStyle} name="newValue" component="input" maxLength={fieldMaxLength}/>
                        </div>
                      </div>
                    </div>
                    <ChangeEffectiveFromContainer />
                    <button className="govuk-button" type="submit">Submit change for approval</button>
                  </form>
                )
              }}
            />
          }
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
 'kc': state.keycloak
});

export default connect(mapStateToProps)(ItemFieldUpdate);
