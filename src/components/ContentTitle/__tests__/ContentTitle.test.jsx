import React from 'react';
import { shallow } from 'enzyme';

import { ContentTitle } from '../ContentTitle';

describe('ContentTitle', () => {
  it('should render correctly', () => {
    const component = shallow(<ContentTitle name='WORK!' />);
    expect(component).toMatchSnapshot();
  });
});
