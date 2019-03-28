import React from 'react';
import { Link } from 'react-router-dom';

// local imports
import Banner from 'Banner';
import config from '../../config/core';

export default class Entities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entitiesObject: {
        data: []
      }
    };
  }

  componentDidMount() {
    const dataEntitiesUrl = config.apiDataEntitiesUrl;
    fetch(dataEntitiesUrl)
      .then(res => res.json())
      .then(obj => {
        this.setState({ entitiesObject: obj })
      });
  }

  render() {
    let dataEntities = this.state.entitiesObject.data.map((entities) => {
      return (
        <tr className="govuk-table__row" key={entities.id}>
          <th className="govuk-table__header" scope="row">{entities.label}</th>
          <td className="govuk-table__cell">{entities.description}</td>
          <td className="govuk-table__cell"><Link to={`/entities/${entities.tablename}`}>View data</Link></td>
          <td className="govuk-table__cell"><Link to={`/entities/${entities.tablename}/schema`}>View definition</Link></td>
        </tr>
      )
    });

    return (
      <div className="govuk-width-container">
        <Banner/>
        <main id="main-content" className="govuk-main-wrapper " role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Reference Data Governance Tool</h1>
              <p className="govuk-body-l">This service allows you to view and manage reference data entities.</p>
              <h2 className="govuk-heading-l">Data Entities</h2>
              <span></span>
              <table className="govuk-table">
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    <th className="govuk-table__header" scope="col">Name</th>
                    <th className="govuk-table__header" scope="col">Description</th>
                    <th className="govuk-table__header" scope="col">Data Items</th>
                    <th className="govuk-table__header" scope="col">Entity Definition</th>
                  </tr>
                </thead>
                <tbody className="govuk-table__body">
                  {dataEntities}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

