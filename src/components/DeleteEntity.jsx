import React from 'react';
import util from 'util';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// local imports
import Banner from './Banner';
import config from '../../config/core';
import logger from '../../logger';

const { appUrls, apiUrls } = config;

class DeleteEntity extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const entity = util.format(apiUrls.entity, this.props.match.params.name);
    logger.info(`${this.props.kc.tokenParsed.name} - ${this.props.kc.tokenParsed.email}, requested data set deletion`);
    logger.info(values);

    fetch(entity, {
      method: 'PATCH',
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
        pathname: '/delete_request_submitted'
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
    const backLink = appUrls.entities;
    return (
      <div className='govuk-width-container'>
        <Banner/>
        <Link className='govuk-back-link' to={backLink}>Back</Link>
        <main className='govuk-main-wrapper govuk-main-wrapper--l' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <h1 className='govuk-heading-xl'>Are you sure?</h1>
              <p className='govuk-body'>This will send a deletion request to the data owner. Once the request is approved, the entity will no longer exist.</p>
              <Form
                initialValues={{ entityName: this.props.match.params.name }}
                onSubmit={this.handleSubmit}
                render={({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <button className='govuk-button' type='submit' disabled={submitting}>Confirm deletion</button>
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

export default connect(mapStateToProps)(DeleteEntity);
