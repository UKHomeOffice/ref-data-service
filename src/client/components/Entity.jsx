import React from 'react';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from 'Banner';
import config from '../../config/core';

const EntityContent = (props) => {
  return (
    <div className="govuk-grid-column-two-thirds-from-desktop">
      <h1 className="govuk-heading-xl">{props.entityLabel}</h1>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Entity name</dt>
          <dd className="govuk-summary-list__value">{props.entityLabel}</dd>
          <dd className="govuk-summary-list__actions"></dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Entity description</dt>
          <dd className="govuk-summary-list__value">{props.schema.description}</dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="#">Change<span className="govuk-visually-hidden"> Entity description</span></a>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Last Updated</dt>
          <dd className="govuk-summary-list__value">{props.schema.schemalastupdated}</dd>
          <dd className="govuk-summary-list__actions"></dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Data Version</dt>
          <dd className="govuk-summary-list__value">{props.schema.dataversion}</dd>
          <dd className="govuk-summary-list__actions"></dd>
        </div>
      </dl>
    </div>
  );
};

export default class Entity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entityObject: {},
      params: props.match.params,
    };
  }
  componentDidMount() {
    const apiEntitiesSchemaUrl = util.format(config.apiEntitiesSchemaUrl, this.state.params.name, '?schemaOnly=true');
    fetch(apiEntitiesSchemaUrl)
      .then(res => res.json())
      .then(obj => {
        this.setState({ entityObject: obj })
      });
  }

  render() {
    if (this.state.entityObject && this.state.entityObject.entitySchema) {
      const entityLabel = this.state.entityObject.entityLabel;
      const schema = this.state.entityObject.entitySchema.description;

      return (
        <div className="govuk-width-container">
          <Banner/>
          <Link className="govuk-back-link" to="/">Back</Link>
          <main className="govuk-main-wrapper " id="main-content" role="main">
            <div className="govuk-grid-row">
              <EntityContent entityLabel={entityLabel} schema={schema}/>
            </div>
            <a href="#" role="button" draggable="false" className="govuk-button">Delete this entity</a>
          </main>
        </div>
      );
    }
    return <div className="govuk-width-container"></div>;
  }
}
