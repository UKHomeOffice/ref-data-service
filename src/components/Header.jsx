import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// local imports
import Nav from './Nav';

class Header extends React.Component {
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
      <header className="govuk-header" role="banner" data-module="header">
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__logo">
            <Link className="govuk-header__link govuk-header__link--service-name" to="/">Reference Data Service</Link>
            <button className="govuk-header__menu-button js-header-toggle"
                    type="button"
                    role="button"
                    aria-controls="navigation"
                    aria-label="Show or hide Top Level Navigation">Menu</button>
            <Nav/>
          </div>
          <div className='govuk-header__menu'>
            <ul>
              <li>
                <a className='govuk-header-menu__link' onClick={this.logout}>Sign out</a>
              </li>
            </ul>
        </div>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
    }
}, mapDispatchToProps)(Header));
