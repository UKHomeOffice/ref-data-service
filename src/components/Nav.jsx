import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import config from '../../config/core';

const {serviceDesk} = config;

const Nav = (props) => {
  return (
    <nav>
      <ul id='navigation' className='govuk-header__navigation ' aria-label='Top Level Navigation'>
        <li className='govuk-header__navigation-item govuk-header__navigation-item--active'>
          <Link className='govuk-header__link' to='/'>Data sets</Link>
        </li>
        <li className='govuk-header__navigation-item'>
          <a className='govuk-header__link' href={`${serviceDesk.addDataSet}`}>Add a data set</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
