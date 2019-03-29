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
      itemObject: {entitySchema: {properties: {keyId: {description: {} } } }, data: {} },
      params: props.match.params,
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
    const name = this.state.params.name;
    const id = this.state.params.id;
    const editUrl = `/entities/${name}/items/${id}/edit/`;

    let itemDataRows = [];
    let itemFields = Object.entries(this.state.itemObject.entitySchema.properties).forEach(([key, value]) => {
      itemDataRows.push(
        <div className="govuk-summary-list__row" key={key}>
          <dt className="govuk-summary-list__key">{value.description.label}</dt>
          <dd className="govuk-summary-list__value">{this.state.itemObject.data[key]}</dd>
          <dd className="govuk-summary-list__actions">
            <Link className="govuk-link" to={editUrl + key}>Change</Link>
          </dd>
        </div>
      )
    });

    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to={`/entities/${this.state.itemObject.entityName}`}>Back</Link>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              <h1 className="govuk-heading-xl">{this.state.itemObject.data.name}</h1>
              <h2 className="govuk-heading-m">Fields</h2>
              <p className="govuk-body-l">A list of fields that make up this data item. Click the change link to request changes to individual fields.</p>
              <dl className="govuk-summary-list govuk-!-margin-bottom-9">
                {itemDataRows}
              </dl>
            </div>
          </div>
          <Link className="govuk-button" to={`/entities/${this.state.itemObject.entity}/items/${this.state.itemObject.itemid}/delete`} role="button" draggable="false">Delete data item</Link>
        </main>
      </div>
    );
  }
}

