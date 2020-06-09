import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

// local imports
import Entities from '../Entities';
import entitiesObject from '../__fixtures__/entitiesObject';

const mockStore = configureMockStore();

describe('Entities component', () => {
  const keycloakToken = {
    'keycloak': {
      'token': '1357',
      'tokenParsed': {
        'name': 'Eve Polastri',
        'email': 'eve.polastri@mail.com',
      },
    },
  };
  
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({
        'json': () => entitiesObject
      }));    
  });

  it('should render a table with the right data', () => {
    const store = mockStore(keycloakToken);
    const wrapper = shallow(<Entities store={ store }/>).dive();

    wrapper.setState({
      'entitiesObject': entitiesObject
    });

    expect(wrapper.find('EntitiesData').dive()).toMatchSnapshot();
  });

  it('Should display the entities component successfully', () => {    
    const store = mockStore(keycloakToken);
    const wrapper = shallow(<Entities store={ store }/>).dive();

    wrapper.setState({
      'entitiesObject': entitiesObject
    });

    // headers
    expect(wrapper.containsMatchingElement(<h1 className="govuk-heading-xl">Reference Data Service</h1>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<h2 className="govuk-heading-l">Data Sets</h2>)).toBeTruthy();

    // table headers
    expect(wrapper.find('.govuk-table__row').children()).toHaveLength(3);
    expect(wrapper.find('.govuk-table__header').get(0).props.children).toEqual('Name');
    expect(wrapper.find('.govuk-table__header').get(1).props.children).toEqual('Description');
    expect(wrapper.find('.govuk-table__header').get(2).props.children).toEqual('Action');

    // table content
    expect(wrapper.find('EntitiesData').dive().find('.govuk-table__row').children()).toHaveLength(6);
    for (let i = 0; i < entitiesObject.data.length; i++) {
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[0].props.children).toEqual(entitiesObject.data[i].schema.label);
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[1].props.children).toEqual(entitiesObject.data[i].schema.description);            
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[2].props.children[0].props.children).toEqual('View');
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[2].props.children[1].props.children[0].props.children).toEqual('Edit');
      expect(wrapper.find('EntitiesData').dive().get(i).props.children[2].props.children[1].props.children[1].props.children).toEqual('Delete');
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});



