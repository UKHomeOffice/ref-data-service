import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// local imports
import Banner from './Banner';
import config from '../../config/core';
import logger from '../../logger';

const {apiUrls} = config;

const EntitiesData = ({ data }) => {
  const entityRows = []

  data.map((entity, n) => {
    let { description } = entity.schema.description;
    let { entityName, id } = entity;

    entityRows.push(
      <tr className="govuk-table__row" key={n}>
        <th className="govuk-table__header" scope="row">{entityName}</th>
        <td className="govuk-table__cell">{description}</td>
        <td className="govuk-table__cell"><Link to={`/entities/${entityName}`}>View data</Link></td>
        <td className="govuk-table__cell"><Link to={`/entities/${entityName}/schema`}>View definition</Link></td>
      </tr>
    )
  })
  return entityRows;
};

class Entities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entitiesObject: {}
    };
  }

  componentDidMount() {
    const entities = apiUrls.entities;
    fetch(entities, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.kc.token}`,
      }
    })
    .then(res => res.json())
    .then(obj => {
      this.setState({ entitiesObject: obj })
    });
    logger.info(`Request made by ${this.props.kc.tokenParsed.name}, ${this.props.kc.tokenParsed.email}`);
  }

  render() {
    return (
      <div className="govuk-width-container">
        <Banner/>
        <main id="main-content" className="govuk-main-wrapper " role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Reference Data Governance Tool</h1>
              <p className="govuk-body">This service allows you to view and manage reference data entities.</p>
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
                  {this.state.entitiesObject && this.state.entitiesObject.data &&
                    <EntitiesData data={this.state.entitiesObject.data} />
                  }
                </tbody>
              </table>
              <h2 className='govuk-heading-m'>New data sets</h2>
              <p className='govuk-body'>Requests for new data sets to be added to the service require sign off by the Data Engagement Group.</p>
              <a href='https://support.cop.homeoffice.gov.uk/servicedesk/customer/portal' className='govuk-button'>Add a data set</a>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
 'kc': state.keycloak
});

export default connect(mapStateToProps)(Entities);
