import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import Banner from './Banner';

const Search = (props) => {
  return (
    <div className="govuk-width-container">
      <Banner/>
      <Link className="govuk-back-link" to="/">Back</Link>
      <main id="main-content" className="govuk-main-wrapper" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <form action="">
              <h1 className="govuk-heading-xl">Reference data search</h1>
              <p className="govuk-body">Select a specific dataset to manage from the list below</p>
              <div className="govuk-form-group">
                <select className="govuk-select" id="dataset" name="dataset">
                  <option value="null" defaultValue="">Countries</option>
                  <option value="ranks">Border Force Ranks</option>
                  <option value="carrier_codes">Carrier Codes</option>
                  <option value="countries">Countries</option>
                  <option value="office_locations">Office Locations</option>
                  <option value="port_codes">Port Codes</option>
                </select>
              </div>
              <p className="govuk-body">Or build a search query to search for specific values in reference datasets</p>
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="search">Search value</label>
                <input className="govuk-input" id="search" name="name" type="text"/>
                <label className="govuk-label" htmlFor="search">Select an operator</label>
                <select className="govuk-select" id="dataset" name="dataset">
                  <option value="null" defaultValue="">In</option>
                  <option value="ranks">Contains</option>
                  <option value="carrier_codes">Does not equal</option>
                  <option value="countries">Equals</option>
                  <option value="office_locations">Not in</option>
                </select>
                <label className="govuk-label" htmlFor="search">Pick a dataset</label>
                <select className="govuk-select" id="dataset" name="dataset">
                  <option value="null" defaultValue="">Countries</option>
                  <option value="ranks">Border Force Ranks</option>
                  <option value="carrier_codes">Carrier Codes</option>
                  <option value="countries">Countries</option>
                  <option value="office_locations">Office Locations</option>
                  <option value="port_codes">Port Codes</option>
                </select>
              </div>
              <Link className="govuk-button" role="button" draggable="false" to="#">Search</Link>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Search;
