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
