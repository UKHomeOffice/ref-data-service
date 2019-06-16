import React from 'react';
import { shallow } from 'enzyme';

import Banner from '../Banner';

describe('Banner', () => {
  it('Should render banner successfully', () => {
    const component = shallow(<Banner/>);

    expect(component).toMatchSnapshot();
  });
});
