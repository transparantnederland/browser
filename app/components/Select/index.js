import './index.css';
import React, { PropTypes } from 'react';

const Select = ({ options, value, onChange }) =>
  <select className="Select" value={value} onChange={onChange}>
    {options.map((option) =>
      <option key={option} value={option}>{option}</option>
    )}
  </select>;

Select.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Select;
