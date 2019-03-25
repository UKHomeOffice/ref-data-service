import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import util from 'util';

// local imports
import Banner from 'Banner';
import config from '../../config/core';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: [],
      data: {},
      params: props.match.params
    };
  }

  componentDidMount() {
    const entityDetailUrl = util.format(config.apiEntityDetailUrl, this.state.params.name, this.state.params.id);
    fetch(entityDetailUrl)
      .then(res => res.json())
      .then(obj => {
        this.setState({ obj: obj, data: obj.data })
      });
  }

  render() {
    let metadata = (
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Valid From</dt>
          <dd className="govuk-summary-list__value">{this.state.data.validfrom}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="/version3/edit_di_valid_dates.html">Change<span className="govuk-visually-hidden"> Valid From</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Valid To</dt>
          <dd className="govuk-summary-list__value">{this.state.data.validto}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="/version3/edit_di_valid_dates.html">Change<span className="govuk-visually-hidden"> Valid To</span></a>
          </dd>
        </div>
      </dl>
    );

    let fields = (
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">ID</dt>
          <dd className="govuk-summary-list__value">{this.state.data.id}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="/version3/edit_data_item.html">Change<span className="govuk-visually-hidden"> ID</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">ISO 3166-1 Alpha Code</dt>
          <dd className="govuk-summary-list__value">{this.state.data.iso31661alpha3}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#.html">Change<span className="govuk-visually-hidden"> iso31661alpha3</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Name</dt>
          <dd className="govuk-summary-list__value">{this.state.data.name}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#.html">Change<span className="govuk-visually-hidden"> Name</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Continent</dt>
          <dd className="govuk-summary-list__value">{this.state.data.continent}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#.html">Change<span className="govuk-visually-hidden"> Continent</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Dialling Code</dt>
          <dd className="govuk-summary-list__value">{this.state.data.dial}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#.html">Change<span className="govuk-visually-hidden"> Dial</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">ISO 3166-1 Numeric Code</dt>
          <dd className="govuk-summary-list__value">{this.state.data.iso31661numeric}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#.html">Change<span className="govuk-visually-hidden"> iso31661numeric</span></a>
          </dd>
        </div>
      </dl>
    );

    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to="/">Back</Link>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              <h1 className="govuk-heading-xl">{this.state.params.name}</h1>
              <h2 className="govuk-heading-m">Metadata</h2>
              <p>This is data that describes the data item, for example how long the data item remains valid for. If a data item is invalid, it will not appear in search results.</p>
              {metadata}
              <h2 className="govuk-heading-m">Fields</h2>
              <p>A list of fields that make up this data item. Click the change link to request changes to individual fields.</p>
              {fields}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

