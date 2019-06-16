import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

// local imports
import Entity from '../Entity';
import entityObject from '../__fixtures__/entityObject';

const mockStore = configureMockStore();

describe('Entity component', () => {
  it('Should display the entity component successfully', () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({
        'json': () => entityObject
      }));

    const keycloakToken = {
      'keycloak': {
        'token': '4321',
        'tokenParsed': {
          'name': 'Kenny',
          'email': 'kenny@mail.com',
        },
      },
    };
    const store = mockStore(keycloakToken);
    const match = {
      'params': {
        'name': 'country',
      },
    };
    const wrapper = shallow(<Entity match={ match } store={ store }/>).dive();

    wrapper.setState({
      'entityObject': entityObject
    });

    // table content
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').children()).toHaveLength(4);
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[0].props.children[0].props.children).toEqual('Entity name');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[0].props.children[1].props.children).toEqual(entityObject.entityLabel);

    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[1].props.children[0].props.children).toEqual('Entity description');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[1].props.children[1].props.children).toEqual(entityObject.entitySchema.description.description);
    // change button
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[1].props.children[2].props.children.props.children[0]).toEqual('Change');

    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[2].props.children[0].props.children).toEqual('Last Updated');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[2].props.children[1].props.children).toEqual(entityObject.entitySchema.description.schemalastupdated);

    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[3].props.children[0].props.children).toEqual('Data Version');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[3].props.children[1].props.children).toEqual(entityObject.entitySchema.description.dataversion);

    // delete button
    expect(wrapper.containsMatchingElement(<a href='#' role='button' draggable='false' className='govuk-button'>Delete this entity</a>)).toBeTruthy();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
