 import React from 'react';
 import {Link} from 'react-router-dom';

const Healthcheck = (props) => {
    return (
      <main id="main-content" className="govuk-main-wrapper " role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Reference Data Service is up.</h1>
          </div>
        </div>
      </main>
    );
}

export default Healthcheck;
