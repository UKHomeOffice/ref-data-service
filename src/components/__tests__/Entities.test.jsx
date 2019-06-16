import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

// local imports
import Entities from '../Entities';
import entitiesObject from '../__fixtures__/entitiesObject';

const mockStore = configureMockStore();

describe('Entities component', () => {
  it('Should display the entities component successfully', () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({
        'json': () => entitiesObject
      }));

    const keycloakToken = {
      'keycloak': {
        'token': '1357',
        'tokenParsed': {
          'name': 'Eve Polastri',
          'email': 'eve.polastri@mail.com',
        },
      },
    };
    const store = mockStore(keycloakToken);
    const wrapper = shallow(<Entities store={ store }/>).dive();

    wrapper.setState({
      'entitiesObject': entitiesObject
    });

    // headers
    expect(wrapper.containsMatchingElement(<h1 className="govuk-heading-xl">Reference Data Governance Tool</h1>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<p className="govuk-body-l">This service allows you to view and manage reference data entities.</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<h2 className="govuk-heading-l">Data Entities</h2>)).toBeTruthy();

    // table headers
    expect(wrapper.find('.govuk-table__row').children()).toHaveLength(4);
    expect(wrapper.find('.govuk-table__header').get(0).props.children).toEqual('Name');
    expect(wrapper.find('.govuk-table__header').get(1).props.children).toEqual('Description');
    expect(wrapper.find('.govuk-table__header').get(2).props.children).toEqual('Data Items');
    expect(wrapper.find('.govuk-table__header').get(3).props.children).toEqual('Entity Definition');

    // table content
    expect(wrapper.find('EntitiesData').dive().find('.govuk-table__row').children()).toHaveLength(8);
    for (let i = 0; i < entitiesObject.data.length; i++) {
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[0].props.children).toEqual(entitiesObject.data[i].entityName);
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[1].props.children).toEqual(entitiesObject.data[i].schema.description.description);
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[2].props.children.props.to).toEqual(`/entities/${entitiesObject.data[i].entityName}`);
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[2].props.children.props.children).toEqual('View data');
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[3].props.children.props.to).toEqual(`/entities/${entitiesObject.data[i].entityName}/schema`);
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[3].props.children.props.children).toEqual('View definition');
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});



