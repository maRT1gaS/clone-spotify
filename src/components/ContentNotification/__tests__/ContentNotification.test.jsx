import React from 'react';
import { shallow } from 'enzyme';
import { ContentNotification } from '../ContentNotification';

describe('ContentNotification', () => {
  it('should render correctly', () => {
    const component = shallow(
      <ContentNotification title='В данный момент данных нет!' />
    );
    expect(component).toMatchSnapshot();
  });
});
