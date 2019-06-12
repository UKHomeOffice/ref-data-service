import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.kc.logout();
  }

  render() {
    return (
      <nav>
        <ul id="navigation" className="govuk-header__navigation " aria-label="Top Level Navigation">
          <li className="govuk-header__navigation-item govuk-header__navigation-item--active">
            <Link className="govuk-header__link" to="/">Home</Link>
          </li>
          <li className="govuk-header__navigation-item">
            <a className="govuk-header__link" onClick={this.logout}>Signout</a>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
    }
}, mapDispatchToProps)(Nav))
