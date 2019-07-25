import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import util from 'util';

// local imports
import Banner from './Banner';
import config from '../../config/core';

const {appUrls, apiUrls} = config;

const TableHeader = ({ properties }) => {
  let headers = [];
  for (const key in properties) {
    headers.push(
      <th className='govuk-table__header table__cell' key={key}>
        {properties[key].description.label}
      </th>
    );
  }
  return headers;
};

const TableRows = ({ data }) => {
  return data.map((properties, n) => {
    let rows = [];
    for (const key in properties) {
      rows.push(
        <td className='govuk-table__cell table__cell' key={key}>
          { properties[key] }
        </td>
      );
    }
    return <tr className='govuk-table__row' key={n}>{rows}</tr>
  });
};

class EntityItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsObject: {},
    };
  }

  componentDidMount() {
    const entity = util.format(apiUrls.entity, this.props.match.params.name);

    fetch(entity, {
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
      this.setState({ itemsObject: obj })
    })
    .catch(error => {
      this.props.history.push({
        pathname: '/service_unavailable'
      });
    });
  }

  render() {
    const itemNew = util.format(appUrls.itemNew, this.props.match.params.name);
    return (
      <div className='govuk-width-container'>
        <Banner/>
        <Link className='govuk-back-link' to='/'>Back</Link>
        <main className='govuk-main-wrapper ' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            {this.state.itemsObject && this.state.itemsObject.data &&
              <div className='govuk-grid-column-full'>
                <h1 className='govuk-heading-xl'>{this.state.itemsObject.entitySchema.label}</h1>
                <p className='govuk-body'>{this.state.itemsObject.entitySchema.description}</p>
                <div className='govuk-inset-text'>
                  <p>To manage a data item, click the Identifier.</p>
                </div>
                <div className='table-container'>
                  <table className='govuk-table table-items'>
                    <thead className='govuk-table__head'>
                      <tr className='govuk-table__row'>
                        <TableHeader properties={this.state.itemsObject.entitySchema.properties}/>
                      </tr>
                    </thead>
                    <tbody className='govuk-table__body'>
                      <TableRows data={this.state.itemsObject.data}/>
                    </tbody>
                  </table>
                </div>

                { config.readOnly ?
                  <React.Fragment></React.Fragment>
                :
                  <React.Fragment>
                    <h2 className='govuk-heading-m'>Add new data items to this data set</h2>
                    <p className='govuk-body'>To add a new item to this data set, click the button below and complete the change request on the subsequent page.</p>
                    <Link className='govuk-button' to={itemNew} role='button' draggable='false'>Add data item</Link>
                  </React.Fragment>
                }

              </div>
            }
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
 'kc': state.keycloak
});

export default connect(mapStateToProps)(EntityItems);
