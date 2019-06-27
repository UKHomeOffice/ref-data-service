import React from 'react';
import util from 'util';
import { Form, FormSpy, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// local imports
import Banner from './Banner';
import ErrorSummary from './ErrorSummary';
import config from '../../config/core';
import logger from '../../logger';
import {
  getRequiredTouchedFieldKeys,
  touchedFieldHasValue
} from '../utils';

const { appUrls, apiUrls } = config;

// validation
// TODO want to check what type of field it is and validate it accordingly
const required = value => (value ? undefined : 'Required');

const ErrorField = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) => (
      touched && error ? <span>{error}</span> : null
    )}
  />
)

const InputField = ({ field, fieldProperties, meta: { touched, error} }) => {
    const idHintStyle = `${field}-hint`;
    const idErrorStyle = `${field}-error`;
    const inputWidth = `govuk-input govuk-date-input__input govuk-input--width-${fieldProperties[field].maxLength}`;

    return (
      <div className={error && touched ? 'govuk-form-group govuk-form-group--error': 'govuk-form-group'}>
        <label className='govuk-label' htmlFor={field}>{fieldProperties[field].description.label}</label>
        <span id={idHintStyle} className='govuk-hint'>{fieldProperties[field].description.description}</span>
        <span id={idErrorStyle} className='govuk-error-message'>
          <ErrorField name={field} />
        </span>
        <Field className={inputWidth} name={field} component='input'/>
      </div>
    )
};

const ItemFields = ({ requiredFields, fieldProperties }) => {
  let fieldElements = [];

  for (const field in fieldProperties) {
    if (field !== 'id') {
      if (requiredFields.includes(field)) {
        fieldElements.push(
          <Field
            name={field}
            field={field}
            fieldProperties={fieldProperties}
            validate={required}
            key={field}
            component={InputField}
          />
        );
      } else {
        fieldElements.push(
          <Field
            name={field}
            field={field}
            fieldProperties={fieldProperties}
            key={field}
            component={InputField}
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
    logger.info(`${entitySchema} requested by - ${this.props.kc.tokenParsed.name}, ${this.props.kc.tokenParsed.email}`);

    fetch(entitySchema, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.kc.token}`,
      }
    })
    .then(res => {
      if (res.status !== 200) {
        logger.error(`Error status: ${res.status}, message: ${res.statusText}`);
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(obj => {
      this.setState({ data: obj })
    })
    .catch(error => {
      this.props.history.push({
        pathname: '/service_unavailable'
      });
    });
  }

  handleSubmit(values, form) {
    const entity = util.format(apiUrls.entity, this.props.match.params.name);
    logger.info(`${this.props.kc.tokenParsed.name} - ${this.props.kc.tokenParsed.email}, requested item creation`);
    logger.info(values);

    fetch(entity, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.props.kc.token}`,
      },
      body: JSON.stringify(values, 0, 2)
    })
    .then(res => {
      if (res.status !== 200) {
        logger.error(`Error status: ${res.status}, message: ${res.statusText}`);
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      this.props.history.push({
        pathname: '/change_request_submitted'
        // state: will carry the 'reference number' returned from
        // Camunda response
      });
    })
    .catch(error => {
      this.props.history.push({
        pathname: '/service_unavailable'
      });
    });
  }

  render() {
    let fieldProperties, requiredFields;
    const { data } = this.state;
    const backLink = util.format(appUrls.entity, this.props.match.params.name);

    if (data && data.entitySchema) {
      (fieldProperties = data.entitySchema.properties);
      (requiredFields = data.entitySchema.required);
    }

    return (
      <div className='govuk-width-container'>
        <Banner/>
        <Link className='govuk-back-link' to={backLink}>Back</Link>
        <main className='govuk-main-wrapper ' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <Form
                onSubmit={this.handleSubmit}
                render={({ handleSubmit, submitting, values, form }) => {
                  const touchedFields = getRequiredTouchedFieldKeys(requiredFields, form.getState().touched);
                  const hasErrors = touchedFieldHasValue(touchedFields, form.getState().values);

                  return(
                    <form onSubmit={handleSubmit}>

                      { hasErrors ?
                        <div className='govuk-error-summary'>
                          <h2 class='govuk-error-summary__title' id='error-summary-title'>There is a problem</h2>
                          <ul className='govuk-list govuk-error-summary__list'>
                            <ErrorSummary fieldProperties={fieldProperties} />
                          </ul>
                        </div>
                      :
                        <div className='error-summary'><ul></ul></div>
                      }

                      <h1 className='govuk-heading-xl'>Add a new data item to the data set</h1>
                      <p className='govuk-body'>Please provide the following information. Once this form has been submitted, it will be sent to the data owner selected for approval.</p>
                      <ItemFields requiredFields={requiredFields} fieldProperties={fieldProperties} />
                      <button className='govuk-button' type='submit' disabled={submitting}>Submit change for approval</button>
                    </form>
                  )
                }}
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
