import { shallow } from 'enzyme';
import React from 'react';

import { Button } from '../Button';

describe('Button', () => {
  it('should render correctly', () => {
    const component = shallow(<Button>Войти</Button>);
    expect(component).toMatchSnapshot();
  });
  // it('button click should clicked', () => {
  //   const clickFn = jest.fn();
  //   const component = shallow(<Button onClick={clickFn}>Войти</Button>);

  //   component.find()
  // });
});
