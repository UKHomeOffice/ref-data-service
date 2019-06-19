import Provider from 'react-redux';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import { shallow, render, mount } from 'enzyme';

// local imports
import Items from '../Items';
import itemsObject from '../__fixtures__/itemsObject';

const mockStore = configureMockStore();

describe('Items component', () => {
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

    const { properties } = itemsObject.entitySchema;

    // headers
    expect(wrapper.containsMatchingElement(<p className="govuk-body-l">Countries</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<h2 className="govuk-heading-m">Data items within this entity</h2>)).toBeTruthy();

    // table header
    let headerCol = 0;
    const headerRows = wrapper.find('TableHeader').dive();
    expect(headerRows).toHaveLength(9);
    for (const headerKey in properties) {
      expect(headerRows.get(headerCol).props.children).toEqual(properties[headerKey].description.label);
      headerCol++;
    }

    // table body
    let rowCol = 0;
    const bodyRows = wrapper.find('TableRows').dive();
    expect(bodyRows).toHaveLength(1);
    for (let i = 0; i < itemsObject.data.length; i++) {
      for (const rowKey in itemsObject.data[i]) {
        expect(bodyRows.get(i).props.children[rowCol].props.children).toEqual(itemsObject.data[i][rowKey]);
        rowCol++
      }
    }

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
