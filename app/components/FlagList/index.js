import './index.css';
import React, { PropTypes } from 'react';

import FlagTile from './../FlagTile';

const FlagList = ({ flags }) =>
  <ul className="FlagList">
    {flags.map((flag) =>
      <li className="FlagList-item" key={flag.id}>
        <FlagTile flag={flag} />
      </li>
    )}
  </ul>;

FlagList.propTypes = {
  flags: PropTypes.array.isRequired,
};

export default FlagList;
