import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import Banner from 'Banner';
import config from '../../config/core';

export default class ServiceUnavailable extends React.Component {
  render() {
    return (
      <div className="govuk-width-container">
        <Banner/>
        <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Sorry, there is a problem with the service</h1>
              <p className="govuk-body">Try again later.</p>
              <p className="govuk-body">We have not submitted your change request. When the service is available, you will have to start again.</p>
              <p className="govuk-body">Contact the COP Service Support Desk if you have any questions:</p>
              <p className="govuk-body">
                Online:
                <a href='#' className='govuk-link break-block'>
                  <strong>COP Online Support</strong>
                </a>
              </p>
              <p className='govuk-body'>
                Telephone:
                <strong className='break-block'>0808 157 3900</strong>
              </p>
              <p className='govuk-body'>
                Textphone:
                <strong className='break-block'>0808 157 3909</strong>
              </p>
              <p className="govuk-body">
                Outside UK:
                <strong className='break-block'>+44 0808 157 0192</strong>
              </p>
              <p className="govuk-body">
                Opening times:
                <strong className='break-block'>Monday to Friday: 8am to 8pm</strong>
              </p>
              <p className="govuk-body">Closed Easter Sunday, Christmas Day, Boxing Day and New Year's Day.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
