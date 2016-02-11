import './index.css';
import React, { PropTypes } from 'react';

import FlagTile from './../FlagTile';

import admin from '../../utils/admin';

const FlagList = ({ flags, dispatch }) =>
  <ul className="FlagList">
    {flags.map((flag) =>
      <li className="FlagList-item" key={flag.id}>
        <FlagTile flag={flag} onApprove={(id) => dispatch(admin.actions.approveFlag({ id }))} />
      </li>
    )}
  </ul>;

FlagList.propTypes = {
  flags: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default FlagList;
