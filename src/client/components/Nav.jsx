import React from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul id="navigation" className="govuk-header__navigation " aria-label="Top Level Navigation">
          <li className="govuk-header__navigation-item govuk-header__navigation-item--active">
            <Link className="govuk-header__link" to="/">Home</Link>
          </li>
          <li className="govuk-header__navigation-item">
            <Link className="govuk-header__link" to="/search">Search</Link>
          </li>
          <li className="govuk-header__navigation-item">
            <Link className="govuk-header__link" to="#">Signout</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
