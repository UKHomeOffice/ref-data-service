import React from 'react';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from 'Banner';
import config from '../../config/core';

export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsObject: {entitySchema: {description: {} }, data: [] },
      params: props.match.params
    };
  }

  componentDidMount() {
    const entitiesUrl = util.format(config.apiEntitiesUrl, this.state.params.name);
    fetch(entitiesUrl)
      .then(res => res.json())
      .then(obj => {
        this.setState({ itemsObject: obj })
      });
  }

  render() {
    let countries = this.state.itemsObject.data.map((country) => {
      return (
        <React.Fragment key={country.id}>
          <tr className="govuk-table__row">
            <td className="govuk-table__cell"><Link to={`/entities/${country.name}/items/${country.id}`}>{country.iso31661alpha2}</Link></td>
            <td className="govuk-table__cell">{country.iso31661alpha3}</td>
            <td className="govuk-table__cell">{country.name}</td>
            <td className="govuk-table__cell">{country.continent}</td>
            <td className="govuk-table__cell">{country.dial}</td>
          </tr>
          <tr className="govuk-table__row">
            <td className="govuk-table__cell" colSpan="6">
              <div>
                <details role="group">
                  <summary className="govuk-details__summary" role="button" aria-controls="details-content-2" aria-expanded="false" title="Further information for Taiwan">
                    <span className="summary">Further information</span>
                  </summary>
                  <div className="panel panel-border-narrow" id="details-content-2" aria-hidden="true">
                    <table className="govuk-table" width="100%">
                      <tbody className="govuk-table__body">
                        <tr className="govuk-table__row">
                          <td className="govuk-table__cell">ISO 3166-1 Numeric</td>
                          <td className="govuk-table__cell" width="75%">{country.iso31661numeric}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </details>
              </div>
            </td>
          </tr>
        </React.Fragment>
      )
    });

    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to="/">Back</Link>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              <h1 className="govuk-heading-xl">{this.state.itemsObject.entityLabel}</h1>
              <p>{this.state.itemsObject.entitySchema.description.description}</p>
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                  <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
                </div>
              </div>
              <h2 className="govuk-heading-m">Data items within this entity</h2>
              <p>To manage a data item, click the ID.</p>
              <table className="govuk-table">
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    <th className="govuk-table__header" scope="col">ID</th>
                    <th className="govuk-table__header" scope="col">ISO 3166-1 Alpha</th>
                    <th className="govuk-table__header" scope="col">Name</th>
                    <th className="govuk-table__header" scope="col">Continent</th>
                    <th className="govuk-table__header" scope="col">Dial</th>
                  </tr>
                </thead>
                <tbody className="govuk-table__body">
                  {countries}
                </tbody>
              </table>
              <h2 className="govuk-heading-m">Add new data items to this entity</h2>
              <p>To add a data item, click the button below and complete the change request on the subsequent page.</p>
              <Link className="govuk-button" to={`/entities/${this.state.params.name}/new`} role="button" draggable="false">Add data item</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

