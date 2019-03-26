import React from 'react';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from 'Banner';
import config from '../../config/core';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemObject: {
        data: {}
      },
      params: props.match.params
    };
  }

  componentDidMount() {
    const entityDetailUrl = util.format(config.apiEntityDetailUrl, this.state.params.name, this.state.params.id);
    fetch(entityDetailUrl)
      .then(res => res.json())
      .then(obj => {
        this.setState({ itemObject: obj })
      });
  }

  render() {
    let fields = (
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">ID</dt>
          <dd className="govuk-summary-list__value">{this.state.itemObject.data.id}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#">Change<span className="govuk-visually-hidden"> ID</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">ISO 3166-1 Alpha Code</dt>
          <dd className="govuk-summary-list__value">{this.state.itemObject.data.iso31661alpha3}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#">Change<span className="govuk-visually-hidden"> iso31661alpha3</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Name</dt>
          <dd className="govuk-summary-list__value">{this.state.itemObject.data.name}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#">Change<span className="govuk-visually-hidden"> Name</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Continent</dt>
          <dd className="govuk-summary-list__value">{this.state.itemObject.data.continent}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#">Change<span className="govuk-visually-hidden"> Continent</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Dialling Code</dt>
          <dd className="govuk-summary-list__value">{this.state.itemObject.data.dial}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#">Change<span className="govuk-visually-hidden"> Dial</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">ISO 3166-1 Numeric Code</dt>
          <dd className="govuk-summary-list__value">{this.state.itemObject.data.iso31661numeric}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#">Change<span className="govuk-visually-hidden"> iso31661numeric</span></a>
          </dd>
        </div>
      </dl>
    );

    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to={`/entities/${this.state.itemObject.entity}`}>Back</Link>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              <h1 class="govuk-heading-xl">{this.state.itemObject.data.name}</h1>
              <h2 className="govuk-heading-m">Fields</h2>
              <p>A list of fields that make up this data item. Click the change link to request changes to individual fields.</p>
              {fields}
            </div>
          </div>
          <Link className="govuk-button" to={`/entities/${this.state.itemObject.entity}/items/${this.state.itemObject.itemid}/delete`} role="button" draggable="false">Delete data item</Link>
        </main>
      </div>
    );
  }
}

