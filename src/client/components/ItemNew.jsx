import { Form, Field } from "react-final-form";
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from 'Banner';
import config from '../../config/core';
import logger from '../../logger';

const { appUrls, apiUrls } = config;

// validation
// TODO want to check what type of field it is and validate it accordingly
const required = value => (value ? undefined : 'Required');

const ErrorField = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

const ItemFields = ({ requiredFields, fieldProperties }) => {
  let fieldElements = [];

  for (const field in fieldProperties) {
    if (field !== 'id') {
      let idHintStyle = `${field}-hint`;
      let idErrorStyle = `${field}-error`;
      let inputWidth = `govuk-input govuk-input--width-${fieldProperties[field].maxLength}`;

      const itemFields = (
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor={field}>{fieldProperties[field].description.label}</label>
          <span id={idHintStyle} className="govuk-hint">{fieldProperties[field].description.description}</span>
          <span id={idErrorStyle} className="govuk-error-message">
            <ErrorField className="govuk-visually-hidden" name={field} />
          </span>
          <Field className={inputWidth} name={field} component="input"/>
        </div>
      );

      if (requiredFields.includes(field)) {
        fieldElements.push(
          <Field
            name={field}
            validate={required}
            key={field}
            render={() => itemFields}
          />
        );
      } else {
        fieldElements.push(
          <Field
            name={field}
            key={field}
            render={() => itemFields}
          />
        );
      }
    }
  }
  return fieldElements;
};

class ItemNew extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { name } = this.props.match.params;
    const entitySchema = util.format(apiUrls.entitySchema, name);

    fetch(entitySchema, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.kc.token}`,
      }
    })
    .then(res => res.json())
    .then(obj => this.setState({ data: obj }));
  }

  handleSubmit(values, form) {
    const entity = util.format(apiUrls.entity, this.props.match.params.name);
    fetch(entity, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.kc.token}`,
      },
      body: JSON.stringify(values, 0, 2)
    })
    .then(res => res.json())
    .then(data => {
      this.props.history.push({
        pathname: '/change_request_submitted'
        // state: will carry the 'reference number'
      });
    })
    .catch(error => logger.error(error))
  }

  render() {
    let fieldProperties, requiredFields;
    const backLink = util.format(appUrls.entity, this.props.match.params.name);

    if (this.state.data && this.state.data.entitySchema) {
      (fieldProperties = this.state.data.entitySchema.properties);
      (requiredFields = this.state.data.entitySchema.required);
    }

    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to={backLink}>Back</Link>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Add a new data item to the entity</h1>
              <p className="govuk-body-m">Please provide the following information. Once this form has been submitted, it will be sent to the data owner selected for approval.</p>
              <Form
                onSubmit={this.handleSubmit}
                render={({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    {this.state.data && this.state.data.entitySchema &&
                      <ItemFields requiredFields={requiredFields} fieldProperties={fieldProperties} />
                    }
                    <button className="govuk-button" type="submit" disabled={submitting}>Submit change for approval</button>
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

const mapStateToProps = state => ({
 'kc': state.keycloak
});

export default connect(mapStateToProps)(ItemNew);
