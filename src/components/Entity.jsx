import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from './Banner';
import config from '../../config/core';
import getKeyByValue from '../utils';
import logger from '../../logger';

const {appUrls, apiUrls} = config;

const EntityContent = ({
  entityObject: {
    entityName,
    entityLabel,
    entitySchema: {
      description
    }
  }
}) => {
  const descriptionKey = getKeyByValue(description, description.description)
  const entityDescriptionUpdate = util.format(appUrls.entityUpdate, entityName, descriptionKey);

  return (
    <div className="govuk-grid-column-two-thirds-from-desktop">
      <h1 className="govuk-heading-xl">{entityLabel}</h1>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Data set name</dt>
          <dd className="govuk-summary-list__value">{entityLabel}</dd>
          <dd className="govuk-summary-list__actions"></dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Data set description</dt>
          <dd className="govuk-summary-list__value">{description.description}</dd>
          <dd className="govuk-summary-list__actions">
            <Link className="govuk-link" to={entityDescriptionUpdate}>
              Change<span className="govuk-visually-hidden"> Data set description</span>
            </Link>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Last Updated</dt>
          <dd className="govuk-summary-list__value">{description.schemalastupdated}</dd>
          <dd className="govuk-summary-list__actions"></dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Data Version</dt>
          <dd className="govuk-summary-list__value">{description.dataversion}</dd>
          <dd className="govuk-summary-list__actions"></dd>
        </div>
      </dl>
    </div>
  );
};

class Entity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entityObject: {},
    };
  }

  componentDidMount() {
    const {name} = this.props.match.params;
    const entitySchema = util.format(apiUrls.entitySchema, name);

    fetch(entitySchema, {
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
      this.setState({ entityObject: obj })
    })
    .catch(error => {
      this.props.history.push({
        pathname: '/service_unavailable'
      });
    });
  }

  render() {
    const deleteEntity = util.format(appUrls.deleteEntity, this.props.match.params.name);
    return (
      <div className="govuk-width-container">
        <Banner/>
        <Link className="govuk-back-link" to="/">Back</Link>
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <div className="govuk-grid-row">
            {this.state.entityObject && this.state.entityObject.entitySchema &&
              <EntityContent entityObject={this.state.entityObject}/>
            }
          </div>
          <Link className="govuk-button" to={deleteEntity} role="button" draggable="false">Delete this data set</Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
 'kc': state.keycloak
});

export default connect(mapStateToProps)(Entity);
