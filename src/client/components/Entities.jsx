import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import util from 'util';

// local imports
import Banner from 'Banner';
import config from '../../config/core';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const dataEntitiesUrl = config.apiDataEntitiesUrl;
    fetch(dataEntitiesUrl)
      .then(res => res.json())
      .then(obj => {
        this.setState({ data: obj.data })
      });
  }

  render() {
    let dataEntities = this.state.data.map((dataEntity) => {
      return (
        <tr className="govuk-table__row" key={dataEntity.id}>
          <th className="govuk-table__header" scope="row">{dataEntity.label}</th>
          <td className="govuk-table__cell">{dataEntity.description}</td>
          <td className="govuk-table__cell"><Link to={`/entities/${dataEntity.tablename}`}>View data</Link></td>
          <td className="govuk-table__cell"><Link to={`#`}>View definition</Link></td>
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
              <p>This service allows you to view and manage reference data entities.</p>
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

