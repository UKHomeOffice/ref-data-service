import React from 'react';
import { shallow } from 'enzyme';

import Footer from './Footer';

describe('Footer', () => {
  it('Should render footer successfully', () => {
    const component = shallow(<Footer/>);

    expect(component).toMatchSnapshot();
  });
});
