import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// local imports
import Banner from './Banner';
import config from '../../config/core';
import logger from '../../logger';

const {apiUrls, serviceDesk} = config;

const EntitiesData = ({ data }) => {
  const entityRows = []

  data.map((entity, n) => {
    let { entityName } = entity;
    let { description, label, schemalastupdated } = entity.schema;

    entityRows.push(
      <tr className="govuk-table__row" key={n}>
        <th className="govuk-table__header" scope="row">{label}</th>
        <td className="govuk-table__cell">{description}</td>
        <td className="govuk-table__cell">{schemalastupdated}</td>
        <td className="govuk-table__cell"><Link to={`/entities/${entityName}`}>View</Link> <Link to={`/entities/${entityName}/schema`}>Edit</Link></td>
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
    .then(res => {
      if (res.status !== 200) {
        logger.error(`Error status: ${res.status}, message: ${res.statusText}`);
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(obj => {
      this.setState({ entitiesObject: obj })
    })
    .catch(error => {
      this.props.history.push({
        pathname: '/service_unavailable'
      });
    });
  }

  render() {
    return (
      <div className="govuk-width-container">
        <Banner/>
        <main id="main-content" className="govuk-main-wrapper " role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Reference Data Service</h1>
              <p className="govuk-body">This service allows you to view and manage reference data sets. To add a new data set to the repository, use the <a className='govuk-anchor-click' href={`${serviceDesk.addDataSet}`}>Add a data set</a> link at the top of the page.</p>
              <h2 className="govuk-heading-l">Data Sets</h2>
              <span></span>
              <table className="govuk-table">
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    <th className="govuk-table__header" scope="col">Name</th>
                    <th className="govuk-table__header" scope="col">Description</th>
                    <th className="govuk-table__header" scope="col">Last Updated</th>
                    <th className="govuk-table__header" scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="govuk-table__body">
                  {this.state.entitiesObject && this.state.entitiesObject.data &&
                    <EntitiesData data={this.state.entitiesObject.data} />
                  }
                </tbody>
              </table>

              { config.readOnly ?
                <React.Fragment></React.Fragment>
              :
                <React.Fragment>
                  <h2 className='govuk-heading-m'>New data sets</h2>
                  <p className='govuk-body'>Requests for new data sets to be added to the service require sign off by the Data Engagement Group.</p>
                  <a href='https://support.cop.homeoffice.gov.uk/servicedesk/customer/portal' className='govuk-button'>Add a data set</a>
                </React.Fragment>
              }
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
