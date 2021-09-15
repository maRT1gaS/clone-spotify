import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem/NavItem';

const Navigation = ({ points }) => (
  <nav>
    <ul>
      {points.map((point) => (
        <NavItem
          key={point.name}
          path={point.path}
          name={point.name}
          icon={point.icon}
        />
      ))}
    </ul>
  </nav>
);

Navigation.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      icon: PropTypes.element,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default Navigation;
