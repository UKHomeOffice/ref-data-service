import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';

// local imports
import EntitySchema from '../EntitySchema';
import entitySchemaObject from '../__fixtures__/entitySchemaObject';

const mockStore = configureMockStore();

describe('Entity schema component', () => {
  it('Should display the entity schema component successfully', () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({
        'json': () => entitySchemaObject
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
    const wrapper = shallow(<EntitySchema match={ match } store={ store }/>).dive();

    wrapper.setState({
      'entityObject': entitySchemaObject

    });

    // table content
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').children()).toHaveLength(4);
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[0].props.children[0].props.children).toEqual('Data set name');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[0].props.children[1].props.children).toEqual(entitySchemaObject.entitySchema.label);

    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[1].props.children[0].props.children).toEqual('Data set description');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[1].props.children[1].props.children).toEqual(entitySchemaObject.entitySchema.description);
    // change button
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[1].props.children[2].props.children.props.children.props.children[0]).toEqual('Change');

    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[2].props.children[0].props.children).toEqual('Last Updated');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[2].props.children[1].props.children).toEqual(entitySchemaObject.entitySchema.schemalastupdated);

    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[3].props.children[0].props.children).toEqual('Data Version');
    expect(wrapper.find('EntityContent').dive().find('.govuk-summary-list').get(0).props.children[3].props.children[1].props.children).toEqual(entitySchemaObject.entitySchema.dataversion);

    // delete button
    expect(wrapper.containsMatchingElement(<Link className="govuk-button" to="/entities/country/delete" role="button" draggable="false" replace={false}>Delete this data set</Link>)).toBeTruthy();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
