import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import Banner from 'Banner';
import config from '../../config/core';

export default class Entity extends React.Component {

  render() {
    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to="/">Back</Link>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              <h1 className="govuk-heading-xl">Countries</h1>
              <dl className="govuk-summary-list govuk-!-margin-bottom-9">
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Entity name</dt>
                  <dd className="govuk-summary-list__value">Countries</dd>
                  <dd className="govuk-summary-list__actions"></dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Entity description</dt>
                  <dd className="govuk-summary-list__value"> A list of countries and the associated names, descriptions, dial and ISO31661 alpha and numeric codes.</dd>
                  <dd className="govuk-summary-list__actions">
                    <a className="govuk-link" href="/version3/edit_entity.html">Change<span className="govuk-visually-hidden"> Entity description</span></a>
                  </dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Last Updated</dt>
                  <dd className="govuk-summary-list__value">23/03/2019</dd>
                  <dd className="govuk-summary-list__actions"></dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Data Version</dt>
                  <dd className="govuk-summary-list__value">1</dd>
                  <dd className="govuk-summary-list__actions"></dd>
                </div>
              </dl>
            </div>
          </div>
          <a href="/version3/entity_delete.html" role="button" draggable="false" className="govuk-button">Delete this entity</a>
        </main>
      </div>
    );
  }
}
