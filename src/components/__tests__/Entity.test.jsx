import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
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
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[0].props.children[0].props.children).toEqual('Data set name');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[0].props.children[1].props.children).toEqual(entityObject.entitySchema.label);

    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[1].props.children[0].props.children).toEqual('Data set description');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[1].props.children[1].props.children).toEqual(entityObject.entitySchema.description);
    // change button
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[1].props.children[2].props.children.props.children.props.children[0]).toEqual('Change');

    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[2].props.children[0].props.children).toEqual('Last Updated');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[2].props.children[1].props.children).toEqual(entityObject.entitySchema.schemalastupdated);

    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[3].props.children[0].props.children).toEqual('Data Version');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[3].props.children[1].props.children).toEqual(entityObject.entitySchema.dataversion);

    // delete button
    expect(wrapper.containsMatchingElement(<Link className="govuk-button" to="/entities/country/delete" role="button" draggable="false" replace={false}>Delete this data set</Link>)).toBeTruthy();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
