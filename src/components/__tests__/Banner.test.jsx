import React from 'react';
import { shallow } from 'enzyme';

// local imports
import Banner from '../Banner';

// mock the configuration object
jest.mock('../../../config/core', () => (
  {
    environment: 'development',
    serviceDesk: {
      feedback: 'https://servicedesk.com/customer/portal/3/create/50'
    },
  }
));

describe('Banner', () => {
  it('Should render banner successfully', () => {
    const wrapper = shallow(<Banner/>);

    expect(wrapper).toMatchSnapshot();
  });
});
