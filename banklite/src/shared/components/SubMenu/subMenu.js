import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './subMenu.scss';

const SubMenu = ({links}) => {
  return (
    <div className='subMenu'>
      <div className='content-container'>
        <ul className='nav'>
          {Array.isArray(links) && links.map(link => (
            <li>
              <NavLink  exact={!!link.exact} to={link.url} activeClassName='activeNavLink'>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
};

SubMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      exact: PropTypes.bool,
    })
  ),
}

export default SubMenu;
