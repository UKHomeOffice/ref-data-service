import React from 'react'

import config from '../../config/core';

const { environment, serviceDesk } = config;

const Banner = (props) =>  {
  const environmentBanner = () => {
    if (environment.toLowerCase() === 'production') {
      return <React.Fragment></React.Fragment>;
    } else {
      return <strong className='govuk-tag govuk-phase-banner__content__tag '>{environment}</strong>;
    }
  }

  return (
    <div className='govuk-phase-banner'>
      <p className='govuk-phase-banner__content'>
        <strong className='govuk-tag govuk-phase-banner__content__tag '>beta</strong>
        {environmentBanner()}
        <span className='govuk-phase-banner__text'>
          This is a new service – your <a className='govuk-link' href={`${serviceDesk.feedback}`}>feedback</a> will help us to improve it.
        </span>
      </p>
    </div>
  );
}

export default Banner;
