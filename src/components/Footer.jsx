 import React from 'react';
 import {Link} from 'react-router-dom';

 export default class Footer extends React.Component {
  render() {
    return (
      <footer className="govuk-footer " role="contentinfo">
        <div className="govuk-width-container ">
          <div className="govuk-footer__meta">
            <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
              <Link className="govuk-footer__link govuk-footer__copyright-logo"
                 to="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/">© Crown copyright</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
