import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from './Banner';
import ServiceUnavailable from './ServiceUnavailable';
import config from '../../config/core';

const {appUrls, apiUrls} = config;

const ItemData = ({
  name,
  id,
  itemObject: {
    data,
    entitySchema: {
      properties
    }
  }
}) => {
  let itemRows = [];
  let itemFields = Object.entries(properties).forEach(([key, value]) => {
      let itemUpdate = util.format(appUrls.itemUpdate, name, id, key);
      itemRows.push(
        <div className='govuk-summary-list__row' key={key}>
          <dt className='govuk-summary-list__key'>{value.description.label}</dt>
          <dd className='govuk-summary-list__value'>{data[key]}</dd>
          <dd className='govuk-summary-list__actions'>
            <Link className='govuk-link' to={itemUpdate}>Change</Link>
          </dd>
        </div>
      )
    });
  return itemRows;
};

class EntityItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {itemObject: {}, error: null };
  }

  componentDidMount() {
    const item = util.format(apiUrls.item, this.props.match.params.name, this.props.match.params.id);

    fetch(item, {
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
      this.setState({ itemObject: obj })
    })
    .catch(error => this.setState({ error }));
  }

  render() {
    if (this.state.error) {
      return <ServiceUnavailable />
    }

    const {name, id} = this.props.match.params;
    const itemDelete = util.format(appUrls.itemDelete, name, id);
    const backLink = util.format(appUrls.entity, this.state.itemObject.entityName);

    return (
      <div className='govuk-width-container'>
        <Banner/>
        <Link className='govuk-back-link' to={backLink}>Back</Link>
        <main className='govuk-main-wrapper' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            {this.state.itemObject && this.state.itemObject.entitySchema &&
              <div className='govuk-grid-column-two-thirds-from-desktop'>
                <h1 className='govuk-heading-xl'>{this.state.itemObject.data.name}</h1>
                <h2 className='govuk-heading-m'>Fields</h2>
                <p className='govuk-body'>A list of fields that make up this data item. Click the change link to request changes to individual fields.</p>
                <dl className='govuk-summary-list govuk-!-margin-bottom-9'>
                  <ItemData name={name} id={id} itemObject={this.state.itemObject} />
                </dl>
              </div>
            }
          </div>
          <Link className='govuk-button govuk-button--warning' to={itemDelete} role='button' draggable='false'>Delete data item</Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
 'kc': state.keycloak
});

export default connect(mapStateToProps)(EntityItem);
