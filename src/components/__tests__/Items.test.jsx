import Provider from 'react-redux';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import { shallow, render, mount } from 'enzyme';

// local imports
import Items from '../Items';

const mockStore = configureMockStore();

describe('Items component', () => {
  const itemsObject = {
    "status": "success",
    "code": 200,
    "entityLabel": "",
    "entitySchema": {
      "description": {
        "description": "Countries",
        "schemalastupdated": "10/03/2019",
        "dataversion": 1
      },
      "required": [
        "id",
        "iso31661alpha2",
        "iso31661alpha3",
        "name",
        "continent",
        "iso31661numeric"
      ],
      "properties": {
        "id": {
          "maxLength": null,
          "format": "integer",
          "type": "integer",
          "description": {
            "label": "Identifier",
            "description": "Database unique identity record",
            "summaryview": "false"
          }
        },
        "iso31661alpha2": {
          "maxLength": 2,
          "format": "character varying",
          "type": "character varying",
          "description": {
            "label": "2 digit alpha code",
            "description": "Country 2 Character alpha code",
            "summaryview": "true"
          }
        },
        "iso31661alpha3": {
          "maxLength": 3,
          "format": "character varying",
          "type": "character varying",
          "description": {
            "label": "3 digit alpha code",
            "description": "Country 3 Character alpha code",
            "summaryview": "true"
          }
        },
        "name": {
          "maxLength": 40,
          "format": "character varying",
          "type": "character varying",
          "description": {
            "label": "Country name",
            "description": "Country name",
            "summaryview": "true"
          }
        },
        "continent": {
          "maxLength": 2,
          "format": "character varying",
          "type": "character varying",
          "description": {
            "label": "Continent",
            "description": "Countinent country is part of",
            "summaryview": "true"
          }
        },
        "dial": {
          "maxLength": 20,
          "format": "character varying",
          "type": "character varying",
          "description": {
            "label": "Phone dial code",
            "description": "Country dialing prefix",
            "summaryview": "true"
          }
        },
        "iso31661numeric": {
          "maxLength": null,
          "format": "integer",
          "type": "integer",
          "description": {
            "label": "3 digit numeric code",
            "description": "Country numeric ISO code",
            "summaryview": "true"
          }
        },
        "validfrom": {
          "maxLength": null,
          "format": "timestamp with time zone",
          "type": "timestamp with time zone",
          "description": {
            "label": "Valid from date",
            "description": "Item valid from date",
            "summaryview": "false"
          }
        },
        "validto": {
          "maxLength": null,
          "format": "timestamp with time zone",
          "type": "timestamp with time zone",
          "description": {
            "label": "Valid to date",
            "description": "Item valid to date",
            "summaryview": "false"
          }
        }
      }
    },
    "data": [
      {
          "id": 1,
          "iso31661alpha2": "TW",
          "iso31661alpha3": "TWN",
          "name": "Taiwan",
          "continent": "AS",
          "dial": "886",
          "iso31661numeric": 158,
          "validfrom": null,
          "validto": null
      }
    ]
  };

  it('Should display entity items successfully', () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({
        'json': () => itemsObject
      }));

    const keycloakToken = { 'keycloak': '1234' };
    const store = mockStore(keycloakToken);
    const match = {
      'params': {
        'name': 'documenttype',
      },
    };

    const wrapper = shallow(<Items match={ match } store={ store } />).dive();

    wrapper.setState({
      'itemsObject': itemsObject
    });

    // headers
    expect(wrapper.containsMatchingElement(<p className="govuk-body-l">Countries</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<h2 className="govuk-heading-m">Data items within this entity</h2>)).toBeTruthy();

    // table
    expect(wrapper.find('.govuk-table__row').children()).toHaveLength(5);
    expect(wrapper.find('.govuk-table__header').get(0).props.children).toEqual('ID');
    expect(wrapper.find('.govuk-table__header').get(1).props.children).toEqual('ISO 3166-1 Alpha');
    expect(wrapper.find('.govuk-table__header').get(2).props.children).toEqual('Name');
    expect(wrapper.find('.govuk-table__header').get(3).props.children).toEqual('Continent');
    expect(wrapper.find('.govuk-table__header').get(4).props.children).toEqual('Dial');

    expect(wrapper.find('ItemsRows').dive().find('.govuk-table__cell').get(0).props.children.props.children).toEqual('TW');
    expect(wrapper.find('ItemsRows').dive().find('.govuk-table__cell').get(1).props.children).toEqual('TWN');
    expect(wrapper.find('ItemsRows').dive().find('.govuk-table__cell').get(2).props.children).toEqual('Taiwan');
    expect(wrapper.find('ItemsRows').dive().find('.govuk-table__cell').get(3).props.children).toEqual('AS');
    expect(wrapper.find('ItemsRows').dive().find('.govuk-table__cell').get(4).props.children).toEqual('886');

    // button
    expect(wrapper.containsAllMatchingElements([
      <Link className="govuk-button" to="/entities/documenttype/new" role="button" draggable="false" replace={false}>
        Add data item
      </Link>
    ])).toBeTruthy();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
