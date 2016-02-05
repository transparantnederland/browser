import './index.css';
import React, { PropTypes } from 'react';

const Dataset = ({ dataset }) =>
  <span className="Dataset">
    {(typeof dataset === 'string' ? [dataset] : dataset).join(', ')}
  </span>;

Dataset.propTypes = {
  dataset: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default Dataset;
