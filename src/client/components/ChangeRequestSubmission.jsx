import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import Banner from 'Banner';
import config from '../../config/core';

export default class ChangeRequestSubmission extends React.Component {

  render() {
    return (
      <div className="govuk-width-container">
        <Banner/>
        <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <div className="govuk-panel govuk-panel--confirmation">
                <h1 className="govuk-panel__title">Change request submitted</h1>
                <div className="govuk-panel__body">Your reference number<br/><strong>TBD</strong></div>
              </div>
              <p className="govuk-body">We have sent you a confirmation email.</p>
              <p className="govuk-body">You can now return to the <Link to="/">homepage</Link>.</p>
              <h2 className="govuk-heading-m">What happens next</h2>
              <p className="govuk-body">We’ve sent your change request to the data owner for approval.</p>
              <p className="govuk-body">Usually they will not not need to contact you during the approval process, however occasionally they may need to contact you to ask for more information if it is required to support the change request.</p>
              <p className="govuk-body">
                <a href="#">What did you think of this service?</a> (Survey - takes 30 seconds)
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
